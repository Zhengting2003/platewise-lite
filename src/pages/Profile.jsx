import { useState } from "react";
import SimulatedTag from "../components/SimulatedTag";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [stickerPrice, setStickerPrice] = useState("0.50");

  return (
    <div className="screen">
      <h1>Profile & Settings</h1>

      <div className="card">
        <h2>User</h2>
        <p>Mei, 21</p>
        <p>Shared apartment</p>
      </div>

      <div className="card">
        <h2>Notifications</h2>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Send reminders before food expires
        </label>
      </div>

      <div className="card">
        <h2>Sticker price (RM)</h2>
        <input
          type="number"
          value={stickerPrice}
          onChange={(e) => setStickerPrice(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            marginTop: 8,
          }}
        />
      </div>

      <SimulatedTag text="Settings are stored locally only. No real account system." />
    </div>
  );
}