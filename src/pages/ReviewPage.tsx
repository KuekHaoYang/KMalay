import { startTransition, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudySession from "../components/StudySession";
import { buildReviewSession } from "../lib/session";
import { course, useAppState } from "../state/AppStateContext";
import type { StudySessionSummary } from "../types";

export default function ReviewPage() {
  const navigate = useNavigate();
  const { itemMap, snapshot, dueReviewItems, submitStudySession } = useAppState();
  const [completion, setCompletion] = useState<StudySessionSummary | null>(null);
  const fallbackItemIds = snapshot.progress.completedLessons
    .flatMap((lessonId) => course.lessons.find((lesson) => lesson.id === lessonId)?.targetItemIds ?? [])
    .slice(0, 12);
  const [questions, setQuestions] = useState(() => buildReviewSession(itemMap, snapshot.progress, fallbackItemIds));

  if (completion) {
    return (
      <section className="panel result-panel">
        <p className="eyebrow">Review logged</p>
        <h2>{completion.passed ? "Review queue cooled down." : "You found weak spots."}</h2>
        <p>
          Accuracy: {Math.round(completion.accuracy * 100)}% • XP gained: {completion.earnedXp}
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              startTransition(() => navigate("/"));
            }}
          >
            Back home
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              startTransition(() => navigate("/path"));
            }}
          >
            Continue path
          </button>
        </div>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="panel">
        <p className="eyebrow">Review queue</p>
        <h2>No cards are due yet.</h2>
        <p className="muted-copy">
          Finish a lesson or add a custom entry. Review only matters when there is something worth resurfacing.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/path">
            Start the path
          </Link>
          <Link className="secondary-button" to="/lexicon">
            Add a word
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <section className="panel compact-panel">
        <p className="eyebrow">Review queue</p>
        <h2>{dueReviewItems.length} item(s) due now.</h2>
      </section>
      <StudySession
        title="Review"
        subtitle="Fast resurfacing for anything weak or overdue."
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
