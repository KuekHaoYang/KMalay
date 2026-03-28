import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import {
  buildCourseCatalog,
  course,
  getCurrentUnit,
  getNextLesson,
  lessonMap,
  type CourseCatalog
} from "../lib/content";
import { applyStudyDay, ensureReviewState, getDueItemIds, getLocalDateKey, scoreReview } from "../lib/review";
import { defaultSnapshot, exportSnapshot, importSnapshot, loadSnapshot, resetSnapshot, saveCustomEntries, saveProgress } from "../lib/storage";
import { getUiLanguageStage } from "../lib/ui-language";
import { countLearnedWords } from "../lib/word-stats";
import type {
  AnswerJudgment,
  AppSnapshot,
  CourseItem,
  CustomEntry,
  ExportBundle,
  StudySessionSummary,
  UiLanguageStage,
  UserProgress
} from "../types";

interface CreateCustomEntryInput {
  malay: string;
  english: string;
  note?: string;
  example?: string;
}

interface ProgressStateValue {
  isReady: boolean;
  snapshot: AppSnapshot;
  dueReviewItems: CourseItem[];
  nextLessonId?: string;
  currentUnitTitle: string;
  uiLanguageStage: UiLanguageStage;
  learnedWordCount: number;
}

interface AppActionsContextValue {
  submitStudySession: (summary: StudySessionSummary) => void;
  addCustomEntry: (input: CreateCustomEntryInput) => void;
  exportBackup: () => ExportBundle;
  importBackupBundle: (bundle: ExportBundle) => void;
  resetAllProgress: () => void;
}

interface AppStateContextValue extends ProgressStateValue, CourseCatalog, AppActionsContextValue {}

const CourseCatalogContext = createContext<CourseCatalog | null>(null);
const ProgressContext = createContext<ProgressStateValue | null>(null);
const ActionsContext = createContext<AppActionsContextValue | null>(null);

const SAVE_DEBOUNCE_MS = 250;

const judgmentScores: Record<AnswerJudgment, number> = {
  correct: 1,
  close: 0.75,
  wrong: 0
};

const collapseJudgments = (judgments: AnswerJudgment[]): AnswerJudgment => {
  if (judgments.length === 0) {
    return "wrong";
  }

  const averageScore =
    judgments.reduce((total, judgment) => total + judgmentScores[judgment], 0) / judgments.length;

  if (averageScore >= 0.95) {
    return "correct";
  }

  if (averageScore >= 0.5) {
    return "close";
  }

  return "wrong";
};

