// @vitest-environment jsdom

import { act } from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppStateProvider } from "../state/AppStateContext";
import LessonSessionPage from "./LessonSessionPage";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const finishPayload = {
  accuracy: 1,
  earnedXp: 12,
  passed: true,
  results: [
    {
      questionId: "question-1",
      itemIds: ["lx-saya"],
      correct: true,
      judgment: "correct" as const,
      attempts: 1
    }
  ]
};

vi.mock("../components/StudySession", () => ({
  default: ({ onFinish }: { onFinish: (payload: typeof finishPayload) => void }) => (
    <button type="button" onClick={() => onFinish(finishPayload)}>
      Finish test session
    </button>
  )
}));

vi.mock("../lib/storage", async () => {
  const actual = await vi.importActual<typeof import("../lib/storage")>("../lib/storage");

  return {
    ...actual,
    loadSnapshot: vi.fn().mockResolvedValue(actual.defaultSnapshot),
    saveProgress: vi.fn().mockResolvedValue(undefined),
    saveCustomEntries: vi.fn().mockResolvedValue(undefined),
    resetSnapshot: vi.fn().mockResolvedValue(actual.defaultSnapshot)
  };
});

describe("LessonSessionPage", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof ReactDOM.createRoot>;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter
          initialEntries={["/lesson/lesson-1"]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AppStateProvider>
            <Routes>
              <Route path="/lesson/:lessonId" element={<LessonSessionPage />} />
            </Routes>
          </AppStateProvider>
        </MemoryRouter>
      );

      await Promise.resolve();
    });
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
      await Promise.resolve();
    });

    container.remove();
  });

  it("keeps the completion panel visible after the lesson result updates progress", async () => {
    const finishButton = container.querySelector("button");

    expect(finishButton?.textContent).toContain("Finish test session");

    await act(async () => {
      finishButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Lesson complete");
    expect(container.textContent).toContain("Continue to");
    expect(container.textContent).not.toContain("Finish test session");
  });
});
