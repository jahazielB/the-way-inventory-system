import { Sidebar } from "../components/sidebar"
import { CreateButton } from "../components/buttons/createButton";
import { AccountManagementTable } from "../components/accountManagementTable";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const AccountManagementPage = ()=>{
   
    return <div className="md:flex gap-1 ">
        <Sidebar/>
        <div className="flex flex-col md:mx-17 xl:mx-50 2xl:mx-90 max-md:gap-4 gap-4 p-4">
            <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
           <div className="flex justify-between">
                <span>Employees</span>
                <CreateButton/>
           </div>
           
            <AccountManagementTable/>
            
        </div>
        
    </div>
}