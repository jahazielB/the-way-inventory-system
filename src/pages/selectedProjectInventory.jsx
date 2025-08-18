import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/searchBar"
import { ReplenishButton } from "../components/replenishButton"
import { ReleaseButton } from "../components/releaseButton"
import { ExportExcelButton } from "../components/exportExcel"
import { Pagination } from "../components/pagination"
import { InventoryTable } from "../components/inventoryTable"
export const SelectedProjectInventory = ()=>{
    return <div className="flex gap-1">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4"> 
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-9">
                    <h1>INVENTORY MANAGEMENT SYSTEM</h1>
                </div>
                <div className="flex justify-between">
                    <SearchBar/>
                    <div className="flex gap-7">
                        <ReplenishButton/>
                        <ReleaseButton/>
                        <ExportExcelButton/>
                    </div>
                    
                </div>
                <InventoryTable/>
                <div className=" px-50">
                    <Pagination/>
                </div>
            </div>
            
        </div>
}