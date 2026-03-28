import { openDB } from "idb";
import type { AppSnapshot, ExportBundle, CustomEntry, UserProgress } from "../types";

const DB_NAME = "kmalay";
const STORE_NAME = "app";
const SNAPSHOT_KEY = "snapshot";
const PROGRESS_KEY = "progress";
const CUSTOM_ENTRIES_KEY = "customEntries";

const defaultSnapshot: AppSnapshot = {
  progress: {
    completedLessons: [],
    lessonScores: {},
    xp: 0,
    currentStreak: 0,
    longestStreak: 0,
    reviewStates: {},
    sessionCount: 0
  },
  customEntries: []
};

const getDb = () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });

export const loadSnapshot = async (): Promise<AppSnapshot> => {
  const db = await getDb();
  const [progress, customEntries] = await Promise.all([
    db.get(STORE_NAME, PROGRESS_KEY),
    db.get(STORE_NAME, CUSTOM_ENTRIES_KEY)
  ]);

  if (progress || customEntries) {
    return mergeSnapshot({
      progress: (progress as UserProgress | undefined) ?? defaultSnapshot.progress,
      customEntries: (customEntries as CustomEntry[] | undefined) ?? defaultSnapshot.customEntries
    });
  }

  const snapshot = await db.get(STORE_NAME, SNAPSHOT_KEY);
  return snapshot ? mergeSnapshot(snapshot as AppSnapshot) : defaultSnapshot;
};

export const saveProgress = async (progress: UserProgress) => {
  const db = await getDb();
  await db.put(STORE_NAME, progress, PROGRESS_KEY);
};

export const saveCustomEntries = async (customEntries: CustomEntry[]) => {
  const db = await getDb();
  await db.put(STORE_NAME, customEntries, CUSTOM_ENTRIES_KEY);
};

export const saveSnapshot = async (snapshot: AppSnapshot) => {
  await Promise.all([saveProgress(snapshot.progress), saveCustomEntries(snapshot.customEntries)]);
};

export const exportSnapshot = (snapshot: AppSnapshot): ExportBundle => ({
  exportedAt: new Date().toISOString(),
  schemaVersion: 1,
  snapshot
});

export const importSnapshot = (bundle: ExportBundle): AppSnapshot => {
  if (bundle.schemaVersion !== 1) {
    throw new Error("Unsupported backup version.");
  }

  return mergeSnapshot(bundle.snapshot);
};

export const resetSnapshot = async () => {
  await saveSnapshot(defaultSnapshot);
  return defaultSnapshot;
};

const mergeSnapshot = (incoming: AppSnapshot): AppSnapshot => ({
  progress: {
    ...defaultSnapshot.progress,
    ...incoming.progress,
    reviewStates: incoming.progress.reviewStates ?? {},
    lessonScores: incoming.progress.lessonScores ?? {}
  },
  customEntries: incoming.customEntries ?? []
});

export { defaultSnapshot };
