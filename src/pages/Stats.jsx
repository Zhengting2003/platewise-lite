import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Stats() {
  return (
    <div className="screen">
      <h1>Your Stats</h1>

      <div className="stat-box">
        <div className="value">RM {mockStats.savedThisWeek.toFixed(2)}</div>
        <div className="label">Saved this week</div>
      </div>

      <div className="stat-box">
        <div className="value">{mockStats.wasteReduced} kg</div>
        <div className="label">Food waste reduced</div>
      </div>

      <div className="stat-box">
        <div className="value">{mockStats.mealsSaved}</div>
        <div className="label">Meals saved</div>
      </div>

      <SimulatedTag text="All statistics are simulated." />
    </div>
  );
}