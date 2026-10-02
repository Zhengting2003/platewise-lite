
import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Stats() {
  return (
    <div className="screen">
      <TopBar badge="Impact" />

      <h1>Your impact</h1>

      <p className="subtitle">
        Small food choices can make a difference.
      </p>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="icon">💰</div>

          <div className="value">
            RM {mockStats.savedThisWeek.toFixed(2)}
          </div>

          <div className="label">
            Money saved
          </div>
        </div>

        <div className="stat-box">
          <div className="icon">🌱</div>

          <div className="value">
            {mockStats.wasteReduced}
          </div>

          <div className="label">
            kg waste reduced
          </div>
        </div>

        <div className="stat-box full">
          <div className="icon">🍽️</div>

          <div className="value">
            {mockStats.mealsSaved}
          </div>

          <div className="label">
            Meals saved from waste
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-small-label">
          THIS WEEK
        </div>

        <h2 style={{ marginTop: 7 }}>
          Keep the momentum going 🌿
        </h2>

        <p
          style={{
            marginTop: 8,
            color: "#718078",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          Every meal you finish is one less meal
          that could become food waste.
        </p>
      </div>

      <SimulatedTag text="All statistics are simulated for this prototype." />
    </div>
  );
}

