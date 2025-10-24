import { useState,useRef } from "react";
import {
  Button,
  Popover,
  Snackbar,
  Alert,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { QrCodeScanner } from "@mui/icons-material";

export const UserReleaseReplenishPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [mode, setMode] = useState("replenish"); // toggle between modes
  const [cooldown, setCooldown] = useState(false);


  const handleScanDetected = (text) => {
    setSnackbar({
      open: true,
      type: "success",
      message: `Detected: ${text}`,
    });
    setScanning(false);

  };
    const handleStopScan = () => {
    // call the scanner's exposed stop immediately (most reliable)
    if (scannerRef.current && typeof scannerRef.current.stop === "function") {
      scannerRef.current.stop();
    }
    // ensure parent state also reflects stopped
    setScanning(false);
  };
  const handleStartScan = () => {
  if (cooldown || scanning) return; // prevent double taps
  setScanning(true);
  setCooldown(true);

  // small cooldown (1.5 s)
  setTimeout(() => setCooldown(false), 1500);
};

  const handlePopover = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <div className="relative p-4.5 min-h-screen bg-gray-50 ">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="text-blue-700 flex flex-col">
          <span className="text-[15px] font-black">THE WAY</span>
          <span className="text-[10px] text-black">***For Admin Approval</span>
        </div>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, v) => v && setMode(v)}
          size="small"
        >
          <ToggleButton value="replenish">Replenish</ToggleButton>
          <ToggleButton value="release">Release</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Main Section */}
      <div className="p-5 ">
        <div className="w-[clamp(300px,50vw,1000px)] aspect-[1000/616] max-sm:h-[700px] bg-white rounded-2xl flex flex-col justify-center p-9 shadow-lg ">
          <Button
            onClick={handlePopover}
            variant="contained"
            sx={{
              backgroundColor: "rgba(241,243,249,1)",
              color: "black",
              "&:hover": { backgroundColor: "rgba(12,51,137,0.8)", color: "white" },
            }}
          >
            + ADD ITEM
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ mt: 1 }}
          >
            <div className="w-[clamp(300px,50vw,400px)] bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm text-gray-700">
                  Add Item
                </span>
                <Button onClick={handlePopoverClose} size="small">
                  Close
                </Button>
              </div>
              <form>
                <div className="flex flex-col gap-3 mb-4">
                  <TextField label="Item" variant="outlined" size="small" />
                  <TextField label="Unit" variant="outlined" size="small" />
                </div>
                <Button variant="contained" fullWidth>
                  Submit
                </Button>
              </form>
            </div>
          </Popover>

          <div className="flex gap-5 mt-6">
            <Button
              variant="contained"
              onClick={() => setScanning(true)}
              disabled={scanning}
            >
              Scan Barcode
            </Button>
            <Button
              variant="outlined"
              onClick={() => setScanning(false)}
              disabled={!scanning}
            >
              Stop Scan
            </Button>
          </div>
        </div>
      </div>

      {/* Scanner Helper */}
      <BarcodeScanner
        scanning={scanning}
        onDetected={handleScanDetected}
        onStop={() => setScanning(false)}
      />

      {/* Floating Scan Button (for mobile) */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartScan}
        disabled={cooldown || scanning}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          borderRadius: "50%",
          minWidth: 56,
          height: 56,
          opacity: cooldown || scanning ? 0.6 : 1,
          pointerEvents: cooldown || scanning ? "none" : "auto",
        }}
      >
        <QrCodeScanner />
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
       {/* Bottom SVG Background */}
        {/* <svg
        className="absolute bottom-0 left-0 w-full h-[500px] "
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        >
        <path
            d="M566.538 295.267C623.357 507.32 497.516 725.284 285.463 782.103C73.4103 838.922 -144.554 713.081 -201.373 501.028C-258.192 288.975 -132.351 71.0113 79.702 14.192C291.755 -42.6274 509.719 83.2141 566.538 295.267Z"
            fill="#0118D8"
        />
        <path
            d="M573.914 322.796C632.092 539.916 533.731 754.92 354.22 803.02C174.708 851.12 -17.9764 714.102 -76.1537 496.981C-134.331 279.86 -35.9704 64.8565 143.541 16.7565C323.052 -31.3434 515.737 105.675 573.914 322.796Z"
            fill="#1B56FD"
        />
        </svg> */}
    </div>
  );
};
