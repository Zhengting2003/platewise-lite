
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Scan() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("choose");
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const html5QrRef = useRef(null);

  useEffect(() => {
    if (mode !== "simulated") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanResult("Leftover rice");
          return 100;
        }

        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    if (mode !== "camera") return;

    const startScanner = async () => {
      try {
        const html5Qr = new Html5Qrcode("qr-reader");
        html5QrRef.current = html5Qr;

        await html5Qr.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            setScanResult(decodedText.replace("platewise://", ""));
            html5Qr.stop().catch(() => {});
          },
          () => {}
        );
      } catch (err) {
        setErrorMsg("Camera is not available.");
        setMode("manual");
      }
    };

    startScanner();

    return () => {
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {});
      }
    };
  }, [mode]);

  const reset = () => {
    setMode("choose");
    setProgress(0);
    setScanResult(null);
    setManualInput("");
    setErrorMsg("");
  };

  return (
    <div className="screen">
      <TopBar badge="Add food" />

      {!scanResult && (
        <>
          <div className="eyebrow">Add to fridge</div>

          <h1>
            Scan your
            <br />
            food.
          </h1>

          <p className="subtitle">
            Choose the easiest way to tell PlateWise what you have.
          </p>
        </>
      )}

      {mode === "choose" && (
        <>
          <div className="scan-intro">
            <div className="scan-intro-icon">🌱</div>

            <div>
              <strong>Keep it simple</strong>
              <p>
                Scan a sticker, type the food name, or use our demo scanner.
              </p>
            </div>
          </div>

          <div
            className="mode-card"
            onClick={() => setMode("camera")}
          >
            <div className="mode-icon">⌾</div>

            <div className="mode-text">
              <div className="mode-title">Scan QR Code</div>
              <div className="mode-desc">
                Use your camera with a PlateWise sticker
              </div>
            </div>

            <div className="mode-arrow">›</div>
          </div>

          <div
            className="mode-card"
            onClick={() => setMode("manual")}
          >
            <div className="mode-icon">✎</div>

            <div className="mode-text">
              <div className="mode-title">Enter manually</div>
              <div className="mode-desc">
                Type the name of your food
              </div>
            </div>

            <div className="mode-arrow">›</div>
          </div>

          <div
            className="mode-card"
            onClick={() => setMode("simulated")}
          >
            <div className="mode-icon">▷</div>

            <div className="mode-text">
              <div className="mode-title">Demo scan</div>
              <div className="mode-desc">
                Simulate a successful scan
              </div>
            </div>

            <div className="mode-arrow">›</div>
          </div>

          <SimulatedTag text="Demo scan is simulated. No real QR code is required." />
        </>
      )}

      {mode === "camera" && !scanResult && (
        <>
          <div id="qr-reader"></div>

          {errorMsg && (
            <p
              style={{
                color: "#b95732",
                fontSize: "12px",
                marginTop: "12px",
              }}
            >
              {errorMsg}
            </p>
          )}

          <p className="camera-tip">
            Point your camera at a PlateWise QR sticker.
          </p>

          <button className="btn-secondary" onClick={reset}>
            Back
          </button>

          <SimulatedTag text="Camera mode uses your device camera." />
        </>
      )}

      {mode === "manual" && !scanResult && (
        <>
          <input
            className="input"
            type="text"
            placeholder="e.g. Leftover rice"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
          />

          <button
            className="btn-primary"
            disabled={!manualInput.trim()}
            onClick={() => setScanResult(manualInput.trim())}
          >
            Add food
          </button>

          <button className="btn-secondary" onClick={reset}>
            Back
          </button>

          <SimulatedTag text="Manual input works without a camera." />
        </>
      )}

      {mode === "simulated" && !scanResult && (
        <>
          <div className="scan-progress-card">
            <div className="scan-progress-top">
              <strong>Looking for food...</strong>

              <span className="progress-number">
                {progress}%
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button className="btn-secondary" onClick={reset}>
            Cancel
          </button>

          <SimulatedTag text="This scan is simulated for demonstration." />
        </>
      )}

      {scanResult && (
        <div className="success-wrap">
          <div className="success-icon">✓</div>

          <div className="eyebrow">Food added</div>

          <h1>Looks good!</h1>

          <p className="subtitle">
            PlateWise detected the following item.
          </p>

          <div className="detected-pill">
            🍚 {scanResult}
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate("/decision")}
          >
            Continue
            <span style={{ marginLeft: 6 }}>→</span>
          </button>

          <button className="btn-secondary" onClick={reset}>
            Scan another
          </button>
        </div>
      )}
    </div>
  );
}

