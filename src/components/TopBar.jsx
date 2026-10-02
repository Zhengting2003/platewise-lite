export default function TopBar({ badge }) {
  return (
    <div className="topbar">
      <div className="logo">PlateWise</div>
      {badge && <div className="badge">{badge}</div>}
    </div>
  );
}