import { useNavigate } from "react-router-dom";
import { mockStats } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Completion() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h1>Finished!</h1>
      <p>Nice work. Your food inventory has been updated.</p>

      <div className="stat-box">
        <div className="value">RM {mockStats.savedThisWeek.toFixed(2)}</div>
        <div className="label">Saved this week</div>
      </div>

      <div className="stat-box">
        <div className="value">{mockStats.wasteReduced} kg</div>
        <div className="label">Food waste reduced</div>
      </div>

      <button className="btn-primary" onClick={() => navigate("/")}>
        Continue
      </button>

      <SimulatedTag text="Savings and waste data are simulated." />
    </div>
  );
}