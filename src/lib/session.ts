import type {
  AnswerJudgment,
  ChoiceQuestion,
  CourseItem,
  PairMatchQuestion,
  SessionQuestion,
  TypedQuestion,
  UiLanguageStage,
  UserProgress,
  WordBankQuestion
} from "../types";
import { lessonMap, pathLessonOrder } from "./content";
import { getDueItemIds } from "./review";
import {
  canTeachThroughMalay,
  getTeachingPrompt,
  getUiLanguageStage,
  getUiLanguageStageForLesson,
  uiText
} from "./ui-language";

interface SessionBuildOptions {
  allItems?: CourseItem[];
  wordBankTokens?: string[];
}

interface QuestionEvaluation {
  correct: boolean;
  judgment: AnswerJudgment;
  canonicalAnswer: string;
  allowRetry: boolean;
}

const hashSeed = (value: string) =>
  Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);

const nextSeed = (seed: number) => (seed * 1664525 + 1013904223) % 4294967296;

const shuffle = <T,>(items: T[], seedKey: string) => {
  const copy = [...items];
  let seed = hashSeed(seedKey);

  for (let index = copy.length - 1; index > 0; index -= 1) {
    seed = nextSeed(seed);
    const swapIndex = seed % (index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
};

const unique = <T,>(values: T[]) => [...new Set(values)];

const tokenizeMalayText = (value: string) =>
  value
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

export const normalizeMalayText = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const selectCandidates = <T,>(
  pool: T[],
  count: number,
  seedKey: string,
  isValid: (candidate: T) => boolean,
  getKey: (candidate: T) => string
) => {
  if (pool.length === 0 || count <= 0) {
    return [];
  }

  const results: T[] = [];
  const visited = new Set<string>();
  let seed = hashSeed(seedKey) || 1;
  let attempts = 0;
  const maxAttempts = Math.max(pool.length * 4, count * 10);

  while (results.length < count && attempts < maxAttempts && visited.size < pool.length) {
    seed = nextSeed(seed);
    const candidate = pool[seed % pool.length];
    const candidateKey = getKey(candidate);
    if (visited.has(candidateKey)) {
      attempts += 1;
      continue;
    }

    visited.add(candidateKey);
    if (isValid(candidate)) {
      results.push(candidate);
    }

    attempts += 1;
  }

  return results;
};

const getDistractors = (item: CourseItem, pool: CourseItem[], count: number, key: string) =>
  selectCandidates(
    pool,
    count,
    `${item.id}-${key}-distractors`,
    (candidate) =>
      candidate.id !== item.id && !candidate.english.some((word) => item.english.includes(word)),
    (candidate) => candidate.id
  );

const makeRecognition = (
  item: CourseItem,
  pool: CourseItem[],
  key: string,
  languageStage: UiLanguageStage
): ChoiceQuestion => {
  const distractors = getDistractors(item, pool, 3, key);
  const allCandidates = [item, ...distractors];
  const usesMalayMeaning = canTeachThroughMalay(allCandidates, languageStage);
  const getMeaningOption = (candidate: CourseItem) =>
    usesMalayMeaning ? getTeachingPrompt(candidate, languageStage) : candidate.english[0];
  const options = shuffle(
    [getMeaningOption(item), ...distractors.map((candidate) => getMeaningOption(candidate))],
    `${key}-options`
  );

  return {
    id: `${item.id}-recognition-${key}`,
    type: "recognition",
    itemId: item.id,
    prompt: item.malay,
    options,
    correctAnswer: getMeaningOption(item),
    helper: usesMalayMeaning
      ? uiText(languageStage, "Pick the best meaning.", "Pilih maksud yang paling tepat.")
      : uiText(languageStage, "Pick the English meaning.", "Pilih maksud bahasa Inggeris.")
  };
};

const makeReverseRecognition = (
  item: CourseItem,
  pool: CourseItem[],
  key: string,
  languageStage: UiLanguageStage
): ChoiceQuestion => {
  const distractors = getDistractors(item, pool, 3, key);
  const options = shuffle(
    [item.malay, ...distractors.map((candidate) => candidate.malay)],
    `${key}-options`
  );

  return {
    id: `${item.id}-reverse-${key}`,
    type: "reverse-recognition",
    itemId: item.id,
    prompt: getTeachingPrompt(item, languageStage),
    options,
    correctAnswer: item.malay,
    helper: uiText(languageStage, "Pick the Malay answer.", "Pilih jawapan bahasa Melayu.")
  };
};

const makeTyped = (item: CourseItem, key: string, languageStage: UiLanguageStage): TypedQuestion => ({
  id: `${item.id}-typed-${key}`,
  type: "typed",
  itemId: item.id,
  prompt: getTeachingPrompt(item, languageStage),
  acceptedAnswers: item.acceptedAnswers,
  helper: uiText(languageStage, "Type the Malay answer.", "Taip jawapan bahasa Melayu."),
  placeholder: uiText(languageStage, "Type in Malay", "Taip dalam bahasa Melayu")
});

const makeWordBank = (
  item: CourseItem,
  wordBankTokens: string[],
  key: string,
  languageStage: UiLanguageStage
): WordBankQuestion => {
  const answerTokens = tokenizeMalayText(item.acceptedAnswers[0]);
  const normalizedAnswerTokens = new Set(answerTokens.map((token) => normalizeMalayText(token)));
  const distractorTokens = selectCandidates(
    wordBankTokens,
    Math.max(3, answerTokens.length + 1),
    `${key}-tokens`,
    (token) => !normalizedAnswerTokens.has(normalizeMalayText(token)),
    (token) => token
  );

  return {
    id: `${item.id}-bank-${key}`,
    type: "word-bank",
    itemId: item.id,
    prompt: getTeachingPrompt(item, languageStage),
    answerTokens,
    bank: shuffle([...answerTokens, ...distractorTokens], `${key}-bank`),
    helper: uiText(languageStage, "Tap the Malay words in order.", "Tekan perkataan bahasa Melayu mengikut urutan.")
  };
};

const makePairMatch = (items: CourseItem[], key: string, languageStage: UiLanguageStage): PairMatchQuestion => {
  const useMalayClues = canTeachThroughMalay(items, languageStage);

  return {
    id: `pair-${key}`,
    type: "pair-match",
    pairs: shuffle(items, `${key}-pairs`).map((item) => ({
      itemId: item.id,
      left: useMalayClues ? getTeachingPrompt(item, languageStage) : item.english[0],
      right: item.malay
    })),
    prompt: useMalayClues
      ? uiText(languageStage, "Match each clue to the Malay answer.", "Padankan setiap petunjuk dengan jawapan bahasa Melayu.")
      : uiText(languageStage, "Match each English prompt to the Malay answer.", "Padankan setiap prompt bahasa Inggeris dengan jawapan bahasa Melayu."),
    helper: uiText(languageStage, "Clear all pairs to continue.", "Padankan semua pasangan untuk teruskan.")
  };
};

const makeWordBankTokenPool = (pool: CourseItem[]) =>
  unique(pool.flatMap((item) => item.acceptedAnswers.flatMap((answer) => tokenizeMalayText(answer))));

const buildQuestionForTemplate = (
  template: SessionQuestion["type"],
  item: CourseItem,
  pool: CourseItem[],
  wordBankTokens: string[],
  key: string,
  languageStage: UiLanguageStage
) => {
  switch (template) {
    case "recognition":
      return makeRecognition(item, pool, key, languageStage);
    case "reverse-recognition":
      return makeReverseRecognition(item, pool, key, languageStage);
    case "typed":
      return makeTyped(item, key, languageStage);
    case "word-bank":
      return makeWordBank(item, wordBankTokens, key, languageStage);
    default:
      return makeRecognition(item, pool, key, languageStage);
  }
};

export const buildLessonSession = (
  lessonId: string,
  lessonItemIds: string[],
  itemMap: Record<string, CourseItem>,
  progress: UserProgress,
  languageStage = getUiLanguageStageForLesson(lessonId),
  options?: SessionBuildOptions
): SessionQuestion[] => {
  const pool = options?.allItems ?? Object.values(itemMap);
  const wordBankTokens = options?.wordBankTokens ?? makeWordBankTokenPool(pool);
  const targets = lessonItemIds.map((itemId) => itemMap[itemId]).filter(Boolean);
  const dueReviewIds = getDueItemIds(progress.reviewStates)
    .filter((itemId) => !lessonItemIds.includes(itemId))
    .slice(0, 2);
  const currentLessonIndex = pathLessonOrder.indexOf(lessonId);
  const recentCompletedLessonIds = pathLessonOrder
    .slice(0, currentLessonIndex)
    .filter((completedLessonId) => progress.completedLessons.includes(completedLessonId))
    .slice(-4);
  const spiralReviewIds = shuffle(
    unique(
      recentCompletedLessonIds.flatMap((completedLessonId) => lessonMap[completedLessonId]?.targetItemIds ?? [])
    ).filter((itemId) => !lessonItemIds.includes(itemId) && !dueReviewIds.includes(itemId)),
    `${lessonId}-spiral`
  ).slice(0, 2);
  const supplementalReviewIds = [...dueReviewIds, ...spiralReviewIds];
  const supplementalReviews = supplementalReviewIds.map((itemId) => itemMap[itemId]).filter(Boolean);

  const questions: SessionQuestion[] = [];
  const usableTemplates: Array<Exclude<SessionQuestion["type"], "pair-match">> = [
    "recognition",
    "reverse-recognition",
    "typed",
    "word-bank"
  ];

  targets.forEach((item, index) => {
    const primaryTemplate = usableTemplates[index % usableTemplates.length];
    const secondaryTemplate = usableTemplates[(index + 1) % usableTemplates.length];
    questions.push(
      buildQuestionForTemplate(primaryTemplate, item, pool, wordBankTokens, `${lessonId}-${index}-a`, languageStage)
    );
    questions.push(
      buildQuestionForTemplate(secondaryTemplate, item, pool, wordBankTokens, `${lessonId}-${index}-b`, languageStage)
    );
  });

  if (targets.length >= 4) {
    questions.splice(2, 0, makePairMatch(targets.slice(0, 4), `${lessonId}-match`, languageStage));
  }

  supplementalReviews.forEach((item, index) => {
    const template = index === 0 ? "typed" : index % 2 === 0 ? "recognition" : "reverse-recognition";
    questions.push(
      buildQuestionForTemplate(template, item, pool, wordBankTokens, `${lessonId}-review-${index}`, languageStage)
    );
  });

  return questions;
};

export const buildReviewSession = (
  itemMap: Record<string, CourseItem>,
  progress: UserProgress,
  fallbackItemIds: string[],
  languageStage = getUiLanguageStage(progress.completedLessons.length),
  options?: SessionBuildOptions
): SessionQuestion[] => {
  const dueItemIds = getDueItemIds(progress.reviewStates);
  const fallbackPool = shuffle(unique(fallbackItemIds), `review-fallback-${progress.sessionCount}`);
  const selectedIds = (dueItemIds.length > 0 ? dueItemIds : fallbackPool).slice(0, 8);
  const items = selectedIds.map((itemId) => itemMap[itemId]).filter(Boolean);
  const pool = options?.allItems ?? Object.values(itemMap);

  if (items.length === 0) {
    return [];
  }

  const questions: SessionQuestion[] = [];
  items.forEach((item, index) => {
    questions.push(makeReverseRecognition(item, pool, `review-${index}-a`, languageStage));
    questions.push(makeTyped(item, `review-${index}-b`, languageStage));
  });

  if (items.length >= 4) {
    questions.splice(1, 0, makePairMatch(items.slice(0, 4), "review-match", languageStage));
  }

  return questions;
};

const isSingleAdjacentTransposition = (left: string, right: string) => {
  if (left.length !== right.length || left.length < 2) {
    return false;
  }

  const mismatches: number[] = [];
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      mismatches.push(index);
      if (mismatches.length > 2) {
        return false;
      }
    }
  }

  return (
    mismatches.length === 2 &&
    mismatches[1] === mismatches[0] + 1 &&
    left[mismatches[0]] === right[mismatches[1]] &&
    left[mismatches[1]] === right[mismatches[0]]
  );
};