export const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [progress, setProgress] = useState<UserProgress>(defaultSnapshot.progress);
  const [customEntries, setCustomEntries] = useState<CustomEntry[]>(defaultSnapshot.customEntries);
  const [isReady, setIsReady] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;

    loadSnapshot().then((loadedSnapshot) => {
      if (cancelled) {
        return;
      }

      setProgress(loadedSnapshot.progress);
      setCustomEntries(loadedSnapshot.customEntries);
      setIsReady(true);
      hasLoaded.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveProgress(progress);
    }, SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [progress]);

  useEffect(() => {
    if (!hasLoaded.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveCustomEntries(customEntries);
    }, SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [customEntries]);

  const catalog = useMemo(() => buildCourseCatalog(customEntries), [customEntries]);
  const snapshot = useMemo<AppSnapshot>(() => ({ progress, customEntries }), [customEntries, progress]);
  const dueReviewItems = useMemo(
    () => getDueItemIds(progress.reviewStates).map((itemId) => catalog.itemMap[itemId]).filter(Boolean),
    [catalog.itemMap, progress.reviewStates]
  );
  const nextLesson = useMemo(() => getNextLesson(progress.completedLessons), [progress.completedLessons]);
  const currentUnit = useMemo(() => getCurrentUnit(progress.completedLessons), [progress.completedLessons]);
  const uiLanguageStage = useMemo(
    () => getUiLanguageStage(progress.completedLessons.length),
    [progress.completedLessons.length]
  );
  const learnedWordCount = useMemo(
    () => countLearnedWords(progress.completedLessons, catalog.itemMap, customEntries),
    [catalog.itemMap, customEntries, progress.completedLessons]
  );

  const submitStudySession = (summary: StudySessionSummary) => {
    const studiedOn = getLocalDateKey(new Date(summary.studiedAt));

    setProgress((currentProgress) => {
      const groupedJudgments = new Map<string, AnswerJudgment[]>();
      summary.results.forEach((result) => {
        result.itemIds.forEach((itemId) => {
          const existing = groupedJudgments.get(itemId) ?? [];
          groupedJudgments.set(itemId, [...existing, result.judgment]);
        });
      });

      let nextProgress = applyStudyDay(currentProgress, studiedOn);
      const reviewStates = { ...nextProgress.reviewStates };

      groupedJudgments.forEach((judgments, itemId) => {
        reviewStates[itemId] = scoreReview(
          itemId,
          reviewStates[itemId],
          collapseJudgments(judgments),
          studiedOn
        );
      });

      nextProgress = {
        ...nextProgress,
        reviewStates,
        xp: nextProgress.xp + summary.earnedXp,
        lessonScores: summary.lessonId
          ? {
              ...nextProgress.lessonScores,
              [summary.lessonId]: Math.max(nextProgress.lessonScores[summary.lessonId] ?? 0, summary.accuracy)
            }
          : nextProgress.lessonScores
      };

      if (summary.type === "lesson" && summary.lessonId && summary.passed) {
        const completedLessons = nextProgress.completedLessons.includes(summary.lessonId)
          ? nextProgress.completedLessons
          : [...nextProgress.completedLessons, summary.lessonId];

        nextProgress = {
          ...nextProgress,
          completedLessons
        };

        const lesson = lessonMap[summary.lessonId];
        lesson.targetItemIds.forEach((itemId) => {
          if (!reviewStates[itemId]) {
            reviewStates[itemId] = ensureReviewState(itemId, studiedOn);
          }
        });
      }

      return nextProgress;
    });
  };

  const addCustomEntry = (input: CreateCustomEntryInput) => {
    const malay = input.malay.trim();
    const english = input.english
      .split(",")
      .map((gloss) => gloss.trim())
      .filter(Boolean);

    if (!malay || english.length === 0) {
      return;
    }

    const createdAt = new Date().toISOString();
    const idBase = malay
      .toLocaleLowerCase("ms-MY")
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .trim()
      .replace(/\s+/g, "-");

    const customEntry: CustomEntry = {
      id: `custom-${idBase}-${Date.now()}`,
      kind: "lexeme",
      malay,
      english,
      acceptedAnswers: [malay],
      tags: ["custom", "personal"],
      partOfSpeech: "expression",
      registerNote: input.note?.trim() || undefined,
      example: input.example?.trim() || undefined,
      source: "custom",
      createdAt
    };

    const studiedOn = getLocalDateKey();

    setCustomEntries((currentEntries) => [customEntry, ...currentEntries]);
    setProgress((currentProgress) => ({
      ...currentProgress,
      reviewStates: {
        ...currentProgress.reviewStates,
        [customEntry.id]: ensureReviewState(customEntry.id, studiedOn)
      }
    }));
  };

  const importBackupBundle = (bundle: ExportBundle) => {
    const importedSnapshot = importSnapshot(bundle);
    setProgress(importedSnapshot.progress);
    setCustomEntries(importedSnapshot.customEntries);
  };

  const resetAllProgress = () => {
    void resetSnapshot().then((freshSnapshot) => {
      setProgress(freshSnapshot.progress);
      setCustomEntries(freshSnapshot.customEntries);
    });
  };

  const progressValue = useMemo<ProgressStateValue>(
    () => ({
      isReady,
      snapshot,
      dueReviewItems,
      nextLessonId: nextLesson?.id,
      currentUnitTitle: currentUnit.title,
      uiLanguageStage,
      learnedWordCount
    }),
    [currentUnit.title, dueReviewItems, isReady, learnedWordCount, nextLesson?.id, snapshot, uiLanguageStage]
  );

  const actionsValue = useMemo<AppActionsContextValue>(
    () => ({
      submitStudySession,
      addCustomEntry,
      exportBackup: () => exportSnapshot(snapshot),
      importBackupBundle,
      resetAllProgress
    }),
    [snapshot]
  );

  return (
    <CourseCatalogContext.Provider value={catalog}>
      <ProgressContext.Provider value={progressValue}>
        <ActionsContext.Provider value={actionsValue}>{children}</ActionsContext.Provider>
      </ProgressContext.Provider>
    </CourseCatalogContext.Provider>
  );
};

export const useCourseCatalogState = () => {
  const context = useContext(CourseCatalogContext);
  if (!context) {
    throw new Error("useCourseCatalogState must be used inside AppStateProvider.");
  }

  return context;
};

export const useProgressState = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressState must be used inside AppStateProvider.");
  }

  return context;
};

export const useAppActions = () => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error("useAppActions must be used inside AppStateProvider.");
  }

  return context;
};

export const useAppState = (): AppStateContextValue => ({
  ...useCourseCatalogState(),
  ...useProgressState(),
  ...useAppActions()
});

export { course };
