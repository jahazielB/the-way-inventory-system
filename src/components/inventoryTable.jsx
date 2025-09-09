import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export const InventoryTable = () => {
  const data = [
    { item: "Yellow", units: 10, status: "In Stock" },
    { item: "Black", units: 12, status: "In Stock" },
    { item: "Green", units: 9, status: "Low In Stock" },
    { item: "Talong", units: 5, status: "Low in Stock" },
    { item: "Candy Red", units: 0, status: "Out of Stock" },
    { item: "Item 6", units: "Text", status: "Text" },
    { item: "Item 7", units: "Text", status: "Text" },
    { item: "Item 8", units: "Text", status: "Text" },
    { item: "Item 9", units: "Text", status: "Text" },
    { item: "Item 10", units: "Text", status: "Text" },
    { item: "Item 11", units: "Text", status: "Text" },
    { item: "Item 12", units: "Text", status: "Text" },
    { item: "Item 13", units: "Text", status: "Text" },
    { item: "Item 14", units: "Text", status: "Text" },
    { item: "Item 15", units: "Text", status: "Text" },
  ];
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
    <div className="overflow-auto w-[clamp(400px,90vw,2400px)] mx-auto">
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
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {row.item}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                <StyledTableCell align="right">{row.openingStock}</StyledTableCell>
                <StyledTableCell align="right">{row.reorderPoint}</StyledTableCell>
                <StyledTableCell align="right">{row.reorderQty}</StyledTableCell>
                <StyledTableCell align="right">{row.notification}</StyledTableCell>
                <StyledTableCell align="right">{row.customer}</StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">{row.stockIn}</StyledTableCell>
                <StyledTableCell align="right">{row.stockOut}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.stockBalance}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


