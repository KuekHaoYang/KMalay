import type { CourseItem, CustomEntry } from "../types";
import { course, lessonMap } from "./content";

export const tokenizeMalayWords = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

export const countItemWords = (item: CourseItem) => tokenizeMalayWords(item.malay).length;

export const countWordsAcrossItems = (items: CourseItem[]) =>
  items.reduce((total, item) => total + countItemWords(item), 0);

export const getLearnedItems = (
  completedLessons: string[],
  itemMap: Record<string, CourseItem>,
  customEntries: CustomEntry[]
) => {
  const learnedItemIds = new Set(
    completedLessons.flatMap((lessonId) => lessonMap[lessonId]?.targetItemIds ?? [])
  );

  return [
    ...Array.from(learnedItemIds)
      .map((itemId) => itemMap[itemId])
      .filter(Boolean),
    ...customEntries
  ];
};

export const countLearnedWords = (
  completedLessons: string[],
  itemMap: Record<string, CourseItem>,
  customEntries: CustomEntry[]
) => countWordsAcrossItems(getLearnedItems(completedLessons, itemMap, customEntries));

export const totalCourseWordCount = () => countWordsAcrossItems(course.items);
