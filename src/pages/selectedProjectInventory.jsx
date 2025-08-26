import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/searchBar"
import { ReplenishButton } from "../components/buttons/replenishButton"
import { ReleaseButton } from "../components/buttons/releaseButton"
import { ExportExcelButton } from "../components/buttons/exportExcel"
import { Pagination } from "@mui/material"
import { InventoryTable } from "../components/inventoryTable"
import { useNavigate } from "react-router-dom"
export const SelectedProjectInventory = ()=>{
    
    return <div className="flex gap-1">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4"> 
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-9">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div className="flex justify-between">
                    <SearchBar/>
                    <div className="flex gap-7">
                        <ReplenishButton click={'/inventory/replenishItems'}/>
                        <ReleaseButton click={'/inventory/releaseItems'}/>
                        <ExportExcelButton/>
                    </div>
                    
                </div>
                <InventoryTable/>
                <div className=" px-50">
                    <Pagination size="small" count={3} showFirstButton showLastButton />
                </div>
            </div>
            
        </div>
}