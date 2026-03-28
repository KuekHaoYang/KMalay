import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/path", label: "Path" },
  { to: "/review", label: "Review" },
  { to: "/lexicon", label: "Lexicon" },
  { to: "/settings", label: "Settings" }
];

export default function AppLayout() {
  const location = useLocation();
  const { currentUnitTitle } = useAppState();
  const hideNav = location.pathname.startsWith("/lesson/");

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div>
          <p className="eyebrow">Malaysian Malay from English</p>
          <h1 className="brand-title">KMalay</h1>
        </div>
        <div className="current-unit-pill">Now: {currentUnitTitle}</div>
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
