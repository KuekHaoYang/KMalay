import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";
import { uiText } from "../lib/ui-language";

export default function AppLayout() {
  const location = useLocation();
  const { currentUnitTitle, uiLanguageStage } = useAppState();
  const hideNav = location.pathname.startsWith("/lesson/");
  const t = (english: string, malay: string) => uiText(uiLanguageStage, english, malay);
  const navItems = [
    { to: "/", label: t("Home", "Utama") },
    { to: "/path", label: t("Path", "Laluan") },
    { to: "/review", label: t("Review", "Ulang kaji") },
    { to: "/lexicon", label: t("Lexicon", "Leksikon") },
    { to: "/settings", label: t("Settings", "Tetapan") }
  ];

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div>
          <p className="eyebrow">{t("Malaysian Malay from English", "Bahasa Melayu Malaysia daripada bahasa Inggeris")}</p>
          <h1 className="brand-title">KMalay</h1>
        </div>
        <div className="current-unit-pill">{t("Now", "Sekarang")}: {currentUnitTitle}</div>
      </header>
      <main className={`page-frame ${hideNav ? "page-frame-session" : ""}`}>
        <Outlet />
      </main>
      {!hideNav && (
        <nav className="bottom-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
