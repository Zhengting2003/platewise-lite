
export default function TopBar({ badge }) {
  return (
    <div className="topbar">
      <div className="logo">
        <span className="logo-mark">🍃</span>
        PlateWise
      </div>

      {badge && <div className="badge">{badge}</div>}
    </div>
  );
}

