
import { useState } from "react";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Profile() {
  const [notifications, setNotifications] =
    useState(true);

  const [stickerPrice, setStickerPrice] =
    useState("0.50");

  return (
    <div className="screen">
      <TopBar badge="Profile" />

      <h1>Profile</h1>

      <p className="subtitle">
        Make PlateWise work better for you.
      </p>

      <div className="card">
        <div className="profile-card">
          <div className="avatar">
            M
          </div>

          <div>
            <div className="profile-name">
              Mei
            </div>

            <div className="profile-description">
              Shared apartment · 21
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Preferences</h2>

        <div className="setting-row">
          <div>
            <div className="setting-title">
              Expiry reminders
            </div>

            <div className="setting-description">
              Remind me before food expires
            </div>
          </div>

          <button
            className={`toggle ${
              notifications ? "active" : ""
            }`}
            onClick={() =>
              setNotifications(
                (value) => !value
              )
            }
            aria-label="Toggle notifications"
          >
            <span className="toggle-circle" />
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Sticker price</h2>

        <p
          style={{
            color: "#718078",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Used when calculating your savings.
        </p>

        <input
          className="input"
          type="number"
          step="0.10"
          value={stickerPrice}
          onChange={(event) =>
            setStickerPrice(
              event.target.value
            )
          }
        />
      </div>

      <SimulatedTag text="Settings are stored locally in this prototype." />
    </div>
  );
}

