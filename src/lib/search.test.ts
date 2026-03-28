import { course } from "./content";
import { buildSearchEntries, searchItems } from "./search";

describe("search index", () => {
  it("matches Malay, English, and tag text from precomputed entries", () => {
    const entries = buildSearchEntries(course.items.slice(0, 12));

    expect(searchItems(entries, "saya").some((item) => item.id === "lx-saya")).toBe(true);
    expect(searchItems(entries, "you").some((item) => item.id === "lx-awak")).toBe(true);
    expect(searchItems(entries, "starter").some((item) => item.id === "lx-saya")).toBe(true);
  });
});
