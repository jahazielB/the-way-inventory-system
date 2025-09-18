import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/searchBar"
import { ReplenishButton } from "../components/buttons/replenishButton"
import { ReleaseButton } from "../components/buttons/releaseButton"
import { ExportExcelButton } from "../components/buttons/exportExcel"

import { InventoryTable } from "../components/inventoryTable"
import { useLocation,useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../supabase-client"
export const SelectedProjectInventory = ()=>{

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [rowsPerPage] = useState(15)
    const [total, setTotal] = useState(0)
    const {customer_name} = useParams()

    
    const fetchData = async () => {
        const from = (page - 1) * rowsPerPage
        const to = from + rowsPerPage - 1

    // ✅ fetch paginated rows
        const query = supabase
        .from("item_summary")
        .select("*", { count: "exact" }) // count = total rows in view
        .range(from, to);
        const { data, error, count } = await (customer_name?query.eq("customer_name",customer_name):query)
        

        if (error) console.error(error)
        else {
        setData(data)
        setTotal(count)
        }
  }

  useEffect(() => {
    fetchData()
    
    console.log("current project: ",customer_name)
  }, [page]) // refetch when page changes

  const handlePagination = (value)=>{
    setPage(value)
  }
    
    return <div className="lg:flex gap-1">
            <Sidebar/>
            <div className="flex flex-col  md:mx-17 lg:mx-auto xl:mx-auto 2xl:mx-auto max-md:gap-4 md:gap-8 lg:gap-14 xl:gap-25 p-4"> 
                <div className="text-center text-blue-600 font-bold">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <div>
                    <div className="flex justify-evenly lg:justify-between  mb-2">
                        <SearchBar/>
                        <div className="flex gap-0 lg:gap-2">
                            <ReplenishButton click={'/inventory/replenishItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                            <ReleaseButton click={'/inventory/releaseItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                            <ExportExcelButton textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[36px] h-[20px] "}/>
                        </div>
                    
                    </div>
                    <InventoryTable data={data} pages={handlePagination} rows={rowsPerPage} total={total}/>
                    
                    
                </div>
                
                
                
                    
                
            </div>
            
        </div>
}