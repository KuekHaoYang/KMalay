import type { AnswerJudgment, ReviewState, UserProgress } from "../types";

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const addDays = (dateKey: string, days: number) => {
  const base = new Date(`${dateKey}T00:00:00`);
  base.setDate(base.getDate() + days);
  return getLocalDateKey(base);
};

export const ensureReviewState = (itemId: string, today = getLocalDateKey()): ReviewState => ({
  itemId,
  interval: 0,
  ease: 2.5,
  dueDate: today,
  repetitions: 0,
  lapses: 0,
  lastResult: "fresh"
});

export const scoreReview = (
  itemId: string,
  existing: ReviewState | undefined,
  judgment: AnswerJudgment,
  studiedOn: string
): ReviewState => {
  const current = existing ?? ensureReviewState(itemId, studiedOn);

  if (judgment === "wrong") {
    return {
      ...current,
      interval: 1,
      dueDate: studiedOn,
      ease: Math.max(1.3, current.ease - 0.2),
      repetitions: 0,
      lapses: current.lapses + 1,
      lastResult: "incorrect",
      lastReviewedAt: studiedOn
    };
  }

  if (judgment === "close") {
    const repetitions = current.repetitions + 1;
    const interval =
      repetitions === 1 ? 1 : repetitions === 2 ? 2 : Math.max(3, Math.round(Math.max(1, current.interval) * 1.35));

    return {
      ...current,
      interval,
      dueDate: addDays(studiedOn, interval),
      ease: Math.max(1.6, Math.min(3.1, current.ease - 0.05)),
      repetitions,
      lastResult: "close",
      lastReviewedAt: studiedOn
    };
  }

  const repetitions = current.repetitions + 1;
  const interval =
    repetitions === 1 ? 1 : repetitions === 2 ? 3 : Math.max(4, Math.round(current.interval * current.ease));

  return {
    ...current,
    interval,
    dueDate: addDays(studiedOn, interval),
    ease: Math.min(3.4, current.ease + 0.1),
    repetitions,
    lastResult: "correct",
    lastReviewedAt: studiedOn
  };
};

export const applyStudyDay = (progress: UserProgress, studiedOn: string): UserProgress => {
  if (progress.lastStudyDate === studiedOn) {
    return {
      ...progress,
      sessionCount: progress.sessionCount + 1
    };
  }

  const yesterday = addDays(studiedOn, -1);
  const currentStreak = progress.lastStudyDate === yesterday ? progress.currentStreak + 1 : 1;

  return {
    ...progress,
    currentStreak,
    longestStreak: Math.max(progress.longestStreak, currentStreak),
    lastStudyDate: studiedOn,
    sessionCount: progress.sessionCount + 1
  };
};

export const getDueItemIds = (
  reviewStates: Record<string, ReviewState>,
  today = getLocalDateKey()
) =>
  Object.values(reviewStates)
    .filter((review) => review.dueDate <= today)
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
    .map((review) => review.itemId);
