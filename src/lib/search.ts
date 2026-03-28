import type { CourseItem } from "../types";

export interface SearchEntry {
  item: CourseItem;
  searchText: string;
}

export const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export const buildSearchEntries = (items: CourseItem[]): SearchEntry[] =>
  items.map((item) => ({
    item,
    searchText: normalizeSearchText(
      [
        item.malay,
        ...item.english,
        ...item.tags,
        item.registerNote ?? "",
        item.example ?? ""
      ].join(" ")
    )
  }));

export const searchItems = (entries: SearchEntry[], query: string): CourseItem[] => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return entries.map((entry) => entry.item);
  }

  return entries.filter((entry) => entry.searchText.includes(normalizedQuery)).map((entry) => entry.item);
};
