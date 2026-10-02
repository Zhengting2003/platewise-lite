
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRecommendations } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Decision() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const rec = mockRecommendations[index];

  const nextRecommendation = () => {
    setIndex(
      (current) =>
        (current + 1) % mockRecommendations.length
    );
  };

  return (
    <div className="screen">
      <TopBar badge="Eat first" />

      <div className="eyebrow">Today's decision</div>

      <h1>
        Let's make
        <br />
        dinner easy.
      </h1>

      <p className="subtitle">
        Based on the food that needs your attention first.
      </p>

      <div className="decision-summary">
        <div className="decision-summary-icon">⏱</div>
        <span>Using your expiring ingredients first</span>
      </div>

      <div className="recommend-card">
        <div className="priority-tag">
          PRIORITY MEAL
        </div>

        <h2>{rec.title}</h2>

        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "12px",
            lineHeight: 1.5,
            marginTop: "8px",
            maxWidth: "290px",
          }}
        >
          {rec.description}
        </p>

        <div className="recipe-label">
          Simple steps
        </div>

        <ol className="recipe-steps">
          {rec.steps.map((step, i) => (
            <li key={i}>
              <span className="step-number">
                {i + 1}
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate("/completion")}
      >
        ✓ I'll eat this
      </button>

      <button
        className="btn-secondary"
        onClick={nextRecommendation}
      >
        ↻ Show another idea
      </button>

      <SimulatedTag text="Recommendations use preset prototype data." />
    </div>
  );
}

