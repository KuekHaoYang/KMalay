import { Link } from "react-router-dom";
import { uiText } from "../lib/ui-language";
import { course, useProgressState } from "../state/AppStateContext";
import { lessonMap } from "../lib/content";

export default function HomePage() {
  const { snapshot, dueReviewItems, nextLessonId, currentUnitTitle, uiLanguageStage, learnedWordCount } =
    useProgressState();
  const nextLesson = nextLessonId ? lessonMap[nextLessonId] : undefined;
  const totalLessons = course.lessons.length;
  const completedLessons = snapshot.progress.completedLessons.length;
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);
  const learnedWordsLabel = t(
    `You have learned ${new Intl.NumberFormat("en-US").format(learnedWordCount)} words.`,
    `Anda telah mempelajari ${new Intl.NumberFormat("ms-MY").format(learnedWordCount)} perkataan.`
  );

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">{t("Daily 5-10 minute loop", "Rutin harian 5-10 minit")}</p>
          <h2>{t("Build practical `ms-MY` vocabulary without wasting time.", "Bina kosa kata `ms-MY` yang praktikal tanpa membuang masa.")}</h2>
          <p className="hero-copy">
            {t(
              "KMalay keeps the Duolingo-like path, but the goal is speed: useful school language, real daily vocabulary, and review that actually resurfaces weak words.",
              "KMalay masih guna laluan seperti Duolingo, tetapi matlamatnya ialah kelajuan: bahasa sekolah yang berguna, kosa kata harian sebenar, dan ulang kaji yang benar-benar menghidupkan semula perkataan yang lemah."
            )}
          </p>
          <p className="lesson-chip">{learnedWordsLabel}</p>
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to={nextLesson ? `/lesson/${nextLesson.id}` : "/path"}>
            {nextLesson ? `${t("Continue", "Teruskan")} ${nextLesson.title}` : t("Open path", "Buka laluan")}
          </Link>
          <Link className="secondary-button" to="/review">
            {t("Review", "Ulang kaji")} {dueReviewItems.length > 0 ? `(${dueReviewItems.length})` : ""}
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-value">{snapshot.progress.currentStreak}</span>
          <span className="stat-label">{t("Current streak", "Rentetan semasa")}</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{snapshot.progress.xp}</span>
          <span className="stat-label">{t("XP earned", "XP diperoleh")}</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{completedLessons}/{totalLessons}</span>
          <span className="stat-label">{t("Lessons cleared", "Pelajaran selesai")}</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">{dueReviewItems.length}</span>
          <span className="stat-label">{t("Due reviews", "Ulang kaji perlu dibuat")}</span>
        </article>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Current path", "Laluan semasa")}</p>
            <h3>{currentUnitTitle}</h3>
          </div>
          <Link className="text-link" to="/path">
            {t("View full path", "Lihat seluruh laluan")}
          </Link>
        </div>
        {nextLesson ? (
          <article className="lesson-highlight">
            <div>
              <p className="lesson-chip">{t("Next lesson", "Pelajaran seterusnya")}</p>
              <h4>{nextLesson.title}</h4>
              <p>{nextLesson.subtitle}</p>
            </div>
            <Link className="primary-button" to={`/lesson/${nextLesson.id}`}>
              {t("Start lesson", "Mula pelajaran")}
            </Link>
          </article>
        ) : (
          <article className="lesson-highlight">
            <div>
              <p className="lesson-chip">{t("Path complete", "Laluan selesai")}</p>
              <h4>{t("You finished the starter path.", "Anda sudah menamatkan laluan asas.")}</h4>
              <p>{t("Stay sharp through review and use the lexicon to add your own words.", "Kekalkan momentum melalui ulang kaji dan gunakan leksikon untuk menambah perkataan anda sendiri.")}</p>
            </div>
            <Link className="secondary-button" to="/lexicon">
              {t("Open lexicon", "Buka leksikon")}
            </Link>
          </article>
        )}
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Due now", "Perlu sekarang")}</p>
            <h3>{t("Review pressure", "Tekanan ulang kaji")}</h3>
          </div>
        </div>
        {dueReviewItems.length === 0 ? (
          <p className="muted-copy">
            {t(
              "Nothing is overdue. Finish a path lesson or add a custom word to create fresh review.",
              "Tiada apa yang tertunggak. Tamatkan satu pelajaran atau tambah perkataan baharu untuk mewujudkan ulang kaji baharu."
            )}
          </p>
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
