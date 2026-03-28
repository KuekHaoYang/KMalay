import type { CourseItem, UiLanguageStage } from "../types";
import { pathLessonOrder } from "./content";

export const getUiLanguageStage = (completedLessonCount: number): UiLanguageStage => {
  if (completedLessonCount >= 200) {
    return "malay";
  }

  if (completedLessonCount >= 150) {
    return "malay-guided";
  }

  if (completedLessonCount >= 100) {
    return "bilingual";
  }

  return "english";
};

export const getUiLanguageStageForLesson = (lessonId?: string): UiLanguageStage => {
  if (!lessonId) {
    return "english";
  }

  const lessonIndex = pathLessonOrder.indexOf(lessonId);
  if (lessonIndex < 0) {
    return "english";
  }

  return getUiLanguageStage(lessonIndex);
};

export const uiText = (stage: UiLanguageStage, english: string, malay: string) => {
  switch (stage) {
    case "bilingual":
      return `${english} / ${malay}`;
    case "malay-guided":
      return `${malay} / ${english}`;
    case "malay":
      return malay;
    default:
      return english;
  }
};

export const getTeachingPrompt = (item: CourseItem, stage: UiLanguageStage) => {
  const malayPrompt = item.malayHint ?? item.example;

  if (!malayPrompt) {
    return item.english[0];
  }

  switch (stage) {
    case "bilingual":
      return `${item.english[0]} / ${malayPrompt}`;
    case "malay-guided":
      return `${malayPrompt} / ${item.english[0]}`;
    case "malay":
      return malayPrompt;
    default:
      return item.english[0];
  }
};

export const canTeachThroughMalay = (items: CourseItem[], stage: UiLanguageStage) =>
  stage !== "english" && items.every((item) => Boolean(item.malayHint));

export const getLessonStatusLabel = (
  stage: UiLanguageStage,
  status: "locked" | "unlocked" | "completed"
) => {
  switch (status) {
    case "completed":
      return uiText(stage, "completed", "siap");
    case "unlocked":
      return uiText(stage, "ready", "sedia");
    default:
      return uiText(stage, "locked", "terkunci");
  }
};

export const getKindLabel = (stage: UiLanguageStage, kind: CourseItem["kind"]) =>
  kind === "phrase" ? uiText(stage, "phrase", "frasa") : uiText(stage, "lexeme", "leksim");
