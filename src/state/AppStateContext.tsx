import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import { course, getAllItems, getCurrentUnit, getItemMap, getNextLesson, lessonMap } from "../lib/content";
import { getDueItemIds } from "../lib/review";
import { getLocalDateKey, scoreReview, applyStudyDay, ensureReviewState } from "../lib/review";
import { getUiLanguageStage } from "../lib/ui-language";
import { countLearnedWords } from "../lib/word-stats";
import {
  defaultSnapshot,
  exportSnapshot,
  importSnapshot,
  loadSnapshot,
  resetSnapshot,
  saveSnapshot
} from "../lib/storage";
import type { AppSnapshot, CourseItem, CustomEntry, ExportBundle, StudySessionSummary } from "../types";
import type { UiLanguageStage } from "../types";

interface CreateCustomEntryInput {
  malay: string;
  english: string;
  note?: string;
  example?: string;
}

interface AppStateContextValue {
  isReady: boolean;
  snapshot: AppSnapshot;
  allItems: CourseItem[];
  itemMap: Record<string, CourseItem>;
  dueReviewItems: CourseItem[];
  nextLessonId?: string;
  currentUnitTitle: string;
  uiLanguageStage: UiLanguageStage;
  learnedWordCount: number;
  submitStudySession: (summary: StudySessionSummary) => void;
  addCustomEntry: (input: CreateCustomEntryInput) => void;
  exportBackup: () => ExportBundle;
  importBackupBundle: (bundle: ExportBundle) => void;
  resetAllProgress: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [snapshot, setSnapshot] = useState<AppSnapshot>(defaultSnapshot);
  const [isReady, setIsReady] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;

    loadSnapshot().then((loadedSnapshot) => {
      if (!cancelled) {
        setSnapshot(loadedSnapshot);
        setIsReady(true);
        hasLoaded.current = true;
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      return;
    }

    void saveSnapshot(snapshot);
  }, [snapshot]);

  const allItems = useMemo(() => getAllItems(snapshot.customEntries), [snapshot.customEntries]);
  const itemMap = useMemo(() => getItemMap(snapshot.customEntries), [snapshot.customEntries]);
  const dueReviewItems = useMemo(
    () => getDueItemIds(snapshot.progress.reviewStates).map((itemId) => itemMap[itemId]).filter(Boolean),
    [itemMap, snapshot.progress.reviewStates]
  );
  const nextLesson = useMemo(
    () => getNextLesson(snapshot.progress.completedLessons),
    [snapshot.progress.completedLessons]
  );
  const currentUnit = useMemo(
    () => getCurrentUnit(snapshot.progress.completedLessons),
    [snapshot.progress.completedLessons]
  );
  const uiLanguageStage = useMemo(
    () => getUiLanguageStage(snapshot.progress.completedLessons.length),
    [snapshot.progress.completedLessons.length]
  );
  const learnedWordCount = useMemo(
    () => countLearnedWords(snapshot.progress.completedLessons, itemMap, snapshot.customEntries),
    [itemMap, snapshot.customEntries, snapshot.progress.completedLessons]
  );

  const submitStudySession = (summary: StudySessionSummary) => {
    const studiedOn = getLocalDateKey(new Date(summary.studiedAt));

    setSnapshot((currentSnapshot) => {
      const groupedResults = new Map<string, { correct: number; total: number }>();
      summary.results.forEach((result) => {
        result.itemIds.forEach((itemId) => {
          const existing = groupedResults.get(itemId) ?? { correct: 0, total: 0 };
          groupedResults.set(itemId, {
            correct: existing.correct + (result.correct ? 1 : 0),
            total: existing.total + 1
          });
        });
      });

      let progress = applyStudyDay(currentSnapshot.progress, studiedOn);
      const reviewStates = { ...progress.reviewStates };

      groupedResults.forEach((aggregate, itemId) => {
        const correct = aggregate.correct / aggregate.total >= 0.6;
        reviewStates[itemId] = scoreReview(itemId, reviewStates[itemId], correct, studiedOn);
      });

      progress = {
        ...progress,
        reviewStates,
        xp: progress.xp + summary.earnedXp,
        lessonScores: summary.lessonId
          ? {
              ...progress.lessonScores,
              [summary.lessonId]: Math.max(progress.lessonScores[summary.lessonId] ?? 0, summary.accuracy)
            }
          : progress.lessonScores
      };

      if (summary.type === "lesson" && summary.lessonId && summary.passed) {
        const completedLessons = progress.completedLessons.includes(summary.lessonId)
          ? progress.completedLessons
          : [...progress.completedLessons, summary.lessonId];

        progress = {
          ...progress,
          completedLessons
        };

        const lesson = lessonMap[summary.lessonId];
        lesson.targetItemIds.forEach((itemId) => {
          if (!reviewStates[itemId]) {
            reviewStates[itemId] = ensureReviewState(itemId, studiedOn);
          }
        });
      }

      return {
        ...currentSnapshot,
        progress
      };
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

    setSnapshot((currentSnapshot) => ({
      customEntries: [customEntry, ...currentSnapshot.customEntries],
      progress: {
        ...currentSnapshot.progress,
        reviewStates: {
          ...currentSnapshot.progress.reviewStates,
          [customEntry.id]: ensureReviewState(customEntry.id, studiedOn)
        }
      }
    }));
  };

  const importBackupBundle = (bundle: ExportBundle) => {
    setSnapshot(importSnapshot(bundle));
  };

  const resetAllProgress = () => {
    void resetSnapshot().then((freshSnapshot) => {
      setSnapshot(freshSnapshot);
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        isReady,
        snapshot,
        allItems,
        itemMap,
        dueReviewItems,
        nextLessonId: nextLesson?.id,
        currentUnitTitle: currentUnit.title,
        uiLanguageStage,
        learnedWordCount,
        submitStudySession,
        addCustomEntry,
        exportBackup: () => exportSnapshot(snapshot),
        importBackupBundle,
        resetAllProgress
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider.");
  }

  return context;
};

export { course };
