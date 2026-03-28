import { applyStudyDay, ensureReviewState, scoreReview } from "./review";

describe("review scheduler", () => {
  it("promotes intervals when answers are correct", () => {
    const first = scoreReview("lx-saya", undefined, "correct", "2026-03-28");
    expect(first.interval).toBe(1);
    expect(first.dueDate).toBe("2026-03-29");

    const second = scoreReview("lx-saya", first, "correct", "2026-03-29");
    expect(second.interval).toBe(3);
    expect(second.dueDate).toBe("2026-04-01");
  });

  it("gives close answers a smaller reward than fully correct ones", () => {
    const seeded = {
      ...ensureReviewState("lx-saya", "2026-03-28"),
      interval: 5,
      ease: 2.7,
      repetitions: 3
    };

    const close = scoreReview("lx-saya", seeded, "close", "2026-03-28");
    const exact = scoreReview("lx-saya", seeded, "correct", "2026-03-28");

    expect(close.interval).toBeLessThan(exact.interval);
    expect(close.ease).toBeLessThan(exact.ease);
    expect(close.lastResult).toBe("close");
  });

  it("resets repetitions and lowers ease after a miss", () => {
    const seeded = {
      ...ensureReviewState("lx-saya", "2026-03-28"),
      interval: 5,
      ease: 2.7,
      repetitions: 3
    };
    const missed = scoreReview("lx-saya", seeded, "wrong", "2026-03-28");
    expect(missed.interval).toBe(1);
    expect(missed.repetitions).toBe(0);
    expect(missed.ease).toBe(2.5);
    expect(missed.dueDate).toBe("2026-03-28");
  });

  it("still counts multiple same-day study sessions", () => {
    const baseProgress = {
      completedLessons: [],
      lessonScores: {},
      xp: 0,
      currentStreak: 1,
      longestStreak: 1,
      lastStudyDate: "2026-03-28",
      reviewStates: {},
      sessionCount: 2
    };

    const updated = applyStudyDay(baseProgress, "2026-03-28");

    expect(updated.currentStreak).toBe(1);
    expect(updated.sessionCount).toBe(3);
  });
});
