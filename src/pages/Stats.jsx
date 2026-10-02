
import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Stats() {
  const weeklyData = [
    { day: "Mon", value: 72 },
    { day: "Tue", value: 46 },
    { day: "Wed", value: 84 },
    { day: "Thu", value: 58 },
    { day: "Fri", value: 91 },
    { day: "Sat", value: 66 },
    { day: "Sun", value: 78 },
  ];

  return (
    <div className="screen">
      <TopBar badge="Your impact" />

      <div className="eyebrow">This week</div>

      <h1>
        Small choices,
        <br />
        real impact.
      </h1>

      <p className="subtitle">
        Here's how PlateWise is helping you use more of what you have.
      </p>

      <div className="stats-hero">
        <div className="stats-hero-label">
          MONEY SAVED
        </div>

        <div className="stats-hero-value">
          RM {mockStats.savedThisWeek.toFixed(2)}
        </div>

        <div className="stats-hero-caption">
          Compared with your usual food waste
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="icon">🌱</div>

          <div className="value">
            {mockStats.wasteReduced} kg
          </div>

          <div className="label">
            Waste reduced
          </div>
        </div>

        <div className="stat-box">
          <div className="icon">🍽️</div>

          <div className="value">
            {mockStats.mealsSaved}
          </div>

          <div className="label">
            Meals saved
          </div>
        </div>
      </div>

      <div className="week-card">
        <div className="card-header">
          <h2>Weekly activity</h2>

          <span
            style={{
              fontSize: "10px",
              color: "#708279",
              fontWeight: 700,
            }}
          >
            7 days
          </span>
        </div>

        {weeklyData.map((item) => (
          <div className="week-row" key={item.day}>
            <span className="week-label">
              {item.day}
            </span>

            <div className="week-track">
              <div
                className="week-fill"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <SimulatedTag text="All statistics are simulated for this prototype." />
    </div>
  );
}

