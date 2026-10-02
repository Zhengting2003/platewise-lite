
import { useNavigate } from "react-router-dom";
import { mockFoodItems } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <TopBar badge="Waste less" />

      <div className="hero">
        <div className="hero-kicker">
          <span>✦</span>
          Smart food decisions
        </div>

        <h1>What should I eat first?</h1>

        <p>
          Let PlateWise help you use the food that needs
          attention first.
        </p>

        <div className="hero-illustration">
          🥗
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate("/scan")}
      >
        🍽️ Help me decide
      </button>

      <div className="card">
        <div className="card-header">
          <h2>Your fridge</h2>

          <span className="card-small-label">
            4 items
          </span>
        </div>

        {mockFoodItems.map((item) => (
          <div className="food-item" key={item.id}>
            <div className="food-left">
              <div className="food-icon">
                {item.icon}
              </div>

              <span className="name">
                {item.name}
              </span>
            </div>

            <span
              className={`expiry ${
                item.urgent ? "urgent" : ""
              }`}
            >
              {item.urgent ? "⚠ " : ""}
              {item.expiresIn}d
            </span>
          </div>
        ))}
      </div>

      <SimulatedTag text="Food data is preset for this prototype." />
    </div>
  );
}

