
import { useLocation, useNavigate } from "react-router-dom";
import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Completion() {
  const navigate = useNavigate();
  const location = useLocation();

  const food =
    location.state?.food || "your food";

  return (
    <div className="screen">
      <div className="success-icon">
        🎉
      </div>

      <div className="center">
        <h1>Nice work!</h1>

        <p className="subtitle">
          You used{" "}
          <strong style={{ color: "#2f8f67" }}>
            {food}
          </strong>{" "}
          instead of letting it go to waste.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="icon">💰</div>

          <div className="value">
            RM {mockStats.savedThisWeek.toFixed(2)}
          </div>

          <div className="label">
            Saved this week
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
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Back to home
      </button>

      <button
        className="btn-secondary"
        onClick={() => navigate("/stats")}
      >
        View my impact
      </button>

      <SimulatedTag text="Savings and waste data are simulated." />
    </div>
  );
}

