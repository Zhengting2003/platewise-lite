import { useState } from "react";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [stickerPrice, setStickerPrice] = useState("0.50");

  return (
    <div className="screen">
      <TopBar badge="Profile" />
      <h1>Profile</h1>
      <p className="subtitle">Manage your preferences.</p>

      <div className="card">
        <h2>User</h2>
        <p>Mei, 21</p>
        <p style={{ color: "#6b7f76", fontSize: 13 }}>Shared apartment</p>
      </div>

      <div className="card">
        <h2>Notifications</h2>
        <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 14 }}>Remind me before food expires</span>
        </label>
      </div>

      <div className="card">
        <h2>Sticker price (RM)</h2>
        <input
          className="input"
          type="number"
          value={stickerPrice}
          onChange={(e) => setStickerPrice(e.target.value)}
        />
      </div>

      <SimulatedTag text="Settings are stored locally only. No real account system." />
    </div>
  );
}