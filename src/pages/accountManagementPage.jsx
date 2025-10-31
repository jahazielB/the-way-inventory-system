import { Sidebar } from "../components/sidebar"
import { CreateButton } from "../components/buttons/createButton";
import { AccountManagementTable } from "../components/accountManagementTable";

import { useState,useEffect, use } from "react";
import supabase from "../supabase-client"

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const AccountManagementPage = ()=>{
    const [data,setData] = useState()
    const fetch = async ()=>{
            const {data,error} = await supabase
            .from("users")
            .select("*")

        if (error) console.error("Error fetching users:", error);
        else {
            
            setData(data)
        };

    }
    useEffect(()=>{

    fetch()
    },[])
   
    return <div className="lg:flex gap-1 ">
        <Sidebar/>
        <div className="flex flex-col mx-auto lg:gap-8 xl:gap-10 2xl:gap-13 p-4">
            <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <div className="flex mx-auto flex-col lg:gap-4">
                <div className="flex  justify-between">
                    <span>Employees</span>
                    <CreateButton customStyle={"max-lg:h-[30px] max-lg:px-2"}/>
                </div>
                <AccountManagementTable data={data} refetch={fetch}/>
            </div>
           
           
            
            
        </div>
        
    </div>
}