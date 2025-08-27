import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/searchBar"
import { ReplenishButton } from "../components/buttons/replenishButton"
import { ReleaseButton } from "../components/buttons/releaseButton"
import { ExportExcelButton } from "../components/buttons/exportExcel"
import { Pagination } from "@mui/material"
import { InventoryTable } from "../components/inventoryTable"
import { useNavigate } from "react-router-dom"
export const SelectedProjectInventory = ()=>{
    
    return <div className="lg:flex gap-1">
            <Sidebar/>
            <div className="flex flex-col  md:mx-17 xl:mx-50 2xl:mx-90 max-md:gap-4 gap-4 p-4"> 
                <div className="text-center text-blue-600 font-bold">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div className="flex justify-around px-7">
                    <SearchBar/>
                    <div className="flex">
                        <ReplenishButton click={'/inventory/replenishItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                        <ReleaseButton click={'/inventory/releaseItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                        <ExportExcelButton textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[36px] px-4 mt-0"}/>
                    </div>
                    
                </div>
                <InventoryTable/>
                <div className="px-18 md:px-60">
                    <Pagination size="small" count={3} showFirstButton showLastButton />
                </div>
            </div>
            
        </div>
}