import { Sidebar } from "../components/sidebar"

import { ReportTable } from "../components/reportTable"


export const SelectedProject = ()=>{
    
    return <div className="md:flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col  mx-auto   gap-4 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <span className="text-[18px] md:text-[20px]  xl:text-[30px] font-extrabold">Project Report</span>
                <ReportTable/>
            </div>
        </div>
}