import { ensureReviewState, scoreReview } from "./review";

describe("review scheduler", () => {
  it("promotes intervals when answers are correct", () => {
    const first = scoreReview("lx-saya", undefined, true, "2026-03-28");
    expect(first.interval).toBe(1);
    expect(first.dueDate).toBe("2026-03-29");

    const second = scoreReview("lx-saya", first, true, "2026-03-29");
    expect(second.interval).toBe(3);
    expect(second.dueDate).toBe("2026-04-01");
  });

  it("resets repetitions and lowers ease after a miss", () => {
    const seeded = {
      ...ensureReviewState("lx-saya", "2026-03-28"),
      interval: 5,
      ease: 2.7,
      repetitions: 3
    };
    const missed = scoreReview("lx-saya", seeded, false, "2026-03-28");
    expect(missed.interval).toBe(1);
    expect(missed.repetitions).toBe(0);
    expect(missed.ease).toBe(2.5);
    expect(missed.dueDate).toBe("2026-03-28");
  });
});
