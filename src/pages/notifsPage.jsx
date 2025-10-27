import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import { ReplenishButton } from "../components/buttons/replenishButton";
import { ExportPreview } from "../components/exportPreview";
import useAuthStore from "../store/useAuthStore";

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("low_stock");
  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });

  const [lowStockItems, setLowStockItems] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [groupedApprovals, setGroupedApprovals] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [editedItems, setEditedItems] = useState({});

  // =========================
  // FETCH LOW STOCK ITEMS
  // =========================
  useEffect(() => {
    let debounceTimer;

    const fetchLowStockItems = async () => {
      const { data, error } = await supabase
        .from("item_summary")
        .select("item_id, item_name, unit, balance, reorder_point, location_name, customers")
        .eq("reorder_notification", true);

      if (error) console.error(error);
      else {
        setLowStockItems(data || []);
        setExportData(data || []);
      }
      setLoading(false);
    };

    const refetchDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(fetchLowStockItems, 400);
    };

    fetchLowStockItems();

    const channel = supabase
      .channel("realtime_item_updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "stock_in" }, refetchDebounced)
      .on("postgres_changes", { event: "*", schema: "public", table: "stock_out" }, refetchDebounced)
      .on("postgres_changes", { event: "*", schema: "public", table: "items" }, refetchDebounced)
      .subscribe();

    return () => {
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, []);

  // =========================
  // FETCH APPROVALS
  // =========================
 const fetchApprovals = async () => {
  const { data, error } = await supabase
    .from("approvals_view")
    .select("*"); // make sure your view includes `approval_id` from approvals table

  if (error) {
    console.error("Error fetching approvals:", error);
    return;
  }

  // Group by requested_by + action_type + date
  const grouped = Object.values(
    data.reduce((acc, item) => {
      const date = new Date(item.created_at).toISOString().split("T")[0];
      const key = `${item.requested_by_name}-${item.action_type}-${date}`;

      if (!acc[key]) {
        acc[key] = {
          id: key,
          requested_by_name: item.requested_by_name,
          action_type: item.action_type,
          date,
          status: item.status,
          items: [],
        };
      }

      // Push each item with its real approval_id
      acc[key].items.push({
        approval_id: item.approval_id, // <-- ensure your view has this column
        item_id: item.item_id,
        item_name: item.item_name,
        unit: item.unit,
        quantity: item.quantity,
        action_type: item.action_type,
        status: item.status,
        requested_by: item.requested_by,
        approved_by: item.approved_by,
        requested_by_name: item.requested_by_name,
        approved_by_name: item.approved_by_name,
        created_at: item.created_at,
      });

      return acc;
    }, {})
  );

  setApprovals(data);        // flat list if needed
  setGroupedApprovals(grouped); // grouped for DataGrid
};
  useEffect(() => {
    

    fetchApprovals();

    const channel = supabase
      .channel("approvals_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "approvals" }, fetchApprovals)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // =========================
  // HANDLERS
  // =========================
  const handleModeChange = (event, newMode) => {
    if (newMode) setMode(newMode);
  };

  const handleOpenDialog = (batch) => {
    setSelectedBatch(batch);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBatch(null);
  };

 const handleQuantityEdit = (newRow, oldRow) => {
  // 1️⃣ Update your local editedItems state
  setEditedItems((prev) => ({ ...prev, [newRow.id]: newRow.quantity }));

  // 2️⃣ Update selectedBatch items so changes are reflected in the batch
  setSelectedBatch((prevBatch) => {
    if (!prevBatch) return prevBatch;
    const updatedItems = prevBatch.items.map((item) =>
      `${item.approved_by}-${item.item_id}` === newRow.id
        ? { ...item, quantity: newRow.quantity }
        : item
    );
    return { ...prevBatch, items: updatedItems };
  });

  // 3️⃣ Return updated row for DataGrid
  return { ...newRow };
};

const handleApproveBatch = (status) => {
  if (!selectedBatch) return;

  // Set the confirmation action
  setConfirmAction(() => async () => {
    setLoading(true);

    if (!user) {
      setSnackbar({
        open: true,
        type: "error",
        message: "User not found. Please log in again.",
      });
      setLoading(false);
      return;
    }

    try {
      // Filter only pending items
      const pendingItems = selectedBatch.items.filter(i => i.status === "pending");
      if (pendingItems.length === 0) {
        setSnackbar({
          open: true,
          type: "info",
          message: "All items are already approved.",
        });
        setLoading(false);
        return;
      }

      // Fetch current stock balances for pending items
      const itemIds = pendingItems.map(i => parseInt(i.item_id));
      const { data: summaryData, error: fetchError } = await supabase
        .from("item_summary")
        .select("item_id, balance")
        .in("item_id", itemIds);

      if (fetchError) {
        console.error(fetchError);
        setSnackbar({ open: true, type: "error", message: "Failed to fetch current stock balance" });
        setLoading(false);
        return;
      }

      // Check stock_out constraints per pending item
      for (const item of pendingItems) {
        if (item.action_type === "stock_out") {
          const currentItem = summaryData.find(s => s.item_id === parseInt(item.item_id));
          const currentStock = parseFloat(currentItem?.balance) || 0;
          const requestQty = parseFloat(item.quantity) || 0;

          if (requestQty > currentStock) {
            setSnackbar({
              open: true,
              type: "error",
              message: `Cannot stock out more than current stock (${currentStock}) for "${item.item_name}".`,
            });
            setLoading(false);
            return;
          }
        }
      }

      // Update stock tables only for pending items
      for (const item of pendingItems) {
        const action = item.action_type;

        if (action === "stock_in" || action === "stock_out") {
          await supabase.rpc("manage_item", {
            p_action: action,
            p_item_id: item.item_id,
            p_quantity: item.quantity,
            p_received_by: action === "stock_in" ? `${user.role} - ${user.profile_name}` : null,
            p_used_by: action === "stock_out" ? `${user.role} - ${user.profile_name}` : null,
            p_stock_date: action === "stock_in" ? new Date().toISOString().split("T")[0] : null,
            p_stock_out_date: action === "stock_out" ? new Date().toISOString().split("T")[0] : null,
          });
        }
      }

      // Approve only pending items
      const { error } = await supabase.rpc("approve_requests", {
        p_approval_ids: pendingItems.map(i => i.approval_id),
        p_approved_by: user.id,
      });

      if (error) throw error;

      // Update quantity in approvals table for pending items
      const updates = pendingItems.map(item =>
        supabase
          .from("approvals")
          .update({ quantity: parseFloat(item.quantity) })
          .eq("id", item.approval_id)
      );
      await Promise.all(updates);

      setSnackbar({
        open: true,
        type: "success",
        message: `Pending requests approved successfully!`,
      });

      // Close dialog & refetch approvals
      setDialogOpen(false);
      setConfirmOpen(false);
      fetchApprovals();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        type: "error",
        message: "Approval failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  });

  // Open confirmation dialog
  setConfirmOpen(true);
};


  // =========================
  // DATAGRID COLUMNS
  // =========================
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
    { field: "requested_by_name", headerName: "Stockman", flex: 1 },
    { field: "action_type", headerName: "Action Type", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant="outlined" onClick={() => handleOpenDialog(params.row)}>
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  const batchItemColumns = [
    { field: "item_name", headerName: "Item", flex: 1 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "quantity", headerName: "Qty", width: 120, editable: true },
    { field: "status", headerName: "Status", width: 120 },
  ];

  // =========================
  // RENDER
  // =========================
  return (
    <div className="lg:flex">
      {!exportOpen && <Sidebar />}
      <div className="flex flex-col mx-auto md:gap-8 lg:gap-10 xl:gap-14 p-4">
        <Typography className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px]">
          INVENTORY MANAGEMENT SYSTEM
        </Typography>

        {loading ? (
          <Box className="flex justify-center items-center h-[80vh]">
            <CircularProgress />
          </Box>
        ) : (
          <div className="mx-auto">
            <div className="flex justify-between mb-2">
              <Typography className="text-xs md:text-[22px] font-bold">Notifications</Typography>
              <Box className="flex gap-2">
                <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
                  <ToggleButton value="low_stock" sx={{ "&.Mui-selected": { backgroundColor: "#4caf50", color: "white" } }}>Low Stock</ToggleButton>
                  <ToggleButton value="approval" sx={{ "&.Mui-selected": { backgroundColor: "#4caf50", color: "white" } }}>Approval Requests</ToggleButton>
                </ToggleButtonGroup>
                {mode === "low_stock" && <ReplenishButton click={"/inventory/replenishItems"} />}
              </Box>
            </div>

            <Box className="flex flex-col gap-0 h-[500px] md:h-[60vh] min-w-[200px] md:w-[600px] lg:w-[70vw]">
              <Box className="bg-gray-50 h-8 px-4 py-2 flex justify-between">
                <span>{mode === "low_stock" ? "Reorder Notification" : "Approval Requests"}</span>
                <IconButton onClick={() => setExportOpen(true)}><Download /></IconButton>
              </Box>

              {mode === "low_stock" ? (
                <DataGrid
                  rows={lowStockItems.map((item) => ({ id: item.item_id, ...item }))}
                  columns={lowStockColumns}
                  pageSize={10}
                  disableRowSelectionOnClick
                  sx={{ "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f3f4f6", fontWeight: "bold" } }}
                />
              ) : (
                <DataGrid
                  rows={groupedApprovals}
                  columns={approvalColumns}
                  getRowId={(row) => row.id}
                  pageSize={10}
                  disableRowSelectionOnClick
                  sx={{ "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f3f4f6", fontWeight: "bold" } }}
                />
              )}
            </Box>
          </div>
        )}
      </div>

      {/* Approval Batch Dialog */}
<Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
  <DialogTitle>Approval Details</DialogTitle>
  <DialogContent>
    {selectedBatch ? (
      <>
        <Typography variant="subtitle1" gutterBottom>
          Stockman: {selectedBatch.requested_by_name}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Action Type: {selectedBatch.action_type} | Date: {selectedBatch.date}
        </Typography>
        <Box sx={{ mt: 2, height: 300 }}>
          <DataGrid
            rows={selectedBatch.items.map((i) => ({
              id: `${i.approved_by}-${i.item_id}`, // unique id for DataGrid
              ...i,
            }))}
            columns={batchItemColumns}
            processRowUpdate={handleQuantityEdit}
            experimentalFeatures={{ newEditingApi: true }}
            disableRowSelectionOnClick
          />
        </Box>
      </>
    ) : (
      <Typography>No details available</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button
      variant="contained"
      color="success"
      disabled={selectedBatch?.status === "approved" || loading}
      onClick={() => handleApproveBatch("approved")}
    >
      {loading
    ? "Processing..."
    : selectedBatch?.status === "approved"
    ? "Already Approved"
    : "Approve All"}
    </Button>
    <Button onClick={handleCloseDialog}>Close</Button>
  </DialogActions>
</Dialog>


      {/* Export Preview */}
      <Dialog open={exportOpen} onClose={() => setExportOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Export Preview</DialogTitle>
        <DialogContent>
          <ExportPreview data={exportData} filename={`Project_Report_lowStock_.xlsx`} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to proceed with this action?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => confirmAction && confirmAction()} color="primary" variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>

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
