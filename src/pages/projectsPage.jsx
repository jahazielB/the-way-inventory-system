import { Sidebar } from "../components/sidebar"
import { Projects } from "../components/projects"
import { useEffect, useState } from "react"
import supabase from "../supabase-client"
export const ProjectsPage = ()=>{
    const [data,setData] = useState([])
    const fetch = async()=>{
        const {data,error} = await supabase.from('customers').select('*')
        if (error) console.error(error)
        else setData(data) 
        console.log(data)
    }
    useEffect(()=>{
        fetch()
        
    },[])
    return <div className="lg:flex">
        <Sidebar/>
        <div className="flex flex-col gap-10 my-0 mx-[clamp(5px,20vw,15rem)]  md:mx-[clamp(10px,40vw,15rem)]  lg:mx-auto xl:mx-auto 2xl:mx-auto">
            <div className="text-center text-blue-600 font-bold my-5 ">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <Projects link={'/selected'} proj={data}/>  
        </div>
           
    </div>

}