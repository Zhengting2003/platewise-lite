
import { useState } from "react";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [stickerPrice, setStickerPrice] = useState("0.50");

  return (
    <div className="screen">
      <TopBar badge="Profile" />

      <div className="eyebrow">Your account</div>

      <h1>Profile</h1>

      <p className="subtitle">
        Make PlateWise work the way you like.
      </p>

      <div className="profile-head">
        <div className="avatar">M</div>

        <div>
          <div className="profile-name">
            Mei
          </div>

          <div className="profile-type">
            Shared apartment · Member
          </div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-title">
          Preferences
        </div>

        <div className="settings-card">
          <div className="setting-row">
            <div className="setting-icon">🔔</div>

            <div className="setting-content">
              <div className="setting-label">
                Expiry reminders
              </div>

              <div className="setting-description">
                Get reminded before food expires
              </div>
            </div>

            <button
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
              aria-label="Toggle notifications"
            >
              <div className="toggle-knob" />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-icon">🏷️</div>

            <div className="setting-content">
              <div className="setting-label">
                Sticker price
              </div>

              <div className="setting-description">
                Cost used for savings estimates
              </div>
            </div>

            <input
              className="setting-input"
              type="number"
              step="0.10"
              value={stickerPrice}
              onChange={(e) =>
                setStickerPrice(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-title">
          About
        </div>

        <div className="settings-card">
          <div className="setting-row">
            <div className="setting-icon">🌿</div>

            <div className="setting-content">
              <div className="setting-label">
                Sustainability
              </div>

              <div className="setting-description">
                Every meal is a chance to waste less
              </div>
            </div>

            <span className="setting-value">
              ♡
            </span>
          </div>

          <div className="setting-row">
            <div className="setting-icon">ℹ️</div>

            <div className="setting-content">
              <div className="setting-label">
                About PlateWise
              </div>

              <div className="setting-description">
                Smart food decisions made simple
              </div>
            </div>

            <span className="setting-value">
              v1.0
            </span>
          </div>
        </div>
      </div>

      <SimulatedTag text="Settings are stored locally in this prototype." />
    </div>
  );
}

