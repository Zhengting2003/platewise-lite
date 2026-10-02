
import { useNavigate } from "react-router-dom";
import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Completion() {
  const navigate = useNavigate();

  return (
    <div className="screen completion-screen">
      <div className="success-wrap">
        <div className="success-icon">✓</div>

        <div className="eyebrow">Nice work</div>

        <h1 className="completion-title">
          Meal saved.
        </h1>

        <p className="celebrate-text">
          You used what you already had instead of letting it go to waste.
        </p>
      </div>

      <div className="impact-grid">
        <div className="impact-card">
          <div className="impact-icon">💰</div>

          <div className="impact-value">
            RM {mockStats.savedThisWeek.toFixed(2)}
          </div>

          <div className="impact-label">
            Saved this week
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-icon">🌱</div>

          <div className="impact-value">
            {mockStats.wasteReduced} kg
          </div>

          <div className="impact-label">
            Waste reduced
          </div>
        </div>

        <div className="impact-card full">
          <div className="impact-icon">🍽️</div>

          <div className="impact-value">
            {mockStats.mealsSaved} meals
          </div>

          <div className="impact-label">
            Meals saved from waste
          </div>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate("/")}
      >
        Back to fridge
      </button>

      <SimulatedTag text="Impact numbers are simulated for this prototype." />
    </div>
  );
}

