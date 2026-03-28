import { course, getItemMap } from "./content";
import { buildLessonSession, isQuestionCorrect, normalizeMalayText } from "./session";
import type { AppSnapshot } from "../types";

const emptySnapshot: AppSnapshot = {
  progress: {
    completedLessons: [],
    lessonScores: {},
    xp: 0,
    currentStreak: 0,
    longestStreak: 0,
    reviewStates: {},
    sessionCount: 0
  },
  customEntries: []
};

describe("answer normalization", () => {
  it("normalizes casing and punctuation", () => {
    expect(normalizeMalayText("  Saya   Tidak Faham! ")).toBe("saya tidak faham");
  });

  it("accepts normalized typed answers", () => {
    const itemMap = getItemMap([]);
    const session = buildLessonSession(
      "lesson-5",
      course.lessons[4].targetItemIds,
      itemMap,
      emptySnapshot.progress
    );
    const typed = session.find(
      (question) => question.type === "typed" && "itemId" in question && question.itemId === "ph-saya-tidak-faham"
    );

    expect(typed).toBeDefined();
    expect(isQuestionCorrect(typed!, "saya tidak faham")).toBe(true);
  });
});

describe("lesson session builder", () => {
  it("mixes standard questions and pair matching", () => {
    const session = buildLessonSession(
      "lesson-1",
      course.lessons[0].targetItemIds,
      getItemMap([]),
      emptySnapshot.progress
    );

    expect(session.some((question) => question.type === "pair-match")).toBe(true);
    expect(session.length).toBeGreaterThan(course.lessons[0].targetItemIds.length);
  });

  it("resurfaces prior lesson items inside later lessons even when they are not due yet", () => {
    const progress = {
      ...emptySnapshot.progress,
      completedLessons: ["lesson-1"]
    };
    const session = buildLessonSession(
      "lesson-2",
      course.lessons[1].targetItemIds,
      getItemMap([]),
      progress
    );

    const priorLessonItemIds = new Set(course.lessons[0].targetItemIds);
    const resurfaced = session.some(
      (question) => question.type !== "pair-match" && priorLessonItemIds.has(question.itemId)
    );

    expect(resurfaced).toBe(true);
  });

  it("uses Malay teaching prompts in immersive lessons when Malay hints exist", () => {
    const session = buildLessonSession(
      "lesson-201",
      course.lessons[200].targetItemIds,
      getItemMap([]),
      emptySnapshot.progress
    );

    const promptDrivenQuestion = session.find(
      (question) => question.type === "reverse-recognition" && "itemId" in question && question.itemId === "lx-petikan"
    );

    expect(promptDrivenQuestion).toBeDefined();
    expect(promptDrivenQuestion?.prompt).toBe("bahagian teks untuk dibaca");
  });
});
