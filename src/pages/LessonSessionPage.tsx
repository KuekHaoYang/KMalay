import { startTransition, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudySession from "../components/StudySession";
import { getLessonStatus, lessonMap } from "../lib/content";
import { buildLessonSession } from "../lib/session";
import { getUiLanguageStageForLesson, uiText } from "../lib/ui-language";
import { course, useAppActions, useCourseCatalogState, useProgressState } from "../state/AppStateContext";
import type { StudySessionSummary } from "../types";

export default function LessonSessionPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { itemMap, allItems, wordBankTokens } = useCourseCatalogState();
  const { snapshot } = useProgressState();
  const { submitStudySession } = useAppActions();
  const [completion, setCompletion] = useState<StudySessionSummary | null>(null);
  const lesson = lessonId ? lessonMap[lessonId] : undefined;
  const status = lesson ? getLessonStatus(lesson.id, snapshot.progress.completedLessons) : "locked";
  const lessonLanguageStage = getUiLanguageStageForLesson(lesson?.id);
  const t = (english: string, malay: string) => uiText(lessonLanguageStage, english, malay);
  const [questions, setQuestions] = useState(() =>
    lesson
      ? buildLessonSession(lesson.id, lesson.targetItemIds, itemMap, snapshot.progress, lessonLanguageStage, {
          allItems,
          wordBankTokens
        })
      : []
  );

  useEffect(() => {
    if (lesson) {
      setQuestions(
        buildLessonSession(lesson.id, lesson.targetItemIds, itemMap, snapshot.progress, lessonLanguageStage, {
          allItems,
          wordBankTokens
        })
      );
      setCompletion(null);
    }
  }, [allItems, itemMap, lesson, lessonId, lessonLanguageStage, snapshot.progress, wordBankTokens]);

  if (!lesson) {
    return (
      <section className="panel">
        <h2>{t("Lesson not found.", "Pelajaran tidak ditemui.")}</h2>
        <Link className="secondary-button" to="/path">
          {t("Back to path", "Kembali ke laluan")}
        </Link>
      </section>
    );
  }

  if (status === "locked") {
    return (
      <section className="panel">
        <p className="eyebrow">{t("Locked lesson", "Pelajaran terkunci")}</p>
        <h2>{lesson.title}</h2>
        <p>{t("Clear the previous lesson first. The path is linear on purpose.", "Selesaikan pelajaran sebelumnya dahulu. Laluan ini sengaja dibina secara linear.")}</p>
        <Link className="secondary-button" to="/path">
          {t("Back to path", "Kembali ke laluan")}
        </Link>
      </section>
    );
  }

  if (completion) {
    const lessonIndex = course.lessons.findIndex((entry) => entry.id === lesson.id);
    const nextLesson = course.lessons[lessonIndex + 1];

    return (
      <section className="panel result-panel">
        <p className="eyebrow">{t("Lesson complete", "Pelajaran selesai")}</p>
        <h2>{completion.passed ? t("Unlocked.", "Terbuka.") : t("Not enough mastery yet.", "Penguasaan masih belum cukup.")}</h2>
        <p>
          {t("Accuracy", "Ketepatan")}: {Math.round(completion.accuracy * 100)}% • {t("XP gained", "XP diperoleh")}: {completion.earnedXp}
        </p>
        <div className="chip-wrap">
          <span className="topic-chip">{t("Results saved locally", "Keputusan disimpan secara tempatan")}</span>
          <span className="topic-chip">{t("Review queue updated", "Barisan ulang kaji dikemas kini")}</span>
        </div>
        <div className="hero-actions">
          {completion.passed && nextLesson ? (
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                startTransition(() => navigate(`/lesson/${nextLesson.id}`));
              }}
            >
              {t("Continue to", "Teruskan ke")} {nextLesson.title}
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                startTransition(() => navigate("/review"));
              }}
            >
              {t("Open review", "Buka ulang kaji")}
            </button>
          )}
          <Link className="secondary-button" to="/path">
            {t("Back to path", "Kembali ke laluan")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <StudySession
      title={lesson.title}
      subtitle={lesson.subtitle}
      languageStage={lessonLanguageStage}
      questions={questions}
      onFinish={(payload) => {
        const summary: StudySessionSummary = {
          type: "lesson",
          lessonId: lesson.id,
          earnedXp: payload.earnedXp,
          accuracy: payload.accuracy,
          passed: payload.passed,
          studiedAt: new Date().toISOString(),
          results: payload.results
        };
        submitStudySession(summary);
        setCompletion(summary);
      }}
    />
  );
}
