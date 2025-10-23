import { useNavigate } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,DialogTitle,Dialog,DialogContent,DialogActions,Button
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import { ReplenishButton } from "../components/buttons/replenishButton";
import { ExportPreview } from "../components/exportPreview";
export const NotificationsPage = ()=>{
    const navigate = useNavigate()
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState("low_stock");
    const [exportOpen, setExportOpen] = useState(false);
    const [exportData, setExportData] = useState([]);


useEffect(() => {
  let debounceTimer;

  const fetchLowStockItems = async () => {
    const { data, error } = await supabase
      .from("item_summary")
      .select("item_id, item_name, unit, balance, reorder_point, location_name,customers")
      .eq("reorder_notification", true);

    if (error) console.error("error: ", error)
    else{
        setLowStockItems(data || [])
        setExportData(data||[])
    } 
    setLoading(false);
  };

  const refetchWithDebounce = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchLowStockItems, 400);
  };

  // 🔹 Initial fetch
  fetchLowStockItems();

  // 🔹 Setup realtime listeners
  const channel = supabase
    .channel("realtime_item_updates")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "stock_in" },
      refetchWithDebounce
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "stock_out" },
      refetchWithDebounce
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "items" },
      refetchWithDebounce
    )
    .subscribe();

  // 🔹 Cleanup
  return () => {
    clearTimeout(debounceTimer);
    supabase.removeChannel(channel);
  };
}, []);

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) setMode(newMode);
    };
      // Temporary static approval requests
    const approvalRequests = [
        { id: 1, stockman_name: "Juan Dela Cruz", action: "Stock Out", status: "Pending" },
        { id: 2, stockman_name: "Mark Santos", action: "Stock In", status: "Pending" },
    ];
      const lowStockColumns = [
    { field: "item_id", headerName: "ID", width: 90 },
    { field: "item_name", headerName: "Item Name", flex: 1 },
    { field: "unit", headerName: "Unit", width: 120 },
    { field: "balance", headerName: "Balance", width: 120 },
    { field: "reorder_point", headerName: "Reorder Point", width: 150 },
    { field: "location_name", headerName: "Location", flex: 1 },
    { field: "customers", headerName: "Customer", flex: 1 },
  ];

  const approvalColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "stockman_name", headerName: "Stockman", flex: 1 },
    { field: "action", headerName: "Action", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];


   return (
        <div className="lg:flex  ">
            {exportOpen||<Sidebar/>}
            <div className="flex flex-col mx-auto md:gap-8 lg:gap-10 xl:gap-14 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px]">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
            {loading?(<Box className="flex justify-center items-center h-[80vh]">
                    <CircularProgress />
                </Box>
                ):(<div className="mx-auto">
                    <div className="flex justify-between">
                        <span className="text-xs md:text-[22px] font-bold">Notifications</span>
                        <div className="flex gap-2">
                            {/* Toggle Group */}
                            <ToggleButtonGroup
                                value={mode}
                                exclusive
                                onChange={handleModeChange}
                                aria-label="notification type"
                                sx={{ mb: 1 }}
                            >
                                <ToggleButton value="low_stock" sx={{
                                        "&.Mui-selected": {
                                            backgroundColor: "#4caf50", // green when selected
                                            color: "white",
                                            "&:hover": { backgroundColor: "#43a047" }, // darker green on hover
                                        },
                                        color: "#000", // black when not selected
                                        }}>Low Stock</ToggleButton>
                                <ToggleButton value="approval" sx={{
                                        "&.Mui-selected": {
                                            backgroundColor: "#4caf50", // green when selected
                                            color: "white",
                                            "&:hover": { backgroundColor: "#43a047" }, // darker green on hover
                                        },
                                        color: "#000", // black when not selected
                                        }}>Approval Requests</ToggleButton>
                            </ToggleButtonGroup>
                            {mode==="low_stock"&&<ReplenishButton click={'/inventory/replenishItems'}/>}
                        </div>

                    </div>
                    <div className="flex flex-col mx-auto gap-0 h-[500px] md:h-[clamp(450px,60vh,2000px)]  min-w-[200px] md:w-[600px] lg:w-[clamp(700px,70vw,2000px)]"> 
                        <div className="bg-gray-50 h-8 px-4 py-2 flex justify-between">
                            <span>{mode==="low_stock"&&"Reorder Notification"}</span>
                            <IconButton onClick={()=>setExportOpen(true)}>
                                <Download/>
                            </IconButton>
                        </div>
                        {mode === "low_stock" ? (
                            
                            <DataGrid
                                rows={lowStockItems.map((item) => ({ id: item.item_id, ...item }))}
                                columns={lowStockColumns}
                                pageSize={10}
                                disableRowSelectionOnClick
                                sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#f3f4f6",
                                    fontWeight: "bold",
                                },
                                }}
                            />
                            ) : (
                            <DataGrid
                                rows={approvalRequests}
                                columns={approvalColumns}
                                pageSize={10}
                                disableRowSelectionOnClick
                                sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#f3f4f6",
                                    fontWeight: "bold",
                                },
                                }}
                            />
                            )}
                    </div>
                </div>)}
                
               
            </div>  
             {/* Export Preview Dialog */}
                    <Dialog
                      open={exportOpen}
                      onClose={() => setExportOpen(false)}
                      maxWidth="lg"
                      fullWidth
                    >
                      <DialogTitle>Export Preview</DialogTitle>
                      <DialogContent>
                        <ExportPreview data={exportData} filename={`Project_Report_lowStock_.xlsx`} />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setExportOpen(false)}>Close</Button>
                      </DialogActions>
                    </Dialog>     
        </div>
    )
}