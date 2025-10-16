import { Sidebar } from "../components/sidebar"
import { useEffect, useState } from "react";
import { ReportTable } from "../components/reportTable"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useParams } from 'react-router-dom';

import supabase from "../supabase-client";

export const SelectedProject = ()=>{
    const [mode, setMode] = useState("stock_out");
    const [dataFetched,setDataFetched] = useState()
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
  useEffect(()=>{
    fetchData()
    console.log(project_name)
  },[])

    return <div className="md:flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col  mx-auto gap-6 lg:gap-8 xl:gap-10 2xl:gap-13 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div>
                    <div className="flex justify-between">
                        <span className="text-[18px] md:text-[20px]  xl:text-[30px] font-extrabold">Project Report</span>
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
                    
                    <ReportTable project_name={project_name} data={dataFetched} mode={mode}/>
                </div>

            </div>
        </div>
}