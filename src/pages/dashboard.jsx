import { Sidebar } from "../components/sidebar"
import { Chart } from "../components/chart"
import { ProjectPreview } from "../components/projectPreview"
import { useEffect, useState } from "react"
export const Dashboard = ()=>{
    const [bg,setBg]=useState(false)
    useEffect(()=>{
        setBg(true)
    },[])
    return <div className="flex gap-1 ">
        <Sidebar bg={bg}/>
        <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
            <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <p className="text-white text-[15px] xl:text-[20px] font-bold">Hey Administator - <span className="font-normal text-[13px] xl:text-[16px]">here's what's happening today</span></p>
            <Chart/>
            <ProjectPreview/>
        </div>
        
    </div>
}