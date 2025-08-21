import { Sidebar } from "../components/sidebar";
import { Button } from "@mui/material";
import { ReportTable } from "../components/reportTable";

export const ApprovalPage = ()=>{
    return (
        <div className="flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div className="flex justify-between">
                    <span className=" text-[22px] font-medium">Stockman MF</span>
                    <Button className="w-[80px]" variant="contained">Approve</Button>
                </div>
                <ReportTable/>
                
                
            </div>       
        </div>
    )
}