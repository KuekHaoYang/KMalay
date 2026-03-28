import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import LexiconPage from "./pages/LexiconPage";
import LessonSessionPage from "./pages/LessonSessionPage";
import PathPage from "./pages/PathPage";
import ReviewPage from "./pages/ReviewPage";
import SettingsPage from "./pages/SettingsPage";
import { useAppState } from "./state/AppStateContext";

export default function App() {
  const { isReady } = useAppState();

  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="loading-mark">K</div>
        <h1>KMalay</h1>
        <p>Loading your local course and review history.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/path" element={<PathPage />} />
        <Route path="/lesson/:lessonId" element={<LessonSessionPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/lexicon" element={<LexiconPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
