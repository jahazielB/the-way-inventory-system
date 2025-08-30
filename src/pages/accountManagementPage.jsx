import { Sidebar } from "../components/sidebar"
import { CreateButton } from "../components/buttons/createButton";
import { AccountManagementTable } from "../components/accountManagementTable";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const AccountManagementPage = ()=>{
   
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
                <AccountManagementTable/>
            </div>
           
           
            
            
        </div>
        
    </div>
}