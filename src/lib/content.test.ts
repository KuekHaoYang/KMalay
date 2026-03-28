import { course } from "./content";
import { validateCourseData } from "./content";

describe("course data", () => {
  it("has no duplicate ids or broken references", () => {
    expect(validateCourseData(course)).toEqual([]);
  });

  it("keeps the seeded lexeme bank above five thousand entries", () => {
    const lexemeCount = course.items.filter((item) => item.kind === "lexeme").length;
    expect(lexemeCount).toBeGreaterThanOrEqual(5000);
  });
});
