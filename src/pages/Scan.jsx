import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimulatedTag from "../components/SimulatedTag";

export default function Scan() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDone(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen">
      <h1>Scanning sticker...</h1>
      <p>Hold your phone over the PlateWise sticker.</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {done && (
        <div className="card">
          <h2>Scan successful</h2>
          <p>Detected: Leftover rice</p>
          <button className="btn-primary" onClick={() => navigate("/decision")}>
            Continue to Decision
          </button>
        </div>
      )}

      <SimulatedTag text="Scanning is simulated. No real QR code reading." />
    </div>
  );
}