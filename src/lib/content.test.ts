import { course } from "./content";
import { validateCourseData } from "./content";

describe("course data", () => {
  it("has no duplicate ids or broken references", () => {
    expect(validateCourseData(course)).toEqual([]);
  });
});
