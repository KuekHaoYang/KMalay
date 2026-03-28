import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { course, useProgressState } from "../state/AppStateContext";
import { getCurrentUnit, getLessonStatus, getNextLesson, lessonMap } from "../lib/content";
import { getLessonStatusLabel, uiText } from "../lib/ui-language";

export default function PathPage() {
  const { snapshot, uiLanguageStage } = useProgressState();
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);
  const currentUnit = useMemo(
    () => getCurrentUnit(snapshot.progress.completedLessons),
    [snapshot.progress.completedLessons]
  );
  const nextLesson = useMemo(
    () => getNextLesson(snapshot.progress.completedLessons),
    [snapshot.progress.completedLessons]
  );
  const [expandedUnitId, setExpandedUnitId] = useState(currentUnit.id);

  useEffect(() => {
    setExpandedUnitId((activeUnitId) => activeUnitId || currentUnit.id);
  }, [currentUnit.id]);

  const unitSummaries = useMemo(
    () =>
      course.units.map((unit) => {
        const lessonStatuses = unit.lessonIds.map((lessonId) => ({
          lessonId,
          status: getLessonStatus(lessonId, snapshot.progress.completedLessons)
        }));
        const completedCount = lessonStatuses.filter((entry) => entry.status === "completed").length;
        const unlockedCount = lessonStatuses.filter((entry) => entry.status === "unlocked").length;
        const nextUnitLessonId =
          lessonStatuses.find((entry) => entry.status === "unlocked")?.lessonId ??
          lessonStatuses.find((entry) => entry.status === "completed")?.lessonId;

        return {
          unit,
          completedCount,
          unlockedCount,
          nextUnitLessonId,
          isCurrent: unit.id === currentUnit.id
        };
      }),
    [currentUnit.id, snapshot.progress.completedLessons]
  );

  const openCurrentUnit = () => {
    setExpandedUnitId(currentUnit.id);
    requestAnimationFrame(() => {
      document.getElementById(currentUnit.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  };

  return (
    <div className="page-stack path-page">
      <section className="panel">
        <p className="eyebrow">{t("Learn path", "Laluan belajar")}</p>
        <h2>{t("One straight line from survival Malay to usable daily vocabulary.", "Satu laluan lurus daripada Bahasa Melayu asas kepada kosa kata harian yang benar-benar boleh digunakan.")}</h2>
        <p className="muted-copy">
          {t(
            "Lessons unlock in order. The structure is intentionally linear because this is a personal tool, not a content maze.",
            "Pelajaran dibuka mengikut turutan. Strukturnya sengaja linear kerana ini alat peribadi, bukannya maze kandungan."
          )}
        </p>
      </section>

      <section className="panel compact-panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Path status", "Status laluan")}</p>
            <h3>{currentUnit.title}</h3>
            <p className="muted-copy">
              {snapshot.progress.completedLessons.length}/{course.lessons.length} {t("lessons cleared", "pelajaran selesai")}
            </p>
          </div>
          {nextLesson ? (
            <Link className="primary-button" to={`/lesson/${nextLesson.id}`}>
              {t("Continue lesson", "Teruskan pelajaran")}
            </Link>
          ) : null}
        </div>
        <div className="hero-actions">
          <button type="button" className="secondary-button" onClick={openCurrentUnit}>
            {t("Jump to current unit", "Pergi ke unit semasa")}
          </button>
          <span className="lesson-chip">
            {course.units.length} {t("units", "unit")}
          </span>
        </div>
      </section>

      {unitSummaries.map(({ unit, completedCount, unlockedCount, nextUnitLessonId, isCurrent }, index) => {
        const isExpanded = expandedUnitId === unit.id;
        const nextUnitLesson = nextUnitLessonId ? lessonMap[nextUnitLessonId] : undefined;
        const unitSummaryLabel =
          unlockedCount > 0
            ? `${unlockedCount} ${t("ready now", "sedia sekarang")}`
            : completedCount === unit.lessonIds.length
              ? t("Everything here is finished.", "Semua di sini sudah selesai.")
              : t("This unit is still locked by earlier lessons.", "Unit ini masih terkunci oleh pelajaran terdahulu.");
        const unitLinkLabel =
          completedCount === unit.lessonIds.length
            ? t("Review this unit", "Ulang kaji unit ini")
            : t("Open next lesson", "Buka pelajaran seterusnya");

        return (
          <section
            id={unit.id}
            key={unit.id}
            className={`panel unit-panel ${isExpanded ? "unit-panel-expanded" : "unit-panel-collapsed"}`}
            style={{
              ["--unit-color" as string]: unit.color,
              ["--unit-accent" as string]: unit.accent
            }}
          >
            <div className="unit-header">
              <div className="unit-icon">{unit.icon}</div>
              <div>
                <p className="eyebrow">{t("Unit", "Unit")} {index + 1}</p>
                <h3>{unit.title}</h3>
                <p>{unit.description}</p>
              </div>
              <div className="unit-actions">
                <span className="lesson-chip">
                  {completedCount}/{unit.lessonIds.length} {t("done", "siap")}
                </span>
                {isCurrent ? <span className="topic-chip">{t("Current unit", "Unit semasa")}</span> : null}
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setExpandedUnitId(isExpanded ? "" : unit.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? t("Hide lessons", "Sorok pelajaran") : t("Show lessons", "Tunjuk pelajaran")}
                </button>
              </div>
            </div>
            <div className="unit-summary">
              <p className="lesson-meta">{unitSummaryLabel}</p>
              {nextUnitLesson ? (
                <Link className="text-link" to={`/lesson/${nextUnitLesson.id}`}>
                  {unitLinkLabel}
                </Link>
              ) : null}
            </div>
            {isExpanded ? (
              <div className="lesson-grid">
                {unit.lessonIds.map((lessonId, lessonIndex) => {
                  const lesson = lessonMap[lessonId];
                  const status = getLessonStatus(lessonId, snapshot.progress.completedLessons);
                  return (
                    <article key={lesson.id} className={`lesson-card lesson-card-${status}`}>
                      <span className="lesson-chip">
                        {lessonIndex + 1}. {getLessonStatusLabel(uiLanguageStage, status)}
                      </span>
                      <h4>{lesson.title}</h4>
                      <p>{lesson.subtitle}</p>
                      <p className="lesson-meta">
                        {lesson.targetItemIds.length} {t("targets", "sasaran")} • {lesson.xpReward} XP
                      </p>
                      {status === "locked" ? (
                        <button type="button" className="secondary-button" disabled>
                          {t("Locked", "Terkunci")}
                        </button>
                      ) : (
                        <Link className={status === "completed" ? "secondary-button" : "primary-button"} to={`/lesson/${lesson.id}`}>
                          {status === "completed" ? t("Review lesson", "Ulang kaji pelajaran") : t("Start lesson", "Mula pelajaran")}
                        </Link>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
