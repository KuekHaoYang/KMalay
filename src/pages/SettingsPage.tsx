import { useRef, useState } from "react";
import { useAppState } from "../state/AppStateContext";
import type { ExportBundle } from "../types";

export default function SettingsPage() {
  const { snapshot, exportBackup, importBackupBundle, resetAllProgress } = useAppState();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Settings</p>
        <h2>Local-first means your data belongs to this device until you export it.</h2>
        <p className="muted-copy">
          There is no sync backend in v1. Export and import exist because losing study history for a personal tool would be stupid.
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Backup</p>
            <h3>Export or restore your progress</h3>
          </div>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              const bundle = exportBackup();
              const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `kmalay-backup-${bundle.exportedAt.slice(0, 10)}.json`;
              link.click();
              URL.revokeObjectURL(url);
              setMessage("Backup exported.");
            }}
          >
            Export JSON
          </button>
          <button type="button" className="secondary-button" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }

              try {
                const text = await file.text();
                importBackupBundle(JSON.parse(text) as ExportBundle);
                setMessage("Backup imported.");
              } catch {
                setMessage("Import failed. Check the file format.");
              }
            }}
          />
        </div>
        {message && <p className="muted-copy">{message}</p>}
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Snapshot</p>
            <h3>Current local state</h3>
          </div>
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <span className="stat-value">{snapshot.progress.completedLessons.length}</span>
            <span className="stat-label">Lessons done</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{Object.keys(snapshot.progress.reviewStates).length}</span>
            <span className="stat-label">Tracked reviews</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{snapshot.customEntries.length}</span>
            <span className="stat-label">Custom items</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{snapshot.progress.longestStreak}</span>
            <span className="stat-label">Longest streak</span>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Reset</p>
            <h3>Erase local progress</h3>
          </div>
        </div>
        <button
          type="button"
          className="danger-button"
          onClick={() => {
            if (window.confirm("Delete all local progress and custom entries?")) {
              resetAllProgress();
              setMessage("Progress reset.");
            }
          }}
        >
          Reset local data
        </button>
      </section>
    </div>
  );
}
