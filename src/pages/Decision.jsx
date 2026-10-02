import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRecommendations } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Decision() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const rec = mockRecommendations[index];

  return (
    <div className="screen">
      <TopBar badge="Eat first" />

      <h1>Eat this first</h1>
      <p className="subtitle">
        Based on what's expiring soonest in your fridge.
      </p>

      <div className="recommend-card">
        <div className="tag">PRIORITY</div>
        <h2>{rec.title}</h2>

        <p style={{ marginTop: 12, fontWeight: 600, fontSize: 13, opacity: 0.9 }}>
          Simple steps
        </p>
        <ol>
          {rec.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <button className="btn-primary" onClick={() => navigate("/completion")}>
        ✅ Eat this
      </button>
      <button className="btn-secondary" onClick={() => setIndex((i) => (i + 1) % mockRecommendations.length)}>
        🔄 Give me another
      </button>

      <SimulatedTag text="Recommendation is based on preset data. No real AI used." />
    </div>
  );
}