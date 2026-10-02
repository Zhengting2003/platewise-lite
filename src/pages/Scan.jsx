
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

import SimulatedTag from "../components/SimulatedTag";
import TopBar from "../components/TopBar";

export default function Scan() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("choose");
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const scannerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* ========================================
     SIMULATED SCAN
  ======================================== */

  useEffect(() => {
    if (mode !== "simulated") {
      return;
    }

    setProgress(0);
    setScanResult("");

    const timer = setInterval(() => {
      setProgress((current) => {
        const next = current + 10;

        if (next >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            if (mountedRef.current) {
              setScanResult("Leftover rice");
            }
          }, 150);

          return 100;
        }

        return next;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [mode]);

  /* ========================================
     CAMERA SCANNER
  ======================================== */

  useEffect(() => {
    if (mode !== "camera") {
      return;
    }

    let cancelled = false;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");

        scannerRef.current = scanner;

        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            if (cancelled) {
              return;
            }

            let result = decodedText;

            if (result.startsWith("platewise://")) {
              result = result.replace(
                "platewise://",
                ""
              );
            }

            try {
              await scanner.stop();
            } catch {
              // scanner may already be stopped
            }

            if (!cancelled && mountedRef.current) {
              setScanResult(result);
            }
          },
          () => {
            // Ignore normal QR scanning errors
          }
        );
      } catch (error) {
        if (!cancelled && mountedRef.current) {
          setErrorMsg(
            "Camera is not available. You can enter the food manually instead."
          );

          setMode("manual");
        }
      }
    };

    startScanner();

    return () => {
      cancelled = true;

      const cleanup = async () => {
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
          } catch {
            // already stopped
          }

          try {
            await scannerRef.current.clear();
          } catch {
            // already cleared
          }

          scannerRef.current = null;
        }
      };

      cleanup();
    };
  }, [mode]);

  /* ========================================
     RESET
  ======================================== */

  const reset = () => {
    setMode("choose");
    setProgress(0);
    setScanResult("");
    setManualInput("");
    setErrorMsg("");
  };

  /* ========================================
     CONTINUE
  ======================================== */

  const continueToDecision = () => {
    if (!scanResult) {
      return;
    }

    navigate("/decision", {
      state: {
        food: scanResult,
      },
    });
  };

  /* ========================================
     RENDER
  ======================================== */

  return (
    <div className="screen">
      <TopBar badge="Scan" />

      {!scanResult && (
        <>
          <h1>Scan your food</h1>

          <p className="subtitle">
            Add an item and PlateWise will help you
            decide what to eat first.
          </p>
        </>
      )}

      {/* CHOOSE MODE */}

      {mode === "choose" && !scanResult && (
        <>
          <div
            className="mode-card"
            onClick={() => setMode("camera")}
          >
            <span className="emoji">📷</span>

            <div className="text">
              <div className="title">
                Scan QR Code
              </div>

              <div className="desc">
                Scan a PlateWise food sticker
              </div>
            </div>

            <span className="mode-arrow">›</span>
          </div>

          <div
            className="mode-card"
            onClick={() => setMode("manual")}
          >
            <span className="emoji">✍️</span>

            <div className="text">
              <div className="title">
                Enter manually
              </div>

              <div className="desc">
                Type the food name yourself
              </div>
            </div>

            <span className="mode-arrow">›</span>
          </div>

          <div
            className="mode-card"
            onClick={() => setMode("simulated")}
          >
            <span className="emoji">✨</span>

            <div className="text">
              <div className="title">
                Demo scan
              </div>

              <div className="desc">
                Try the prototype without a camera
              </div>
            </div>

            <span className="mode-arrow">›</span>
          </div>

          <SimulatedTag text="Demo mode is simulated." />
        </>
      )}

      {/* CAMERA */}

      {mode === "camera" && !scanResult && (
        <>
          <div id="qr-reader"></div>

          <div className="scan-status">
            <span className="scan-dot"></span>
            Looking for a QR code...
          </div>

          {errorMsg && (
            <div className="error-message">
              {errorMsg}
            </div>
          )}

          <button
            className="btn-secondary"
            onClick={reset}
          >
            ← Back
          </button>

          <SimulatedTag text="Camera mode uses your device camera." />
        </>
      )}

      {/* MANUAL */}

      {mode === "manual" && !scanResult && (
        <>
          <div className="card">
            <h2>What's the food?</h2>

            <input
              className="input"
              type="text"
              placeholder="e.g. Leftover rice"
              value={manualInput}
              onChange={(event) =>
                setManualInput(event.target.value)
              }
              autoFocus
            />

            <button
              className="btn-primary"
              disabled={!manualInput.trim()}
              onClick={() =>
                setScanResult(manualInput.trim())
              }
            >
              Confirm food
            </button>
          </div>

          <button
            className="btn-secondary"
            onClick={reset}
          >
            ← Back
          </button>

          <SimulatedTag text="Manual input does not require a camera." />
        </>
      )}

      {/* SIMULATED */}

      {mode === "simulated" && !scanResult && (
        <>
          <div className="progress-container">
            <div className="progress-header">
              <span>Scanning food...</span>
              <span>{progress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={reset}
          >
            Cancel
          </button>

          <SimulatedTag text="This is a simulated scan for demonstration." />
        </>
      )}

      {/* RESULT */}

      {scanResult && (
        <>
          <div className="success-icon">
            ✓
          </div>

          <div className="center">
            <h1>Food detected</h1>

            <p
              className="subtitle"
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#2f8f67",
              }}
            >
              {scanResult}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={continueToDecision}
          >
            Continue
          </button>

          <button
            className="btn-secondary"
            onClick={reset}
          >
            Scan another
          </button>
        </>
      )}
    </div>
  );
}

