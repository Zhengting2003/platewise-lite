import { useNavigate } from "react-router-dom";
import { mockFoodItems } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <TopBar badge="Waste less" />

      <h1>What should I eat first?</h1>
      <p className="subtitle">
        Let PlateWise decide for you — no thinking needed after a long day.
      </p>

      <button className="btn-primary" onClick={() => navigate("/scan")}>
        🍽️ Help me decide
      </button>

      <div className="card">
        <h2>Items in your fridge</h2>
        {mockFoodItems.map((item) => (
          <div className="food-item" key={item.id}>
            <span className="name">{item.name}</span>
            <span className={`expiry ${item.urgent ? "urgent" : ""}`}>
              {item.urgent ? "⚠ Expires in " : "Expires in "}
              {item.expiresIn}d
            </span>
          </div>
        ))}
      </div>

      <SimulatedTag text="Food data is preset. No real database is used." />
    </div>
  );
}