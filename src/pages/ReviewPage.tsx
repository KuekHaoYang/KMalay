import { startTransition, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudySession from "../components/StudySession";
import { buildReviewSession } from "../lib/session";
import { uiText } from "../lib/ui-language";
import { course, useAppState } from "../state/AppStateContext";
import type { StudySessionSummary } from "../types";

export default function ReviewPage() {
  const navigate = useNavigate();
  const { itemMap, snapshot, dueReviewItems, submitStudySession, uiLanguageStage } = useAppState();
  const [completion, setCompletion] = useState<StudySessionSummary | null>(null);
  const fallbackItemIds = snapshot.progress.completedLessons
    .flatMap((lessonId) => course.lessons.find((lesson) => lesson.id === lessonId)?.targetItemIds ?? [])
    .slice(0, 12);
  const [questions, setQuestions] = useState(() =>
    buildReviewSession(itemMap, snapshot.progress, fallbackItemIds, uiLanguageStage)
  );
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);

  if (completion) {
    return (
      <section className="panel result-panel">
        <p className="eyebrow">{t("Review logged", "Ulang kaji direkodkan")}</p>
        <h2>{completion.passed ? t("Review queue cooled down.", "Barisan ulang kaji sudah reda.") : t("You found weak spots.", "Anda jumpa bahagian yang masih lemah.")}</h2>
        <p>
          {t("Accuracy", "Ketepatan")}: {Math.round(completion.accuracy * 100)}% • {t("XP gained", "XP diperoleh")}: {completion.earnedXp}
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              startTransition(() => navigate("/"));
            }}
          >
            {t("Back home", "Kembali ke utama")}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              startTransition(() => navigate("/path"));
            }}
          >
            {t("Continue path", "Teruskan laluan")}
          </button>
        </div>
      </section>
    );
  }

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
        <h2>{dueReviewItems.length} {t("item(s) due now.", "item perlu dibuat sekarang.")}</h2>
      </section>
      <StudySession
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
          setCompletion(summary);
          setQuestions([]);
        }}
      />
    </div>
  );
}
