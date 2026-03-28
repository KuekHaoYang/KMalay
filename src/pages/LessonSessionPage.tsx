import { startTransition, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudySession from "../components/StudySession";
import { getLessonStatus, lessonMap } from "../lib/content";
import { buildLessonSession } from "../lib/session";
import { course, useAppState } from "../state/AppStateContext";
import type { StudySessionSummary } from "../types";

export default function LessonSessionPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { itemMap, snapshot, submitStudySession } = useAppState();
  const [completion, setCompletion] = useState<StudySessionSummary | null>(null);
  const lesson = lessonId ? lessonMap[lessonId] : undefined;
  const status = lesson ? getLessonStatus(lesson.id, snapshot.progress.completedLessons) : "locked";
  const [questions, setQuestions] = useState(() =>
    lesson ? buildLessonSession(lesson.id, lesson.targetItemIds, itemMap, snapshot.progress) : []
  );

  useEffect(() => {
    if (lesson) {
      setQuestions(buildLessonSession(lesson.id, lesson.targetItemIds, itemMap, snapshot.progress));
      setCompletion(null);
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <section className="panel">
        <h2>Lesson not found.</h2>
        <Link className="secondary-button" to="/path">
          Back to path
        </Link>
      </section>
    );
  }

  if (status === "locked") {
    return (
      <section className="panel">
        <p className="eyebrow">Locked lesson</p>
        <h2>{lesson.title}</h2>
        <p>Clear the previous lesson first. The path is linear on purpose.</p>
        <Link className="secondary-button" to="/path">
          Back to path
        </Link>
      </section>
    );
  }

  if (completion) {
    const lessonIndex = course.lessons.findIndex((entry) => entry.id === lesson.id);
    const nextLesson = course.lessons[lessonIndex + 1];

    return (
      <section className="panel result-panel">
        <p className="eyebrow">Lesson complete</p>
        <h2>{completion.passed ? "Unlocked." : "Not enough mastery yet."}</h2>
        <p>
          Accuracy: {Math.round(completion.accuracy * 100)}% • XP gained: {completion.earnedXp}
        </p>
        <div className="chip-wrap">
          <span className="topic-chip">Results saved locally</span>
          <span className="topic-chip">Review queue updated</span>
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
              Continue to {nextLesson.title}
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                startTransition(() => navigate("/review"));
              }}
            >
              Open review
            </button>
          )}
          <Link className="secondary-button" to="/path">
            Back to path
          </Link>
        </div>
      </section>
    );
  }

  return (
    <StudySession
      title={lesson.title}
      subtitle={lesson.subtitle}
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
