import { Link } from "react-router-dom";
import { course, useAppState } from "../state/AppStateContext";
import { lessonMap } from "../lib/content";

export default function HomePage() {
  const { snapshot, dueReviewItems, nextLessonId, currentUnitTitle } = useAppState();
  const nextLesson = nextLessonId ? lessonMap[nextLessonId] : undefined;
  const totalLessons = course.lessons.length;
  const completedLessons = snapshot.progress.completedLessons.length;

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Daily 5-10 minute loop</p>
          <h2>Build practical `ms-MY` vocabulary without wasting time.</h2>
          <p className="hero-copy">
            KMalay keeps the Duolingo-like path, but the goal is speed: useful school language, real daily vocabulary,
            and review that actually resurfaces weak words.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to={nextLesson ? `/lesson/${nextLesson.id}` : "/path"}>
            {nextLesson ? `Continue ${nextLesson.title}` : "Open path"}
          </Link>
          <Link className="secondary-button" to="/review">
            Review {dueReviewItems.length > 0 ? `(${dueReviewItems.length})` : ""}
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-value">{snapshot.progress.currentStreak}</span>
          <span className="stat-label">Current streak</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{snapshot.progress.xp}</span>
          <span className="stat-label">XP earned</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{completedLessons}/{totalLessons}</span>
          <span className="stat-label">Lessons cleared</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{dueReviewItems.length}</span>
          <span className="stat-label">Due reviews</span>
        </article>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Current path</p>
            <h3>{currentUnitTitle}</h3>
          </div>
          <Link className="text-link" to="/path">
            View full path
          </Link>
        </div>
        {nextLesson ? (
          <article className="lesson-highlight">
            <div>
              <p className="lesson-chip">Next lesson</p>
              <h4>{nextLesson.title}</h4>
              <p>{nextLesson.subtitle}</p>
            </div>
            <Link className="primary-button" to={`/lesson/${nextLesson.id}`}>
              Start lesson
            </Link>
          </article>
        ) : (
          <article className="lesson-highlight">
            <div>
              <p className="lesson-chip">Path complete</p>
              <h4>You finished the starter path.</h4>
              <p>Stay sharp through review and use the lexicon to add your own words.</p>
            </div>
            <Link className="secondary-button" to="/lexicon">
              Open lexicon
            </Link>
          </article>
        )}
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Due now</p>
            <h3>Review pressure</h3>
          </div>
        </div>
        {dueReviewItems.length === 0 ? (
          <p className="muted-copy">Nothing is overdue. Finish a path lesson or add a custom word to create fresh review.</p>
        ) : (
          <div className="chip-wrap">
            {dueReviewItems.slice(0, 8).map((item) => (
              <span key={item.id} className="topic-chip">
                {item.malay}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
