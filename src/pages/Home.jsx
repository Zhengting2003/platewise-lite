import { useNavigate } from "react-router-dom";
import { mockFoodItems } from "../data/mockData";
import SimulatedTag from "../components/SimulatedTag";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h1>PlateWise</h1>
      <p>Waste less. Eat better.</p>

      <button
        className="btn-primary"
        onClick={() => navigate("/scan")}
      >
        What should I eat first?
      </button>

      <div className="card">
        <h2>Items in your fridge</h2>
        {mockFoodItems.map((item) => (
          <div className="food-item" key={item.id}>
            <span>{item.name}</span>
            <span>Expires in {item.expiresIn}d</span>
          </div>
        ))}
      </div>

      <button className="btn-secondary" onClick={() => alert("Photo input simulated")}>
        📷 Photo input
      </button>
      <button className="btn-secondary" onClick={() => alert("Voice input simulated")}>
        🎤 Voice input
      </button>

      <SimulatedTag text="Photo, voice, and food data are preset. No real camera or microphone used." />
    </div>
  );
}