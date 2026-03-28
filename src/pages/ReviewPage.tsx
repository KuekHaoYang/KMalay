import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StudySession from "../components/StudySession";
import { buildReviewSession } from "../lib/session";
import { uiText } from "../lib/ui-language";
import { lessonMap } from "../lib/content";
import { useAppActions, useCourseCatalogState, useProgressState } from "../state/AppStateContext";
import type { StudySessionSummary } from "../types";

export default function ReviewPage() {
  const { itemMap, allItems } = useCourseCatalogState();
  const { snapshot, dueReviewItems, uiLanguageStage } = useProgressState();
  const { submitStudySession } = useAppActions();
  const [pendingAdvance, setPendingAdvance] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [lastBatch, setLastBatch] = useState<StudySessionSummary | null>(null);
  const fallbackItemIds = useMemo(
    () =>
      snapshot.progress.completedLessons.flatMap(
        (lessonId) => lessonMap[lessonId]?.targetItemIds ?? []
      ),
    [snapshot.progress.completedLessons]
  );
  const [questions, setQuestions] = useState(() =>
    buildReviewSession(itemMap, snapshot.progress, fallbackItemIds, uiLanguageStage, {
      allItems
    })
  );
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);
  const reviewHeader =
    dueReviewItems.length > 0
      ? `${dueReviewItems.length} ${t("item(s) due now.", "item perlu dibuat sekarang.")}`
      : t("No due cards. Continuous practice is active.", "Tiada kad tertunggak. Latihan berterusan sedang aktif.");

  useEffect(() => {
    if (!pendingAdvance) {
      return;
    }

    setQuestions(
      buildReviewSession(itemMap, snapshot.progress, fallbackItemIds, uiLanguageStage, {
        allItems
      })
    );
    setSessionKey((current) => current + 1);
    setPendingAdvance(false);
  }, [allItems, fallbackItemIds, itemMap, pendingAdvance, snapshot.progress, uiLanguageStage]);

  if (questions.length === 0) {
    return (
      <section className="panel">
        <p className="eyebrow">{t("Review queue", "Barisan ulang kaji")}</p>
        <h2>{t("No cards are due yet.", "Belum ada kad yang perlu dibuat.")}</h2>
        <p className="muted-copy">
          {t(
            "Finish a lesson or add a custom entry. Review only matters when there is something worth resurfacing.",
            "Tamatkan satu pelajaran atau tambah entri tersuai. Ulang kaji hanya penting apabila ada sesuatu yang wajar dimunculkan semula."
          )}
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/path">
            {t("Start the path", "Mula laluan")}
          </Link>
          <Link className="secondary-button" to="/lexicon">
            {t("Add a word", "Tambah perkataan")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <section className="panel compact-panel">
        <p className="eyebrow">{t("Review queue", "Barisan ulang kaji")}</p>
        <h2>{reviewHeader}</h2>
        {lastBatch && (
          <p className="muted-copy">
            {t("Last batch", "Kumpulan terakhir")}: {Math.round(lastBatch.accuracy * 100)}% • +{lastBatch.earnedXp} XP
          </p>
        )}
      </section>
      <StudySession
        key={sessionKey}
        title={t("Review", "Ulang kaji")}
        subtitle={t("Fast resurfacing for anything weak or overdue.", "Munculkan semula dengan cepat apa-apa yang lemah atau tertunggak.")}
        languageStage={uiLanguageStage}
        questions={questions}
        onFinish={(payload) => {
          const summary: StudySessionSummary = {
            type: "review",
            earnedXp: payload.earnedXp,
            accuracy: payload.accuracy,
            passed: payload.passed,
            studiedAt: new Date().toISOString(),
            results: payload.results
          };
          submitStudySession(summary);
          setLastBatch(summary);
          setPendingAdvance(true);
        }}
      />
    </div>
  );
}
