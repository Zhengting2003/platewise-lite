import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRecommendations } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Decision() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const rec = mockRecommendations[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % mockRecommendations.length);
  };

  return (
    <div className="screen">
      <h1>Eat first today</h1>

      <div className="card">
        <h2>{rec.title}</h2>
        <p style={{ marginTop: 8, fontWeight: 600 }}>Simple steps:</p>
        <ol style={{ marginTop: 8, paddingLeft: 20 }}>
          {rec.steps.map((step, i) => (
            <li key={i} style={{ fontSize: 14, color: "#4a4a4a", marginBottom: 4 }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <button className="btn-primary" onClick={() => navigate("/completion")}>
        Eat this
      </button>
      <button className="btn-secondary" onClick={next}>
        Give me another
      </button>

      <SimulatedTag text="Recommendation is based on preset data. No real AI used." />
    </div>
  );
}