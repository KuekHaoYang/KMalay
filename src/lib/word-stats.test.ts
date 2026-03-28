import { course, getItemMap } from "./content";
import { countLearnedWords, countWordsAcrossItems, tokenizeMalayWords } from "./word-stats";

describe("word stats", () => {
  it("tokenizes Malay text into word units", () => {
    expect(tokenizeMalayWords("Pengaruh media sosial itu besar.")).toEqual([
      "pengaruh",
      "media",
      "sosial",
      "itu",
      "besar"
    ]);
  });

  it("counts learned words across completed lesson items", () => {
    const lesson = course.lessons[0];
    const expected = countWordsAcrossItems(lesson.targetItemIds.map((itemId) => getItemMap([])[itemId]));

    expect(countLearnedWords([lesson.id], getItemMap([]), [])).toBe(expected);
  });

  it("pushes the seeded curriculum past five thousand learnable Malay words", () => {
    expect(countWordsAcrossItems(course.items)).toBeGreaterThan(5000);
  });
});
