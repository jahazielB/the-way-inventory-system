
import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const BasicDatePicker= ()=> {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} sx={{
        "& .MuiInputBase-root": {
          height: 0,          // total height
        },
        "& input": {
          padding: "0px 0px",  // vertical + horizontal padding
        }
      }} />}
      />
    </LocalizationProvider>
  );
}
