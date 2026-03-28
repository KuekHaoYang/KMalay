import { useEffect, useState } from "react";
import type {
  PairMatchQuestion,
  SessionQuestion,
  SessionQuestionResult,
  TypedQuestion,
  WordBankQuestion
} from "../types";
import { isQuestionCorrect, normalizeMalayText } from "../lib/session";

interface StudySessionProps {
  title: string;
  subtitle: string;
  questions: SessionQuestion[];
  onFinish: (payload: {
    accuracy: number;
    earnedXp: number;
    passed: boolean;
    results: SessionQuestionResult[];
  }) => void;
}

const getItemIds = (question: SessionQuestion) =>
  question.type === "pair-match" ? question.pairs.map((pair) => pair.itemId) : [question.itemId];

const getCorrectAnswerText = (question: SessionQuestion) => {
  if (question.type === "typed") {
    return question.acceptedAnswers[0];
  }

  if (question.type === "word-bank") {
    return question.answerTokens.join(" ");
  }

  if (question.type === "pair-match") {
    return question.pairs.map((pair) => `${pair.left} -> ${pair.right}`).join(" | ");
  }

  return question.correctAnswer;
};

const QuestionSurface = ({
  question,
  draftAnswer,
  setDraftAnswer,
  typedAnswer,
  setTypedAnswer,
  selectedBankTokens,
  setSelectedBankTokens,
  pairState,
  setPairState,
  locked
}: {
  question: SessionQuestion;
  draftAnswer: string;
  setDraftAnswer: (value: string) => void;
  typedAnswer: string;
  setTypedAnswer: (value: string) => void;
  selectedBankTokens: number[];
  setSelectedBankTokens: (value: number[]) => void;
  pairState: {
    activeLeft?: string;
    matchedPairs: string[];
    mistakes: number;
    message?: string;
  };
  setPairState: (value: {
    activeLeft?: string;
    matchedPairs: string[];
    mistakes: number;
    message?: string;
  }) => void;
  locked: boolean;
}) => {
  if (question.type === "recognition" || question.type === "reverse-recognition") {
    return (
      <div className="answer-stack">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={`answer-option ${draftAnswer === option ? "answer-option-active" : ""}`}
            onClick={() => setDraftAnswer(option)}
            disabled={locked}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "typed") {
    return (
      <label className="typed-answer">
        <span className="field-label">Malay answer</span>
        <input
          className="text-input"
          value={typedAnswer}
          placeholder={question.placeholder}
          onChange={(event) => setTypedAnswer(event.target.value)}
          disabled={locked}
        />
      </label>
    );
  }

  if (question.type === "word-bank") {
    const builtTokens = selectedBankTokens.map((index) => question.bank[index]);

    return (
      <div className="word-bank-area">
        <div className="word-bank-answer">
          {builtTokens.length === 0 ? (
            <span className="word-bank-placeholder">Tap words to build the Malay answer.</span>
          ) : (
            builtTokens.map((token, index) => (
              <button
                key={`${token}-${index}`}
                type="button"
                className="word-chip word-chip-active"
                onClick={() =>
                  setSelectedBankTokens(selectedBankTokens.filter((_, tokenIndex) => tokenIndex !== index))
                }
                disabled={locked}
              >
                {token}
              </button>
            ))
          )}
        </div>
        <div className="word-bank-grid">
          {question.bank.map((token, index) => {
            const taken = selectedBankTokens.includes(index);
            return (
              <button
                key={`${token}-${index}`}
                type="button"
                className={`word-chip ${taken ? "word-chip-hidden" : ""}`}
                onClick={() => {
                  if (!taken) {
                    setSelectedBankTokens([...selectedBankTokens, index]);
                  }
                }}
                disabled={locked || taken}
              >
                {token}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const pairQuestion = question as PairMatchQuestion;
  const remainingPairs = pairQuestion.pairs.filter(
    (pair) => !pairState.matchedPairs.includes(`${pair.left}::${pair.right}`)
  );
  const rightOptions = [...remainingPairs].sort((left, right) => left.right.localeCompare(right.right));

  return (
    <div className="pair-match">
      <div className="pair-columns">
        <div className="pair-column">
          <p className="field-label">English</p>
          {remainingPairs.map((pair) => (
            <button
              key={pair.itemId}
              type="button"
              className={`answer-option ${pairState.activeLeft === pair.itemId ? "answer-option-active" : ""}`}
              onClick={() =>
                setPairState({
                  ...pairState,
                  activeLeft: pair.itemId,
                  message: undefined
                })
              }
              disabled={locked}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="pair-column">
          <p className="field-label">Malay</p>
          {rightOptions.map((pair) => (
            <button
              key={pair.right}
              type="button"
              className="answer-option"
              onClick={() => {
                if (!pairState.activeLeft) {
                  setPairState({
                    ...pairState,
                    message: "Pick an English card first."
                  });
                  return;
                }

                if (pairState.activeLeft === pair.itemId) {
                  const matched = [...pairState.matchedPairs, `${pair.left}::${pair.right}`];
                  setPairState({
                    activeLeft: undefined,
                    matchedPairs: matched,
                    mistakes: pairState.mistakes,
                    message: "Matched."
                  });
                } else {
                  setPairState({
                    activeLeft: undefined,
                    matchedPairs: pairState.matchedPairs,
                    mistakes: pairState.mistakes + 1,
                    message: "Wrong pair. Try again."
                  });
                }
              }}
              disabled={locked}
            >
              {pair.right}
            </button>
          ))}
        </div>
      </div>
      {pairState.message && <p className="pair-message">{pairState.message}</p>}
      {pairState.matchedPairs.length > 0 && (
        <div className="matched-list">
          {pairState.matchedPairs.map((pair) => (
            <span key={pair} className="matched-pill">
              {pair.replace("::", " -> ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function StudySession({ title, subtitle, questions, onFinish }: StudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<SessionQuestionResult[]>([]);
  const [draftAnswer, setDraftAnswer] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [selectedBankTokens, setSelectedBankTokens] = useState<number[]>([]);
  const [pairState, setPairState] = useState<{
    activeLeft?: string;
    matchedPairs: string[];
    mistakes: number;
    message?: string;
  }>({
    matchedPairs: [],
    mistakes: 0
  });
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    answer: string;
    attempts: number;
  } | null>(null);

  const question = questions[currentIndex];

  useEffect(() => {
    setDraftAnswer("");
    setTypedAnswer("");
    setSelectedBankTokens([]);
    setPairState({ matchedPairs: [], mistakes: 0 });
    setFeedback(null);
  }, [question?.id]);

  useEffect(() => {
    if (!question || question.type !== "pair-match") {
      return;
    }

    if (pairState.matchedPairs.length === question.pairs.length) {
      const answer = [...pairState.matchedPairs];
      const correct = isQuestionCorrect(question, answer);
      setFeedback({
        correct: correct && pairState.mistakes === 0,
        answer: getCorrectAnswerText(question),
        attempts: Math.max(1, pairState.mistakes + 1)
      });
    }
  }, [pairState, question]);

  if (questions.length === 0) {
    return (
      <section className="panel session-panel">
        <p className="eyebrow">Nothing due</p>
        <h2>No questions are ready yet.</h2>
      </section>
    );
  }

  const commitResult = (correct: boolean, attempts: number) => {
    const nextResults = [
      ...results,
      {
        questionId: question.id,
        itemIds: getItemIds(question),
        correct,
        attempts
      }
    ];

    if (currentIndex === questions.length - 1) {
      const accuracy = nextResults.filter((result) => result.correct).length / nextResults.length;
      onFinish({
        accuracy,
        passed: accuracy >= 0.7,
        earnedXp: Math.max(6, Math.round(nextResults.length * 1.8 * accuracy)),
        results: nextResults
      });
      return;
    }

    setResults(nextResults);
    setCurrentIndex(currentIndex + 1);
  };

  const submitCurrentQuestion = () => {
    if (!question || feedback) {
      return;
    }

    const answer =
      question.type === "typed"
        ? typedAnswer
        : question.type === "word-bank"
          ? selectedBankTokens.map((index) => question.bank[index])
          : draftAnswer;

    if (
      (question.type === "typed" && typedAnswer.trim().length === 0) ||
      (question.type === "word-bank" && selectedBankTokens.length === 0) ||
      ((question.type === "recognition" || question.type === "reverse-recognition") && !draftAnswer)
    ) {
      return;
    }

    const correct = isQuestionCorrect(question, answer);
    setFeedback({
      correct,
      answer: getCorrectAnswerText(question),
      attempts: 1
    });
  };

  const canSubmit =
    question.type === "typed"
      ? typedAnswer.trim().length > 0
      : question.type === "word-bank"
        ? selectedBankTokens.length > 0
        : question.type === "pair-match"
          ? pairState.matchedPairs.length === question.pairs.length
          : Boolean(draftAnswer);

  return (
    <section className="panel session-panel">
      <div className="session-header">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{subtitle}</h2>
        </div>
        <p className="session-counter">
          {currentIndex + 1} / {questions.length}
        </p>
      </div>
      <div className="progress-rail" aria-hidden="true">
        <span style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <article className="question-card">
        <p className="field-label">{question.helper}</p>
        <h3 className="question-prompt">{question.prompt}</h3>
        {question.type === "typed" && typedAnswer && (
          <p className="answer-preview">{normalizeMalayText(typedAnswer) !== typedAnswer ? "Spacing will be normalized." : "Type your best answer once."}</p>
        )}
        <QuestionSurface
          question={question}
          draftAnswer={draftAnswer}
          setDraftAnswer={setDraftAnswer}
          typedAnswer={typedAnswer}
          setTypedAnswer={setTypedAnswer}
          selectedBankTokens={selectedBankTokens}
          setSelectedBankTokens={setSelectedBankTokens}
          pairState={pairState}
          setPairState={setPairState}
          locked={Boolean(feedback)}
        />
      </article>

      {feedback ? (
        <div className={`feedback-card ${feedback.correct ? "feedback-correct" : "feedback-wrong"}`}>
          <strong>{feedback.correct ? "Correct." : "Not quite."}</strong>
          <p>Answer: {feedback.answer}</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => commitResult(feedback.correct, feedback.attempts)}
          >
            {currentIndex === questions.length - 1 ? "Finish session" : "Next"}
          </button>
        </div>
      ) : question.type === "pair-match" ? (
        <div className="session-actions">
          <button type="button" className="secondary-button" disabled>
            Match all pairs
          </button>
        </div>
      ) : (
        <div className="session-actions">
          <button type="button" className="primary-button" onClick={submitCurrentQuestion} disabled={!canSubmit}>
            Check answer
          </button>
        </div>
      )}
    </section>
  );
}
