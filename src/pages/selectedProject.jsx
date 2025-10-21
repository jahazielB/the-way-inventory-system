import { Sidebar } from "../components/sidebar"
import { useEffect, useState } from "react";
import { ReportTable } from "../components/reportTable"
import { ToggleButton, ToggleButtonGroup,Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateSelector from "../components/buttons/DateSelector";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import { useParams } from 'react-router-dom';

import supabase from "../supabase-client";

export const SelectedProject = ()=>{
    const [mode, setMode] = useState("stock_out");
    const [reportMode, setReportMode] = useState("detailed"); 
    const [dateMode, setDateMode] = useState("single");
    const [selectedDate, setSelectedDate] = useState(null);
    const [openDateDialog, setOpenDateDialog] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [loading, setLoading] = useState(false);
    const [dataFetched,setDataFetched] = useState()
    const [exportOpen,setExportOpen] = useState(false)
    const {project_name} = useParams();


    const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

    const fetchData = async ()=>{
        const {data,error} = await supabase.rpc('get_stock_movement_filtered',{
            p_customer_name: project_name
        })
        if (error) console.error(error)
        else {
        setDataFetched(data)
        console.log(data)
    }
  }


    const formatLocalDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
        };
    const handleApplyDates = async() => {
    console.log("Applied date filter:", { dateMode, selectedDate, dateRange });
    
    
    //  integrate date filter into your RPC
    const {data,error} = await supabase.rpc('get_stock_movement_filtered',{
        p_customer_name: project_name,
        p_start_date: formatLocalDate(dateMode === "single" ? selectedDate : dateRange.start),
        p_end_date: formatLocalDate(dateMode === "single" ? selectedDate : dateRange.end)
    })
    if (error) console.error(error)
    else setDataFetched(data)
    setOpenDateDialog(false);
  
  };

  useEffect(()=>{
    fetchData()
    console.log(project_name)
  },[])

    useEffect(() => {
    // Table name depends on the current mode
    const tableName = mode === "stock_out" ? "stock_out" : "stock_in";

    // Create a channel and subscribe to all events (*)
    const channel = supabase
      .channel(`${tableName}_realtime`)
      .on(
        "postgres_changes",
        {
          event: "*", // can be 'INSERT', 'UPDATE', 'DELETE' or '*'
          schema: "public",
          table: tableName,
        },
        (payload) => {
          console.log("Realtime event received:", payload);
          // 🔁 Re-fetch updated data whenever any record changes
          fetchData();
        }
      )
      .subscribe();

    // Cleanup when mode changes or component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [mode, project_name]); // re-subscribe when toggling between stock_in / stock_out

    return <div className="md:flex gap-1 ">
            {exportOpen||<Sidebar/>}
            <div className="flex flex-col  mx-auto gap-6 lg:gap-8 xl:gap-10 2xl:gap-13 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div>
                    <div className="flex justify-between">
                        <ToggleButtonGroup value={reportMode}  exclusive onChange={(e, newMode) => newMode && setReportMode(newMode)}>
                            <ToggleButton sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#4caf50", // green when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#43a047" }, // darker green on hover
                                },
                                color: "#000", // black when not selected
                                }} value="detailed">Detailed Report</ToggleButton>
                            <ToggleButton sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#4caf50", // green when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#43a047" }, // darker green on hover
                                },
                                color: "#000", // black when not selected
                                }} value="summary">Summary Report</ToggleButton>
                        </ToggleButtonGroup>
                        <div className="flex gap-2">
                            <Button variant="outlined" startIcon={<ClearAllIcon />} onClick={()=>{
                                fetchData()
                                setSelectedDate(null)
                                setDateRange({ start: null, end: null })
                                }}>Clear Filters</Button>
                            <Button variant="outlined" startIcon={<CalendarTodayIcon/>} onClick={()=>setOpenDateDialog(true)}>Filter by Date</Button>
                            {/* Toggle for Stock In / Stock Out */}
                            <ToggleButtonGroup
                            size="small"
                            value={mode}
                            exclusive
                            onChange={handleModeChange}
                            aria-label="stock mode"
                            >
                            <ToggleButton value="stock_in" sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#4caf50", // green when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#43a047" }, // darker green on hover
                                },
                                color: "#000", // black when not selected
                                }}>Stock In</ToggleButton>
                            <ToggleButton value="stock_out" sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "#f44336", // red when selected
                                    color: "white",
                                    "&:hover": { backgroundColor: "#e53935" }, // darker red on hover
                                },
                                color: "#000", // black when not selected
                                }}>Stock Out</ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                    </div>
                    
                    <ReportTable project_name={project_name} data={dataFetched} mode={mode} reportMode={reportMode} infoDate={[{ dateMode, selectedDate,dateRange }]} exportOpen={exportOpen} setExportOpen={setExportOpen}/>
                    <DateSelector open={openDateDialog} onClose={()=>setOpenDateDialog(false)} setDateMode={setDateMode} dateMode={dateMode} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                        dateRange={dateRange} setDateRange={setDateRange} onApply={handleApplyDates}/>
                </div>

            </div>
        </div>
}