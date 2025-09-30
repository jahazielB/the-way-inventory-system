import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination,IconButton,MenuItem,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button,CircularProgress } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';

import { useState } from 'react';
import supabase from "../supabase-client"

export const InventoryTable = ({data,rows,pages,total}) => {

  const [open, setOpen] = useState(false);
  const [rowId,setRowId] = useState()
  const [selectedItem,setSelectedItem] = useState(null)
  const [loadingId,setLoadingId] = useState(null)
  const [wholeData,setWholeData] = useState(null)
  

  const handleClick = async (itemId) => {
    setLoadingId(itemId)
    setRowId(itemId)
    
    const {data,error} = await supabase.rpc("manage_item",{
      p_action: "read",
      p_item_id: itemId
    })
    if (error) {
    console.error(error);
  } else {
    setSelectedItem(data.item)
    setWholeData(data)
    console.log(data)
    setLoadingId(null)
    setOpen(true)
  }

  };

  const handleClose = () => {
    setOpen(false);
  };

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
                    <IconButton size="small" color="error">
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
  <DialogContent className="space-y-4">
    <TextField
      fullWidth
      label="Item Name"
      name="item_name"
      value={selectedItem?.item_name || ""}
      onChange={(e) =>
        setSelectedItem({ ...selectedItem, item_name: e.target.value })
      }
    />
    <TextField
      fullWidth
      label="Unit"
      name="unit"
      value={selectedItem?.unit || ""}
      onChange={(e) =>
        setSelectedItem({ ...selectedItem, unit: e.target.value })
      }
    />
    <TextField
      fullWidth
      type="number"
      label="Opening Stock"
      name="opening_stock"
      value={selectedItem?.opening_stock || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          opening_stock: parseInt(e.target.value) || 0,
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
    <TextField
      fullWidth
      type="number"
      label="Reorder Quantity"
      name="reorder_quantity"
      value={selectedItem?.reorder_quantity || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          reorder_quantity: parseInt(e.target.value) || 0,
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
    <TextField
      select
      fullWidth
      label="Customer"
      name="customer_id"
      value={selectedItem?.customer_id || ""}
      onChange={(e) =>
        setSelectedItem({
          ...selectedItem,
          customer_id: parseInt(e.target.value),
        })
      }
    >
      {wholeData?.customers?.map((cust) => (
        <MenuItem key={cust.id} value={cust.id}>
          {cust.name}
        </MenuItem>
      ))}
    </TextField>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="contained" color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
      
    </div>
  );
};


