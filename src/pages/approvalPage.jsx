import { Sidebar } from "../components/sidebar";
import { Button } from "@mui/material";
import { ReportTable } from "../components/reportTable";

export const ApprovalPage = ()=>{
    return (
        <div className="lg:flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col mx-auto  lg:gap-8 xl:gap-10 2xl:gap-13 gap-6 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div className="mx-auto flex flex-col gap-3">
                    <div className="flex justify-between">
                        <span className=" text-[22px] font-medium">Stockman-Name</span>
                        <Button className="w-[80px]" variant="contained">Approve</Button>
                    </div>
                    <ReportTable/>
                </div>
                
                
                
                
            </div>       
        </div>
    )
}