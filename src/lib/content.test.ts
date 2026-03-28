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

  it("keeps the seeded item bank above eleven thousand entries", () => {
    expect(course.items.length).toBeGreaterThanOrEqual(11000);
  });

  it("includes the requested linguistics and proverb units", () => {
    const unitTitles = course.units.map((unit) => unit.title);
    expect(unitTitles).toEqual(
      expect.arrayContaining([
        "Morfem",
        "Kata",
        "Leksem",
        "Frasa",
        "Klausa",
        "Ayat",
        "Wacana",
        "Kata Tunggal",
        "Kata Terbitan",
        "Kata Majmuk",
        "Kata Ganda",
        "Kata Nama",
        "Kata Kerja",
        "Kata Adjektif",
        "Kata Tugas",
        "Simpulan Bahasa",
        "Perumpamaan",
        "Pepatah",
        "Bidalan"
      ])
    );
  });
});
