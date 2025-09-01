import { Sidebar } from "../components/sidebar"
import { Chart } from "../components/chart"
import { ProjectPreview } from "../components/projectPreview"
import { useEffect, useState } from "react"
export const Dashboard = ()=>{
    
    return <div className="lg:flex gap-1 ">
        <Sidebar/>
        <div className="flex flex-col gap-8 xl:gap-15 p-4 max-md:mx-0 max-lg:mx-20 lg:mx-auto  ">
            <div className="text-center text-blue-600 font-bold  ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <div>
                <p className="text-white text-[15px] xl:text-[20px] font-bold">Hey <span className="text-blue-600 font-jakarta">Administrator</span> - <span className="font-normal text-[13px] xl:text-[16px]">here's what's happening today</span></p>
                <div className="flex flex-col max-lg:gap-2 lg:gap-4">
                    <Chart/>
                    <ProjectPreview/>
                </div>
            </div>
            
        </div>
        
    </div>
}