const isSingleEditAway = (left: string, right: string) => {
  const lengthGap = Math.abs(left.length - right.length);
  if (lengthGap > 1) {
    return false;
  }

  if (left.length === right.length) {
    let replacements = 0;
    for (let index = 0; index < left.length; index += 1) {
      if (left[index] !== right[index]) {
        replacements += 1;
        if (replacements > 1) {
          return false;
        }
      }
    }

    return replacements === 1;
  }

  const shorter = left.length < right.length ? left : right;
  const longer = left.length < right.length ? right : left;
  let shortIndex = 0;
  let longIndex = 0;
  let edits = 0;

  while (shortIndex < shorter.length && longIndex < longer.length) {
    if (shorter[shortIndex] === longer[longIndex]) {
      shortIndex += 1;
      longIndex += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) {
      return false;
    }

    longIndex += 1;
  }

  return true;
};

const isCloseSingleWord = (input: string, candidate: string) =>
  candidate.length >= 4 && (isSingleEditAway(input, candidate) || isSingleAdjacentTransposition(input, candidate));

const isCloseMultiWord = (input: string, candidate: string) => {
  const inputTokens = input.split(" ");
  const candidateTokens = candidate.split(" ");

  if (inputTokens.length !== candidateTokens.length) {
    return false;
  }

  let mismatchCount = 0;

  for (let index = 0; index < inputTokens.length; index += 1) {
    if (inputTokens[index] === candidateTokens[index]) {
      continue;
    }

    mismatchCount += 1;
    if (mismatchCount > 1) {
      return false;
    }

    const tokenMatches =
      isSingleEditAway(inputTokens[index], candidateTokens[index]) ||
      isSingleAdjacentTransposition(inputTokens[index], candidateTokens[index]);

    if (!tokenMatches) {
      return false;
    }
  }

  return mismatchCount === 1;
};

