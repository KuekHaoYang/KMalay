import { useRef, useState } from "react";
import { useAppState } from "../state/AppStateContext";
import { uiText } from "../lib/ui-language";
import type { ExportBundle } from "../types";

export default function SettingsPage() {
  const { snapshot, exportBackup, importBackupBundle, resetAllProgress, uiLanguageStage } = useAppState();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">{t("Settings", "Tetapan")}</p>
        <h2>{t("Local-first means your data belongs to this device until you export it.", "Local-first bermaksud data anda kekal pada peranti ini sehingga anda mengeksportnya.")}</h2>
        <p className="muted-copy">
          {t(
            "There is no sync backend in v1. Export and import exist because losing study history for a personal tool would be stupid.",
            "Tiada backend penyegerakan dalam v1. Eksport dan import wujud kerana kehilangan sejarah pembelajaran untuk alat peribadi memang tindakan bodoh."
          )}
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Backup", "Sandaran")}</p>
            <h3>{t("Export or restore your progress", "Eksport atau pulihkan kemajuan anda")}</h3>
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
              setMessage(t("Backup exported.", "Sandaran dieksport."));
            }}
          >
            {t("Export JSON", "Eksport JSON")}
          </button>
          <button type="button" className="secondary-button" onClick={() => fileInputRef.current?.click()}>
            {t("Import JSON", "Import JSON")}
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
                setMessage(t("Backup imported.", "Sandaran diimport."));
              } catch {
                setMessage(t("Import failed. Check the file format.", "Import gagal. Semak format fail itu."));
              }
            }}
          />
        </div>
        {message && <p className="muted-copy">{message}</p>}
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Snapshot", "Gambar semasa")}</p>
            <h3>{t("Current local state", "Keadaan tempatan semasa")}</h3>
          </div>
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <span className="stat-value">{snapshot.progress.completedLessons.length}</span>
            <span className="stat-label">{t("Lessons done", "Pelajaran siap")}</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{Object.keys(snapshot.progress.reviewStates).length}</span>
            <span className="stat-label">{t("Tracked reviews", "Ulang kaji dijejaki")}</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{snapshot.customEntries.length}</span>
            <span className="stat-label">{t("Custom items", "Item tersuai")}</span>
          </article>
          <article className="stat-card">
            <span className="stat-value">{snapshot.progress.longestStreak}</span>
            <span className="stat-label">{t("Longest streak", "Rentetan terpanjang")}</span>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Reset", "Set semula")}</p>
            <h3>{t("Erase local progress", "Padam kemajuan tempatan")}</h3>
          </div>
        </div>
        <button
          type="button"
          className="danger-button"
          onClick={() => {
            if (window.confirm(t("Delete all local progress and custom entries?", "Padam semua kemajuan tempatan dan entri tersuai?"))) {
              resetAllProgress();
              setMessage(t("Progress reset.", "Kemajuan diset semula."));
            }
          }}
        >
          {t("Reset local data", "Set semula data tempatan")}
        </button>
      </section>
    </div>
  );
}
