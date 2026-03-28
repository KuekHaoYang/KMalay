import { Link } from "react-router-dom";
import { course, useAppState } from "../state/AppStateContext";
import { getLessonStatus, lessonMap } from "../lib/content";

export default function PathPage() {
  const { snapshot } = useAppState();

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Learn path</p>
        <h2>One straight line from survival Malay to usable daily vocabulary.</h2>
        <p className="muted-copy">
          Lessons unlock in order. The structure is intentionally linear because this is a personal tool, not a content maze.
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
              <p className="eyebrow">Unit {index + 1}</p>
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
                    {lessonIndex + 1}. {status}
                  </span>
                  <h4>{lesson.title}</h4>
                  <p>{lesson.subtitle}</p>
                  <p className="lesson-meta">{lesson.targetItemIds.length} targets • {lesson.xpReward} XP</p>
                  {status === "locked" ? (
                    <button type="button" className="secondary-button" disabled>
                      Locked
                    </button>
                  ) : (
                    <Link className={status === "completed" ? "secondary-button" : "primary-button"} to={`/lesson/${lesson.id}`}>
                      {status === "completed" ? "Review lesson" : "Start lesson"}
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
