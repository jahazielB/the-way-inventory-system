import { useState,useRef } from "react";
import {
  Button,
  Popover,
  Snackbar,
  Alert,
  TextField,
  ToggleButton,
  ToggleButtonGroup,Autocomplete,CircularProgress
} from "@mui/material";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { QrCodeScanner } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import supabase from "../supabase-client";


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
  const [addedItems, setAddedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  
  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    const { data:items, error } = await supabase
      .from("item_summary")
      .select("item_id, item_name")
      .ilike("item_name", `%${query}%`) // 🔥 case-insensitive partial match
     
    if (!error && items) {setOptions(items.map((i) => ({id:i.item_id,name:i.item_name})))};
    setLoading(false);
  };

  const handleScanDetected = async(text) => {
    setScanning(false);
     const { data, error } = await supabase
      .from("item_summary")
      .select("item_id, item_name")
      
      .ilike("item_name", `%${text}%`)
      
      .limit(1)
      .maybeSingle();

    if (error || !data) {
    setSnackbar({
      open: true,
      type: "error",
      message: "Item not found in database.",
    });
    return;
  }
    setSnackbar({
      open: true,
      type: "success",
      message: `Detected: ${text}`,
    });


      setAddedItems((prev) => [
            ...prev,
           { id: Date.now(), item: data.item_name, item_id:data.item_id,mode:mode==="replenish"?"stock_in":"stock_out"},
             ]);
    

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

   const columns = [
    { field: "item_id", headerName: "Item ID"},
    { field: "item", headerName: "Item", flex: 1 },
    { field: "unit", headerName: "Quantity", flex: 1,editable:true,renderEditCell: (params) => (
    <TextField
      type="number"
      size="small"
      value={params.value ?? ""}
      onChange={(e) => {
        const value = e.target.value;
        params.api.setEditCellValue({
          id: params.id,
          field: params.field,
          value: value === "" ? null : parseFloat(value),
        });
      }}
      slotProps={{
        input: {
          min: 0,
          step: "any", // ✅ allows decimals and integers
        },
      }}
    />
  ), },
    {
      field: "actions",
      headerName: "Actions",
      flex:1,
      sortable: false,
      renderCell: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() =>
            setAddedItems((prev) => prev.filter((i) => i.id !== params.row.id))
          }
        >
          Remove
        </Button>
      ),
    },
  ];
    const handleRowUpdate = (newRow, oldRow) => {
    // Update your state here
    const updatedRows = addedItems.map((row) =>
      row.id === oldRow.id ? newRow : row
    );
    setAddedItems(updatedRows);

    return newRow; // required
  };


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
          onChange={(e, v) => {
            v && setMode(v)
            setAddedItems([])
          }}
          size="small"
        >
          <ToggleButton value="replenish" sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#0000FF", // green when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#0047AB" }, // darker green on hover
                                },
                                color: "#000", // black when not selected
                                }}>Replenish</ToggleButton>
          <ToggleButton value="release" sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#0000FF", // green when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#0047AB" }, // darker green on hover
                                },
                                color: "#000", // black when not selected
                                }}>Release</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Main Section */}
      <div className="p-5 ">
        <div className="w-[clamp(300px,50vw,1000px)]  max-sm:h-[600px] bg-white rounded-2xl flex flex-col justify-start p-5 shadow-lg ">
                  {/* DataGrid Table */}
          {addedItems.length > 0 && (
            <div className="h-[280px] mb-4 absolute top-[250px] left-0 w-full">
              <DataGrid
                rows={addedItems}
                columns={columns}
                columnVisibilityModel={{
                item_id: false, // 👈 hides the column
              }}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableRowSelectionOnClick
                processRowUpdate={handleRowUpdate}
                experimentalFeatures={{newEditingApi:true}}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(241,243,249,1)",
                    color: "#000",
                    fontWeight: "bold",
                  },
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              <div className="flex  justify-between mt-6">
                <Button
                  variant="contained"
                  onClick={() => console.log(addedItems)}
                  // disabled={scanning}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  // onClick={() => setScanning(false)}
                  // disabled={!scanning}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                 const itemName = selectedItem?.name || selectedItem || "";
                 const itemId = selectedItem?.id || null;
                  const unit = e.target.unit.value.trim();
                  console.log(options)
                  if (!itemName || !unit) {
                    setSnackbar({
                      open: true,
                      type: "error",
                      message: "Please fill out both fields",
                    });
                    return;
                  }

                  setAddedItems((prev) => [
                    ...prev,
                    { id: Date.now(),item_id:itemId, item: itemName, unit,mode:mode==="replenish"?"stock_in":"stock_out" },
                  ]);

                  e.target.reset();
                  handlePopoverClose();
                }}
              >
                <div className="flex flex-col gap-3 mb-4">
                  <Autocomplete
                    options={options}
                    disablePortal
                    value={selectedItem}
                    getOptionLabel={(option) =>
                      typeof option === "string"
                        ? option
                        : option?.name || ""
                    }
                    filterOptions={(x) => x}
                    onChange={(e, newValue) => setSelectedItem(newValue)}
                    onInputChange={(e, newInput) => {
                      if (newInput.length >= 2) handleSearch(newInput);
                    }}
                    loading={loading}
                    openOnFocus
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Item"
                        size="small"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? <CircularProgress color="inherit" size={16} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />

                  <TextField
                    label="Unit"
                    name="unit"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <Button type="submit" variant="contained" fullWidth>
                  Add
                </Button>
              </form>
            </div>
          </Popover>
  
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

    </div>
  );
};
