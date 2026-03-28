import { courseData } from "../data/course";
import type { CourseData, CourseItem, CustomEntry, Lesson, Unit } from "../types";
import { buildSearchEntries, type SearchEntry } from "./search";

export const course = courseData;

export const pathLessonOrder = course.units.flatMap((unit) => unit.lessonIds);

export const buildItemMap = (items: CourseItem[]) =>
  Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, CourseItem>;

const unique = <T,>(values: T[]) => [...new Set(values)];

const tokenizeMalayForBank = (value: string) =>
  value
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

const buildWordBankTokens = (items: CourseItem[]) =>
  unique(items.flatMap((item) => item.acceptedAnswers.flatMap((answer) => tokenizeMalayForBank(answer))));

export const baseItemMap = buildItemMap(course.items);
export const baseSearchEntries = buildSearchEntries(course.items);
export const baseWordBankTokens = buildWordBankTokens(course.items);

export const lessonMap = Object.fromEntries(course.lessons.map((lesson) => [lesson.id, lesson])) as Record<
  string,
  Lesson
>;

export const unitMap = Object.fromEntries(course.units.map((unit) => [unit.id, unit])) as Record<string, Unit>;

export const getAllItems = (customEntries: CustomEntry[]): CourseItem[] => [...course.items, ...customEntries];

export const getItemMap = (customEntries: CustomEntry[]) => buildItemMap(getAllItems(customEntries));

export interface CourseCatalog {
  allItems: CourseItem[];
  itemMap: Record<string, CourseItem>;
  searchEntries: SearchEntry[];
  wordBankTokens: string[];
}

export const buildCourseCatalog = (customEntries: CustomEntry[]): CourseCatalog => {
  if (customEntries.length === 0) {
    return {
      allItems: course.items,
      itemMap: baseItemMap,
      searchEntries: baseSearchEntries,
      wordBankTokens: baseWordBankTokens
    };
  }

  const allItems = [...course.items, ...customEntries];

  return {
    allItems,
    itemMap: buildItemMap(allItems),
    searchEntries: buildSearchEntries(allItems),
    wordBankTokens: unique([
      ...baseWordBankTokens,
      ...buildWordBankTokens(customEntries)
    ])
  };
};

export const getLessonStatus = (
  lessonId: string,
  completedLessons: string[]
): "locked" | "unlocked" | "completed" => {
  if (completedLessons.includes(lessonId)) {
    return "completed";
  }

  const lessonIndex = pathLessonOrder.indexOf(lessonId);
  if (lessonIndex <= 0) {
    return "unlocked";
  }

  return completedLessons.includes(pathLessonOrder[lessonIndex - 1]) ? "unlocked" : "locked";
};

export const getNextLesson = (completedLessons: string[]) =>
  course.lessons.find((lesson) => getLessonStatus(lesson.id, completedLessons) === "unlocked");

export const getCurrentUnit = (completedLessons: string[]) => {
  const nextLesson = getNextLesson(completedLessons);
  const activeUnitId = nextLesson?.unitId ?? course.units[course.units.length - 1]?.id;
  return course.units.find((unit) => unit.id === activeUnitId) ?? course.units[0];
};

export const validateCourseData = (data: CourseData) => {
  const errors: string[] = [];
  const itemIds = new Set<string>();
  const lessonIds = new Set<string>();
  const unitIds = new Set<string>();

  for (const item of data.items) {
    if (itemIds.has(item.id)) {
      errors.push(`Duplicate item id: ${item.id}`);
    }
    itemIds.add(item.id);

    if (item.acceptedAnswers.length === 0) {
      errors.push(`Item ${item.id} has no accepted answers.`);
    }

    if (item.english.length === 0) {
      errors.push(`Item ${item.id} has no English gloss.`);
    }
  }

  for (const lesson of data.lessons) {
    if (lessonIds.has(lesson.id)) {
      errors.push(`Duplicate lesson id: ${lesson.id}`);
    }
    lessonIds.add(lesson.id);

    for (const itemId of lesson.targetItemIds) {
      if (!itemIds.has(itemId)) {
        errors.push(`Lesson ${lesson.id} references missing item ${itemId}.`);
      }
    }
  }

  for (const unit of data.units) {
    if (unitIds.has(unit.id)) {
      errors.push(`Duplicate unit id: ${unit.id}`);
    }
    unitIds.add(unit.id);

    for (const lessonId of unit.lessonIds) {
      if (!lessonIds.has(lessonId)) {
        errors.push(`Unit ${unit.id} references missing lesson ${lessonId}.`);
      }
    }
  }

  return errors;
};
