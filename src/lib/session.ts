import type {
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

const hashSeed = (value: string) =>
  Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);

const shuffle = <T,>(items: T[], seedKey: string) => {
  const copy = [...items];
  let seed = hashSeed(seedKey);

  for (let index = copy.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const swapIndex = seed % (index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
};

export const normalizeMalayText = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const getDistractors = (item: CourseItem, pool: CourseItem[], count: number) =>
  pool
    .filter((candidate) => candidate.id !== item.id)
    .filter((candidate) => !candidate.english.some((word) => item.english.includes(word)))
    .slice(0, count);

const unique = <T,>(values: T[]) => [...new Set(values)];

const makeRecognition = (
  item: CourseItem,
  pool: CourseItem[],
  key: string,
  languageStage: UiLanguageStage
): ChoiceQuestion => {
  const distractors = getDistractors(item, shuffle(pool, `${key}-d`), 3);
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
  const distractors = getDistractors(item, shuffle(pool, `${key}-d`), 3);
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
  pool: CourseItem[],
  key: string,
  languageStage: UiLanguageStage
): WordBankQuestion => {
  const answerTokens = item.acceptedAnswers[0]
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const distractorTokens = shuffle(
    pool
      .filter((candidate) => candidate.id !== item.id)
      .flatMap((candidate) => candidate.malay.split(/\s+/))
      .filter((token) => !answerTokens.includes(token)),
    `${key}-tokens`
  ).slice(0, Math.max(3, answerTokens.length + 1));

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

const buildQuestionForTemplate = (
  template: SessionQuestion["type"],
  item: CourseItem,
  pool: CourseItem[],
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
      return makeWordBank(item, pool, key, languageStage);
    default:
      return makeRecognition(item, pool, key, languageStage);
  }
};

export const buildLessonSession = (
  lessonId: string,
  lessonItemIds: string[],
  itemMap: Record<string, CourseItem>,
  progress: UserProgress,
  languageStage = getUiLanguageStageForLesson(lessonId)
): SessionQuestion[] => {
  const pool = Object.values(itemMap);
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
  const supplementalReviews = supplementalReviewIds
    .map((itemId) => itemMap[itemId])
    .filter(Boolean);

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
    questions.push(buildQuestionForTemplate(primaryTemplate, item, pool, `${lessonId}-${index}-a`, languageStage));
    questions.push(buildQuestionForTemplate(secondaryTemplate, item, pool, `${lessonId}-${index}-b`, languageStage));
  });

  if (targets.length >= 4) {
    questions.splice(2, 0, makePairMatch(targets.slice(0, 4), `${lessonId}-match`, languageStage));
  }

  supplementalReviews.forEach((item, index) => {
    const template = index === 0 ? "typed" : index % 2 === 0 ? "recognition" : "reverse-recognition";
    questions.push(buildQuestionForTemplate(template, item, pool, `${lessonId}-review-${index}`, languageStage));
  });

  return questions;
};

export const buildReviewSession = (
  itemMap: Record<string, CourseItem>,
  progress: UserProgress,
  fallbackItemIds: string[],
  languageStage = getUiLanguageStage(progress.completedLessons.length)
): SessionQuestion[] => {
  const dueItemIds = getDueItemIds(progress.reviewStates);
  const fallbackPool = shuffle(unique(fallbackItemIds), `review-fallback-${progress.sessionCount}`);
  const selectedIds = (dueItemIds.length > 0 ? dueItemIds : fallbackPool).slice(0, 8);
  const items = selectedIds.map((itemId) => itemMap[itemId]).filter(Boolean);
  const pool = Object.values(itemMap);

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

export const isQuestionCorrect = (question: SessionQuestion, answer: string | string[]) => {
  if (question.type === "pair-match") {
    const response = Array.isArray(answer) ? answer : [];
    const expected = question.pairs.map((pair) => `${pair.left}::${pair.right}`).sort();
    return [...response].sort().join("|") === expected.join("|");
  }

  if (question.type === "typed") {
    const normalized = normalizeMalayText(Array.isArray(answer) ? answer.join(" ") : answer);
    return question.acceptedAnswers.some((candidate) => normalizeMalayText(candidate) === normalized);
  }

  if (question.type === "word-bank") {
    const normalized = normalizeMalayText(Array.isArray(answer) ? answer.join(" ") : answer);
    return normalizeMalayText(question.answerTokens.join(" ")) === normalized;
  }

  const response = Array.isArray(answer) ? answer[0] : answer;
  return normalizeMalayText(response) === normalizeMalayText(question.correctAnswer);
};