export const evaluateTypedAnswer = (question: TypedQuestion, answer: string): QuestionEvaluation => {
  const normalizedInput = normalizeMalayText(answer);
  const normalizedAcceptedAnswers = question.acceptedAnswers.map((candidate) => ({
    canonicalAnswer: candidate,
    normalized: normalizeMalayText(candidate)
  }));

  const exactMatch = normalizedAcceptedAnswers.find((candidate) => candidate.normalized === normalizedInput);
  if (exactMatch) {
    return {
      correct: true,
      judgment: "correct",
      canonicalAnswer: exactMatch.canonicalAnswer,
      allowRetry: false
    };
  }

  const closeMatch = normalizedAcceptedAnswers.find(({ normalized }) => {
    if (!normalizedInput) {
      return false;
    }

    return normalized.includes(" ")
      ? isCloseMultiWord(normalizedInput, normalized)
      : isCloseSingleWord(normalizedInput, normalized);
  });

  if (closeMatch) {
    return {
      correct: false,
      judgment: "close",
      canonicalAnswer: closeMatch.canonicalAnswer,
      allowRetry: true
    };
  }

  return {
    correct: false,
    judgment: "wrong",
    canonicalAnswer: question.acceptedAnswers[0],
    allowRetry: false
  };
};

export const evaluateQuestionAnswer = (
  question: SessionQuestion,
  answer: string | string[]
): QuestionEvaluation => {
  if (question.type === "pair-match") {
    const response = Array.isArray(answer) ? answer : [];
    const expected = question.pairs.map((pair) => `${pair.left}::${pair.right}`).sort();
    const correct = [...response].sort().join("|") === expected.join("|");

    return {
      correct,
      judgment: correct ? "correct" : "wrong",
      canonicalAnswer: question.pairs.map((pair) => `${pair.left} -> ${pair.right}`).join(" | "),
      allowRetry: false
    };
  }

  if (question.type === "typed") {
    return evaluateTypedAnswer(question, Array.isArray(answer) ? answer.join(" ") : answer);
  }

  if (question.type === "word-bank") {
    const normalized = normalizeMalayText(Array.isArray(answer) ? answer.join(" ") : answer);
    const correct = normalizeMalayText(question.answerTokens.join(" ")) === normalized;
    return {
      correct,
      judgment: correct ? "correct" : "wrong",
      canonicalAnswer: question.answerTokens.join(" "),
      allowRetry: false
    };
  }

  const response = Array.isArray(answer) ? answer[0] : answer;
  const correct = normalizeMalayText(response) === normalizeMalayText(question.correctAnswer);
  return {
    correct,
    judgment: correct ? "correct" : "wrong",
    canonicalAnswer: question.correctAnswer,
    allowRetry: false
  };
};

export const isQuestionCorrect = (question: SessionQuestion, answer: string | string[]) =>
  evaluateQuestionAnswer(question, answer).correct;
