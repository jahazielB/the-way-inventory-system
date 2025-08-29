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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  return (
    <div className="overflow-auto  w-[clamp(300px,70vw,2000px)] mx-auto">
        <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
      <Table  aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell align="right">ITEM</StyledTableCell>
            <StyledTableCell align="right">UNITS</StyledTableCell>
            <StyledTableCell align="right">STATUS</StyledTableCell>
            <StyledTableCell align="right">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};


