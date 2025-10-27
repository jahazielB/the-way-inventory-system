import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination,IconButton,MenuItem,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button,CircularProgress,Select,
  FormControl,InputLabel,Checkbox,ListItemText,Snackbar,Alert} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';
import { ConfirmDeleteCancel } from './modals/confirmDeleteCancel';

import { useState } from 'react';
import supabase from "../supabase-client"

export const InventoryTable = ({data,rows,pages,total,refetch}) => {

  const [open, setOpen] = useState(false);
  const [modalOpen,setModalOpen] = useState(false)
  const [rowId,setRowId] = useState()
  const [selectedItem,setSelectedItem] = useState(null)
  const [loadingId,setLoadingId] = useState(null)
  const [wholeData,setWholeData] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
  
  const fetch = async (itemId)=>{
    const {data,error} = await supabase.rpc("manage_item",{
      p_action: "read",
      p_item_id: itemId
    })
    if (error) {
    console.error(error);
  } else {
    const item = data.item
    item.customer_ids = item.customers.map(c=>c.id)
    setSelectedItem(item)
    setWholeData(data)
    console.log(item)
    console.log(data)
    setLoadingId(null)
    
  }
  }

  const handleClick =  (itemId) => {
    setLoadingId(itemId)
    setRowId(itemId)
    fetch(itemId)
    setOpen(true)
  };
  const handleSave = async ()=>{
    if (!selectedItem.item_name?.trim() || !selectedItem.unit?.trim()){
        setSnackbar({ open: true, type: "error", message: "Item and Unit Required!" });
        return;
    }
    try {
      const { data, error } = await supabase.rpc("manage_item", {
        p_action: "update",
        p_item_id: selectedItem.item_id,
        p_item_name: selectedItem.item_name,
        p_unit: selectedItem.unit,
        p_opening_stock: selectedItem.opening_stock
          ? parseFloat(selectedItem.opening_stock)
          : 0,
        p_reorder_point: selectedItem.reorder_point
          ? parseInt(selectedItem.reorder_point)
          : 0,
        p_reorder_quantity: selectedItem.reorder_quantity
          ? parseInt(selectedItem.reorder_quantity)
          : 0,
        p_location_id: selectedItem.location_id
          ? parseInt(selectedItem.location_id)
          : null,
        p_customer_ids: selectedItem.customer_ids || [],
      });

      if (error) {
        console.error("Update error:", error);
        alert("Failed to update item!");
      } else {
        console.log("Updated item:", data);
        setSnackbar({ open: true, type: "success", message: "Item Update Success!" });
        setOpen(false);
        refetch()
      }
  } catch (err) {
    console.error("Unexpected error:", err);
    setSnackbar({ open: true, type: "error", message: "Failed to save item." });
  }
    console.log(selectedItem)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (itemId)=>{
    try {
    const { error } = await supabase.rpc("manage_item", {
      p_action: "delete",
      p_item_id: itemId,
    });

    if (error) throw error;

    // ✅ Just update UI state
    setSnackbar({ open: true, type: "success", message: "Item Deleted!" });
    setModalOpen(false)
    refetch()
  } catch (err) {
    console.error("Delete error:", err.message);
    setSnackbar({ open: true, type: "error", message: "Error Deleting Item" });
  }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0000FF',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    display: "table-row", // ✅ ensures background covers entire row
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

  return (
    <div className="overflow-auto w-[clamp(400px,90vw,1500px)] mx-auto">
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table
          aria-label="customized table"
          sx={{ minWidth: 1200, tableLayout: "auto" }} // ✅ ensures wide + responsive
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Unit</StyledTableCell>
              <StyledTableCell>Opening Stock</StyledTableCell>
              <StyledTableCell>ReOrder Point</StyledTableCell>
              <StyledTableCell>ReOrder Qty</StyledTableCell>
              <StyledTableCell>ReOrder Notification</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Stock In</StyledTableCell>
              <StyledTableCell>Stock Out</StyledTableCell>
              <StyledTableCell>Stock Balance</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {row.item_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.unit}</StyledTableCell>
                <StyledTableCell align="left">{row.opening_stock}</StyledTableCell>
                <StyledTableCell align="left">{row.reorder_point}</StyledTableCell>
                <StyledTableCell align="right">{row.reorderQty}</StyledTableCell>
                <StyledTableCell align="left">{!row.reorder_notification?'in stock':'REORDER'}</StyledTableCell>
                <StyledTableCell align="left">{row.customers}</StyledTableCell>
                <StyledTableCell align="left">{row.location_name}</StyledTableCell>
                <StyledTableCell align="left">{row.stock_in_total}</StyledTableCell>
                <StyledTableCell align="left">{row.stock_out_total}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.balance}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {
                    loadingId==row.item_id?<CircularProgress/>:( <div>
                    <IconButton onClick={() => handleClick(row.item_id)} size="small" color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={()=>{
                      fetch(row.item_id)
                      setModalOpen(true)
                      console.log(row.item_id)}} size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </div>)
                  }
                 
                  
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center my-3">
        <Pagination size="small" count={Math.ceil(total/rows)} showFirstButton showLastButton onChange={(e,value)=>pages(value)}/>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Edit Item</DialogTitle>
  <DialogContent className="flex flex-col gap-3">
    <TextField
      fullWidth
      label="Item Name"
      name="item_name"
      value={selectedItem?.item_name || ""}
      onChange={(e) =>
        setSelectedItem({ ...selectedItem, item_name: e.target.value })
      }
    />
    <FormControl fullWidth>
      <InputLabel id="unit-label">Unit</InputLabel>
      <Select
        labelId='unit-label'
        name='unit'
        value={selectedItem?.unit|| ""}
        onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          unit: e.target.value,
        })
    }
      >
      {wholeData?.units?.map((u, i) => (
      <MenuItem key={i} value={u}>
        {u}
      </MenuItem>
    ))}
      </Select>
    </FormControl>
    <TextField
      fullWidth
      type="number"
      label="Opening Stock"
      name="opening_stock"
      value={selectedItem?.opening_stock || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          opening_stock: parseFloat(e.target.value) || 0,
        })
      }
    />
    <TextField
      fullWidth
      type="number"
      label="Reorder Point"
      name="reorder_point"
      value={selectedItem?.reorder_point || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          reorder_point: parseInt(e.target.value) || 0,
        })
      }
    />


    {/* Location Dropdown */}
    <TextField
      select
      fullWidth
      label="Location"
      name="location_id"
      value={selectedItem?.location_id || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          location_id: parseInt(e.target.value),
        })
      }
    >
      {wholeData?.locations?.map((loc) => (
        <MenuItem key={loc.id} value={loc.id}>
          {loc.name}
        </MenuItem>
      ))}
    </TextField>

    {/* Customer Dropdown */}
    <FormControl fullWidth>
      <InputLabel id="customer-label">Customer</InputLabel>
      <Select
        labelId="customer-label"
        multiple
        name="customer_ids"
        value={selectedItem?.customer_ids || []}
        onChange={(e) =>{
          const selectedIds = e.target.value.map((id) => parseInt(id, 10));
          setSelectedItem({
            ...selectedItem,
           [e.target.name]: selectedIds, // now an array of selected ids
          })
        }}
        renderValue={(selected) =>
          wholeData?.customers
            ?.filter((c) => selected.includes(c.id))
            .map((c) => c.name)
            .join(", ")
        }
      >
        {wholeData?.customers?.map((cust) => (
          <MenuItem key={cust.id} value={cust.id}>
            <Checkbox checked={selectedItem?.customer_ids.includes(cust.id)||false} />
            <ListItemText primary={cust.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSave} variant="contained" color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
{/* Snackbar for Success / Error */}
        <Snackbar
            open={snackbar.open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            slotProps={{
              root: {
                sx: {
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                },
              },
            }}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}>
              <Alert severity={snackbar.type} sx={{ width: "100%" }}>
                {snackbar.message}
                </Alert>
        </Snackbar>
        <ConfirmDeleteCancel id={selectedItem?.item_id||null} open={modalOpen} handleDelete={handleDelete} handleCancel={()=>setModalOpen(false)}/>
      
    </div>
  );
};


