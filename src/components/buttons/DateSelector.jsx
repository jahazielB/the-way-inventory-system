import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import { Calendar, DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CloseIcon from "@mui/icons-material/Close";

export default function DateSelector({
  open,
  onClose,
  dateMode,
  setDateMode,
  selectedDate,
  setSelectedDate,
  dateRange,
  setDateRange,
  onApply,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="flex justify-between items-center pr-2">
        <DialogTitle className="font-bold text-blue-600">Select Date</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ✅ Centers the calendar horizontally
          gap: 0, // ✅ smaller gap between elements
          pt: 1, // tighter padding top
        }}>
        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 mb-0">
          <Button
            variant={dateMode === "single" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setDateMode("single")}
          >
            Single Date
          </Button>
          <Button
            variant={dateMode === "range" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setDateMode("range")}
          >
            Range
          </Button>
        </div>

        {/* Calendar / Range Picker */}
        {dateMode === "single" ? (
          <Calendar
            date={selectedDate || new Date()}
            onChange={(date) => setSelectedDate(date)}
            color="#2563eb"
          />
        ) : (
          <DateRange
            ranges={[
              {
                startDate: dateRange?.start || new Date(),
                endDate: dateRange?.end || new Date(),
                key: "selection",
              },
            ]}
            onChange={(item) =>
              setDateRange({
                start: item.selection.startDate,
                end: item.selection.endDate,
              })
            }
            moveRangeOnFirstSelection={false}
            rangeColors={["#2563eb"]}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
