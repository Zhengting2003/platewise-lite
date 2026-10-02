
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end>
        <span className="icon">⌂</span>
        <span>Home</span>
      </NavLink>

      <NavLink to="/stats">
        <span className="icon">◒</span>
        <span>Impact</span>
      </NavLink>

      <NavLink to="/profile">
        <span className="icon">○</span>
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

