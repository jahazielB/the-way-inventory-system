import { Sidebar } from "../components/sidebar"
import { Chart } from "../components/chart"
import { ProjectPreview } from "../components/projectPreview"
import { useEffect, useState } from "react"
export const Dashboard = ()=>{
    const [bg,setBg]=useState(false)
    useEffect(()=>{
        setBg(true)
    },[])
    return <div className="md:flex gap-1 ">
        <Sidebar bg={bg}/>
        <div className="flex flex-col gap-4 p-4 md:mx-0 lg:mx-24 xl:mx-50 2xl:mx-80 ">
            <div className="text-center text-blue-600 font-bold  ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <p className="text-white text-[15px] xl:text-[20px] font-bold">Hey Administator - <span className="font-normal text-[13px] xl:text-[16px]">here's what's happening today</span></p>
            <Chart/>
            <ProjectPreview/>
        </div>
        
    </div>
}