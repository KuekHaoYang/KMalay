import { openDB } from "idb";
import type { AppSnapshot, ExportBundle } from "../types";

const DB_NAME = "kmalay";
const STORE_NAME = "app";
const SNAPSHOT_KEY = "snapshot";

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
  const snapshot = await db.get(STORE_NAME, SNAPSHOT_KEY);
  return snapshot ? mergeSnapshot(snapshot as AppSnapshot) : defaultSnapshot;
};

export const saveSnapshot = async (snapshot: AppSnapshot) => {
  const db = await getDb();
  await db.put(STORE_NAME, snapshot, SNAPSHOT_KEY);
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
