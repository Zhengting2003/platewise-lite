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

  // 模拟扫描
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

  // 真实摄像头
  useEffect(() => {
    if (mode !== "camera") return;

    const startScanner = async () => {
      try {
        const html5Qr = new Html5Qrcode("qr-reader");
        html5QrRef.current = html5Qr;

        await html5Qr.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            setScanResult(decodedText.replace("platewise://", ""));
            html5Qr.stop().catch(() => {});
          },
          () => {}
        );
      } catch (err) {
        setErrorMsg("Camera not available. Please use manual input.");
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
      <TopBar badge="Scan" />

      {!scanResult && (
        <>
          <h1>Scan your food</h1>
          <p className="subtitle">Choose how you want to log your food item.</p>
        </>
      )}

      {/* 模式选择 */}
      {mode === "choose" && (
        <>
          <div className="mode-card" onClick={() => setMode("camera")}>
            <span className="emoji">📷</span>
            <div className="text">
              <div className="title">Scan QR Code</div>
              <div className="desc">Use your camera to scan a PlateWise sticker</div>
            </div>
          </div>

          <div className="mode-card" onClick={() => setMode("manual")}>
            <span className="emoji">✍️</span>
            <div className="text">
              <div className="title">Enter manually</div>
              <div className="desc">Type the food name if you don't have a sticker</div>
            </div>
          </div>

          <div className="mode-card" onClick={() => setMode("simulated")}>
            <span className="emoji">▶️</span>
            <div className="text">
              <div className="title">Simulate scan</div>
              <div className="desc">For demo purposes only</div>
            </div>
          </div>

          <SimulatedTag text="The 'Simulate scan' option is simulated. No real camera or QR code is used." />
        </>
      )}

      {/* 真实扫描 */}
      {mode === "camera" && !scanResult && (
        <>
          <div id="qr-reader"></div>
          {errorMsg && <p style={{ color: "#b5451b", marginTop: 12 }}>{errorMsg}</p>}
          <button className="btn-secondary" onClick={reset}>Back</button>
          <SimulatedTag text="Real camera is used. QR code must contain text like 'platewise://rice'." />
        </>
      )}

      {/* 手动输入 */}
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
            Confirm
          </button>
          <button className="btn-secondary" onClick={reset}>Back</button>
          <SimulatedTag text="Manual input is a real fallback. No camera required." />
        </>
      )}

      {/* 模拟扫描 */}
      {mode === "simulated" && !scanResult && (
        <>
          <p style={{ marginTop: 20, fontWeight: 600 }}>Scanning...</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <button className="btn-secondary" onClick={reset}>Cancel</button>
          <SimulatedTag text="Simulated scan. No real camera or QR code is used." />
        </>
      )}

      {/* 成功 */}
      {scanResult && (
        <>
          <div className="success-icon">✅</div>
          <div className="center">
            <h1>Detected</h1>
            <p className="subtitle" style={{ fontSize: 18, fontWeight: 700, color: "#2d6a4f" }}>
              {scanResult}
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/decision")}>
            Continue to Decision
          </button>
          <button className="btn-secondary" onClick={reset}>
            Scan another
          </button>
        </>
      )}
    </div>
  );
}