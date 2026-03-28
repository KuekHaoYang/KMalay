export type PartOfSpeech =
  | "pronoun"
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "question"
  | "number"
  | "time"
  | "particle"
  | "preposition"
  | "expression";

export type ExerciseType =
  | "recognition"
  | "reverse-recognition"
  | "typed"
  | "word-bank"
  | "pair-match";

export type UiLanguageStage =
  | "english"
  | "bilingual"
  | "malay-guided"
  | "malay";

export interface ItemBase {
  id: string;
  kind: "lexeme" | "phrase";
  malay: string;
  english: string[];
  malayHint?: string;
  acceptedAnswers: string[];
  tags: string[];
  registerNote?: string;
  example?: string;
  audioKey?: string;
}

export interface Lexeme extends ItemBase {
  kind: "lexeme";
  partOfSpeech: PartOfSpeech;
}

export interface Phrase extends ItemBase {
  kind: "phrase";
  linkedLexemeIds: string[];
  usageContext: string;
}

export type CourseItem = Lexeme | Phrase;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  subtitle: string;
  targetItemIds: string[];
  masteryThreshold: number;
  exerciseTemplates: ExerciseType[];
  xpReward: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  accent: string;
  icon: string;
  lessonIds: string[];
}

export interface CourseData {
  items: CourseItem[];
  lessons: Lesson[];
  units: Unit[];
}

export interface ReviewState {
  itemId: string;
  interval: number;
  ease: number;
  dueDate: string;
  repetitions: number;
  lapses: number;
  lastResult: "fresh" | "correct" | "incorrect";
  lastReviewedAt?: string;
}

export interface UserProgress {
  completedLessons: string[];
  lessonScores: Record<string, number>;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: string;
  reviewStates: Record<string, ReviewState>;
  sessionCount: number;
}

export type CustomEntry = (Lexeme | Phrase) & {
  source: "custom";
  createdAt: string;
};

export interface AppSnapshot {
  progress: UserProgress;
  customEntries: CustomEntry[];
}

export interface ChoiceQuestion {
  id: string;
  type: "recognition" | "reverse-recognition";
  itemId: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  helper: string;
}

export interface TypedQuestion {
  id: string;
  type: "typed";
  itemId: string;
  prompt: string;
  acceptedAnswers: string[];
  helper: string;
  placeholder: string;
}

export interface WordBankQuestion {
  id: string;
  type: "word-bank";
  itemId: string;
  prompt: string;
  bank: string[];
  answerTokens: string[];
  helper: string;
}

export interface PairMatchQuestion {
  id: string;
  type: "pair-match";
  pairs: Array<{
    itemId: string;
    left: string;
    right: string;
  }>;
  prompt: string;
  helper: string;
}

export type SessionQuestion =
  | ChoiceQuestion
  | TypedQuestion
  | WordBankQuestion
  | PairMatchQuestion;

export interface SessionQuestionResult {
  questionId: string;
  itemIds: string[];
  correct: boolean;
  attempts: number;
}

export interface StudySessionSummary {
  type: "lesson" | "review";
  lessonId?: string;
  earnedXp: number;
  accuracy: number;
  passed: boolean;
  studiedAt: string;
  results: SessionQuestionResult[];
}

export interface ExportBundle {
  exportedAt: string;
  schemaVersion: 1;
  snapshot: AppSnapshot;
}
