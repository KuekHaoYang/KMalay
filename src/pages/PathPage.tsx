import { Link } from "react-router-dom";
import { course, useAppState } from "../state/AppStateContext";
import { getLessonStatus, lessonMap } from "../lib/content";
import { getLessonStatusLabel, uiText } from "../lib/ui-language";

export default function PathPage() {
  const { snapshot, uiLanguageStage } = useAppState();
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);

  return (
    <div className="page-stack">
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

      {course.units.map((unit, index) => (
        <section
          key={unit.id}
          className="panel unit-panel"
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
          </div>
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
        </section>
      ))}
    </div>
  );
}
