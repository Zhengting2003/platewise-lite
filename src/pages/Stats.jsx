import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Stats() {
  return (
    <div className="screen">
      <TopBar badge="Stats" />
      <h1>Your impact</h1>
      <p className="subtitle">A quick look at what you've saved this week.</p>

      <div className="stat-box">
        <div className="value">RM {mockStats.savedThisWeek.toFixed(2)}</div>
        <div className="label">Money saved</div>
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