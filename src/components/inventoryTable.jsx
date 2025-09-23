import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination,IconButton,MenuList, MenuItem,Popper, ClickAwayListener } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Edit, Delete, FilterList, Search, Download } from '@mui/icons-material';

import { useState } from 'react';
export const InventoryTable = ({data,rows,pages,total}) => {

  const [open, setOpen] = useState(false);
  const [rowId,setRowId] = useState()
  

  const handleClick = (id) => {
    setRowId(id)
    setOpen((prev) => !prev);
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
                <StyledTableCell align="left">{row.customer_name}</StyledTableCell>
                <StyledTableCell align="left">{row.location}</StyledTableCell>
                <StyledTableCell align="left">{row.stock_in}</StyledTableCell>
                <StyledTableCell align="left">{row.stock_out}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.stock_balance}
                </StyledTableCell>
                <StyledTableCell align='right'>
                 
                    <IconButton onClick={() => handleClick(row.item_id)} size="small" color="primary">
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <Delete fontSize="small" />
                              </IconButton>
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center my-3">
        <Pagination size="small" count={Math.ceil(total/rows)} showFirstButton showLastButton onChange={(e,value)=>pages(value)}/>
      </div>
      
    </div>
  );
};


