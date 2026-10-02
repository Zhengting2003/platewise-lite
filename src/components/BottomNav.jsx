import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end>
        <span>🏠</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/stats">
        <span>📊</span>
        <span>Stats</span>
      </NavLink>
      <NavLink to="/profile">
        <span>👤</span>
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}