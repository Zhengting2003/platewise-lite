import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import SimulatedTag from "../components/SimulatedTag";

export default function Scan() {
  const navigate = useNavigate();

  // 模式：choose / camera / manual / simulated
  const [mode, setMode] = useState("choose");
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);

  // 模拟扫描进度条
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

  // 真实摄像头扫描
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
            // 识别成功
            setScanResult(decodedText.replace("platewise://", ""));
            html5Qr.stop().catch(() => {});
          },
          () => {
            // 每帧失败忽略
          }
        );
      } catch (err) {
        setErrorMsg(
          "Camera not available. Please use manual input instead."
        );
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
      <h1>Scan your food</h1>
      <p>Choose how you want to log your food item.</p>

      {/* 模式选择 */}
      {mode === "choose" && (
        <div>
          <button className="btn-primary" onClick={() => setMode("camera")}>
            📷 Scan QR Code (Real)
          </button>
          <button className="btn-secondary" onClick={() => setMode("manual")}>
            ✍️ Enter manually
          </button>
          <button className="btn-secondary" onClick={() => setMode("simulated")}>
            ▶️ Simulate scan (Demo)
          </button>

          <SimulatedTag text="The 'Simulate scan' option is simulated. No real camera or QR code is used." />
        </div>
      )}

      {/* 真实摄像头扫描 */}
      {mode === "camera" && !scanResult && (
        <div>
          <div id="qr-reader" style={{ width: "100%", marginTop: 16 }}></div>
          {errorMsg && <p style={{ color: "red", marginTop: 12 }}>{errorMsg}</p>}
          <button className="btn-secondary" onClick={reset}>
            Back
          </button>

          <SimulatedTag text="Real camera is used. QR code must contain text like 'platewise://rice'." />
        </div>
      )}

      {/* 手动输入 */}
      {mode === "manual" && !scanResult && (
        <div>
          <input
            type="text"
            placeholder="e.g. Leftover rice"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 10,
              border: "1px solid #ccc",
              marginTop: 16,
              fontSize: 15,
            }}
          />
          <button
            className="btn-primary"
            disabled={!manualInput.trim()}
            onClick={() => setScanResult(manualInput.trim())}
          >
            Confirm
          </button>
          <button className="btn-secondary" onClick={reset}>
            Back
          </button>

          <SimulatedTag text="Manual input is a real fallback. No camera required." />
        </div>
      )}

      {/* 模拟扫描 */}
      {mode === "simulated" && !scanResult && (
        <div>
          <p style={{ marginTop: 16 }}>Scanning...</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <button className="btn-secondary" onClick={reset}>
            Cancel
          </button>

          <SimulatedTag text="Simulated scan. No real camera or QR code is used." />
        </div>
      )}

      {/* 识别成功 */}
      {scanResult && (
        <div className="card">
          <h2>✅ Detected</h2>
          <p style={{ marginTop: 8, fontSize: 16, fontWeight: 600 }}>
            {scanResult}
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/decision")}
          >
            Continue to Decision
          </button>
          <button className="btn-secondary" onClick={reset}>
            Scan another
          </button>
        </div>
      )}
    </div>
  );
}