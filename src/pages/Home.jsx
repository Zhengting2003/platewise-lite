
import { useNavigate } from "react-router-dom";
import { mockFoodItems } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Home() {
  const navigate = useNavigate();

  const urgentItems = mockFoodItems.filter((item) => item.urgent);

  return (
    <div className="screen">
      <TopBar badge="Waste less" />

      <div className="eyebrow">Good afternoon</div>

      <h1>
        Eat what you
        <br />
        already have.
      </h1>

      <p className="subtitle">
        PlateWise helps you decide what to eat first, so less food goes to waste.
      </p>

      <div className="hero">
        <div className="hero-content">
          <div className="hero-kicker">
            <span>●</span>
            Fridge check
          </div>

          <h2>
            {urgentItems.length} items need your attention.
          </h2>

          <p>
            Your {urgentItems.map((item) => item.name.toLowerCase()).join(" and ")}
            {" "}should be used soon.
          </p>

          <button
            className="hero-action"
            onClick={() => navigate("/scan")}
          >
            Help me decide
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="section-header">
        <h2>Your fridge</h2>
        <span className="section-link">
          {mockFoodItems.length} items
        </span>
      </div>

      <div className="fridge-card">
        {mockFoodItems.map((item) => (
          <div className="food-item" key={item.id}>
            <div className="food-left">
              <div className="food-icon">{item.icon}</div>

              <div>
                <div className="food-name">{item.name}</div>
                <div className="food-meta">
                  {item.urgent ? "Use soon" : "Still fresh"}
                </div>
              </div>
            </div>

            <span className={`expiry ${item.urgent ? "urgent" : ""}`}>
              {item.expiresIn}d left
            </span>
          </div>
        ))}
      </div>

      <SimulatedTag text="Food data is preset for this prototype." />
    </div>
  );
}

