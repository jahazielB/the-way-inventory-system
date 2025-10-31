import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export const BarcodeScanner = forwardRef(
  ({ scanning, onDetected, onStop }, ref) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const codeReaderRef = useRef(null);
    const streamRef = useRef(null);
    const runningRef = useRef(false);
    const lastDetectedRef = useRef(null);


    // expose stop method to parent
    useImperativeHandle(ref, () => ({
      stop: async () => {
        await stopScanner();
        if (onStop) onStop();
      },
    }));

 useEffect(() => {
  let mounted = true;

  const setup = async () => {
    // If scanning is false, ensure we cleaned up and clear lastDetected
    if (!scanning) {
      lastDetectedRef.current = null;
      await stopScanner();
      return;
    }

    // If a previous stop is still running, wait for it
    await stopScanner();

    runningRef.current = true;
    lastDetectedRef.current = null; // clear last-detected before starting new session
    codeReaderRef.current = new BrowserMultiFormatReader();

    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (!devices || devices.length === 0) {
        alert("No camera found");
        if (onStop) onStop();
        return;
      }

      const back = devices.find((d) =>
        /back|rear|environment/i.test(d.label || "")
      );
      const deviceId = back ? back.deviceId : devices[0].deviceId;

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { deviceId },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
      }

      // start ZXing decode loop
      codeReaderRef.current.decodeFromVideoDevice(
        deviceId,
        videoRef.current,
        (result, err) => {
          if (!runningRef.current || !mounted) return;

          // draw scanning box
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx && videoRef.current) {
            const vw =
              videoRef.current.videoWidth ||
              videoRef.current.clientWidth;
            const vh =
              videoRef.current.videoHeight ||
              videoRef.current.clientHeight;
            canvasRef.current.width = vw;
            canvasRef.current.height = vh;
            ctx.clearRect(0, 0, vw, vh);
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(vw * 0.2, vh * 0.3, vw * 0.6, vh * 0.4);
          }

          if (result) {
            const text = result.getText();

            // Guard: ignore if same as lastDetected immediately
            if (lastDetectedRef.current && lastDetectedRef.current === text) {
              return;
            }
            lastDetectedRef.current = text;

            // Feedback (vibrate + beep)
            if (navigator.vibrate) navigator.vibrate(150);
            try {
              const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = "sine";
              osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
              gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.12);
            } catch (e) {}

            // Highlight successful scan
            const ctx2 = canvasRef.current?.getContext("2d");
            if (ctx2 && videoRef.current) {
              const vw =
                videoRef.current.videoWidth ||
                videoRef.current.clientWidth;
              const vh =
                videoRef.current.videoHeight ||
                videoRef.current.clientHeight;
              ctx2.strokeStyle = "lime";
              ctx2.lineWidth = 4;
              ctx2.strokeRect(vw * 0.2, vh * 0.3, vw * 0.6, vh * 0.4);
            }

            // Notify parent immediately
            if (onDetected) onDetected(text);

            // Clear internal ZXing decode loop then stop camera
            (async () => {
              try {
                if (codeReaderRef.current) {
                  if (typeof codeReaderRef.current.stopContinuousDecode === "function")
                    await codeReaderRef.current.stopContinuousDecode();
                  if (typeof codeReaderRef.current.reset === "function")
                    await codeReaderRef.current.reset();
                }
              } catch (e) {
                console.warn("ZXing cleanup warning:", e);
              }

              await stopScanner();
            })();
          }
        }
      );
    } catch (err) {
      console.error("Scanner start error:", err);
      await stopScanner();
      if (onStop) onStop();
    }
  };

  setup();

  return () => {
    mounted = false;
    stopScanner();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [scanning]);


    // --- Fully safe stop routine ---
    const stopScanner = async () => {
      runningRef.current = false;

      try {
        // Stop ZXing decoder
        if (codeReaderRef.current) {
          try {
            await codeReaderRef.current.stopContinuousDecode?.();
          } catch (e) {
            console.warn("stopContinuousDecode error:", e);
          }
          try {
            await codeReaderRef.current.reset?.();
          } catch (e) {
            console.warn("reset error:", e);
          }
          codeReaderRef.current = null;
        }

        // Stop camera tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            try {
              track.stop();
            } catch {}
          });
          streamRef.current = null;
        }

        // Detach video stream
        if (videoRef.current) {
          const vid = videoRef.current;
          try {
            vid.pause();
            if (vid.srcObject) {
              vid.srcObject.getTracks().forEach((t) => t.stop());
              vid.srcObject = null;
            }
            vid.removeAttribute("srcObject");
            vid.load();
          } catch (e) {
            console.warn("Video cleanup error:", e);
          }
        }

        await new Promise((r) => setTimeout(r, 300));
        
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      }
    };

    const handleManualStop = async () => {
      await stopScanner();
      if (onStop) onStop();
    };

    return scanning ? (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={handleManualStop}
              className="px-6 py-3 bg-red-600 text-white text-base font-semibold rounded-full shadow-lg active:scale-95"
            >
              Stop Scan
            </button>
          </div>
        </div>
        <p className="text-white mt-3 text-sm">Scanning for barcode...</p>
      </div>
    ) : null;
  }
);

export default BarcodeScanner;
