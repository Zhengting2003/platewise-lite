
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { mockRecommendations } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Decision() {
  const navigate = useNavigate();
  const location = useLocation();

  const scannedFood =
    location.state?.food || "Leftover rice";

  const [index, setIndex] = useState(0);

  const recommendation =
    mockRecommendations[index];

  return (
    <div className="screen">
      <TopBar badge="Eat first" />

      <div className="hero">
        <div className="hero-kicker">
          <span>🌿</span>
          PlateWise recommendation
        </div>

        <h1>Eat this first.</h1>

        <p>
          Based on what needs attention in your
          fridge.
        </p>

        <div className="hero-illustration">
          🍴
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#718078",
          fontWeight: 700,
          marginBottom: 5,
        }}
      >
        SCANNED ITEM
      </div>

      <div
        style={{
          color: "#1f684d",
          fontSize: 15,
          fontWeight: 800,
          marginBottom: 5,
        }}
      >
        {scannedFood}
      </div>

      <div className="recommend-card">
        <div className="tag">
          PRIORITY MEAL
        </div>

        <h2>
          {recommendation.title}
        </h2>

        <div className="step-title">
          Simple steps
        </div>

        <ol>
          {recommendation.steps.map(
            (step, stepIndex) => (
              <li key={stepIndex}>
                {step}
              </li>
            )
          )}
        </ol>
      </div>

      <button
        className="btn-primary"
        onClick={() =>
          navigate("/completion", {
            state: {
              food: scannedFood,
            },
          })
        }
      >
        ✓ Eat this
      </button>

      <button
        className="btn-secondary"
        onClick={() =>
          setIndex(
            (current) =>
              (current + 1) %
              mockRecommendations.length
          )
        }
      >
        ↻ Give me another
      </button>

      <SimulatedTag text="Recommendations use preset prototype data." />
    </div>
  );
}

