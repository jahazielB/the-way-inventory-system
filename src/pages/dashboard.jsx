import { Sidebar } from "../components/sidebar"
import { Chart } from "../components/chart"
import { ProjectPreview } from "../components/projectPreview"
import { useEffect, useState } from "react"
import supabase from "../supabase-client"
import useAuthStore from "../store/useAuthStore"
export const Dashboard = ()=>{
    const [data,setData]=useState([])
    const [admin,setAdmin] = useState(null)
    const setUser = useAuthStore((state)=>state.setUser)
    const fetchUser = async ()=>{
        const {data:{user}} = await supabase.auth.getUser()
        if (!user) return;
        // console.log("current user: " ,user)

        const {data ,error} = await supabase
            .from("users")
            .select("profile_name,role")
            .eq("id",user.id)
            .single();
        if (error) console.error
        else {
            setAdmin(data)
            setUser(data)
            console.log(data)
        }
    }
    const fetch = async ()=>{
        const {data,error} = await supabase.from('customer_item_counts').select('*')
        if (error)console.error(error)
        else setData(data) 
        // console.log(data) 


    }
    useEffect(()=>{

        fetchUser()
        fetch()    
    },[])
    
    return <div className="lg:flex gap-1 ">
        <Sidebar/>
        <div className="flex flex-col gap-8 xl:gap-15 p-4 max-md:mx-0 max-lg:mx-20 lg:mx-auto  ">
            <div className="text-center text-blue-600 font-bold  ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <div>
                <p className="text-white text-[15px] xl:text-[20px] font-bold">Hey <span className="text-blue-600 font-jakarta">Administrator - {admin?.profile_name||""}</span>  <span className="font-normal text-[13px] xl:text-[16px]">here's what's happening today</span></p>
                <div className="flex flex-col max-lg:gap-2 lg:gap-4">
                    <Chart datas={data}/>
                    <ProjectPreview/>
                </div>
            </div>
            
        </div>
        
    </div>
}