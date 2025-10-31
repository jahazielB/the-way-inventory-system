import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/searchBar"
import { ReplenishButton } from "../components/buttons/replenishButton"
import { ReleaseButton } from "../components/buttons/releaseButton"
import { ExportExcelButton } from "../components/buttons/exportExcel"
import { Button,Dialog, DialogTitle, DialogContent, IconButton,Box,CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ExportPreview } from "../components/exportPreview"
import { InventoryTable } from "../components/inventoryTable"
import { useLocation,useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../supabase-client"

export const SelectedProjectInventory = ()=>{

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [rowsPerPage] = useState(15)
    const [total, setTotal] = useState(0)
    const [searchQuery, setSearchQuery] = useState("");
    const {customer_name} = useParams()
    const [exportData, setExportData] = useState(null);
    const [previewOpen,setPreviewOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    
    const from = (page - 1) * rowsPerPage
    const to = from + rowsPerPage - 1

    const handleExportClick = async ()=>{
        setPreviewOpen(true)
        try{
            const query =  supabase
                    .from("item_summary")
                    .select("*");
            const {data,error} = await (customer_name?query.ilike("customers",`%${customer_name}%`):query)
            if (error) throw error;
            setExportData(data);
            
            
        }catch (err) {
            console.error("Export failed", err);
            alert("Failed to fetch data for export");
    }
    }

    const fetchSearchItems = async ()=>{
        const { data: items, count, error } = await supabase
            .from("item_summary")
            .select("*", { count: "exact" })
            .ilike("item_name", `%${searchQuery}%`) // filter by searchQuery
            .range(from, to);

        if (error) console.error("Fetch error:", error);
        else {
        setData(items);
        setTotal(count);
        
    }setLoading(false)
    }
    const handleSearch = (e) => {
        if (e.key === "Enter") {
        // e.preventDefault();
        setPage(1); // reset to first page on new search
        fetchSearchItems();
        }
    };

    const fetchData = async () => {
    // ✅ fetch paginated rows
        const query = supabase
        .from("item_summary")
        .select("*", { count: "exact" }) // count = total rows in view
        .range(from, to);
        const { data, error, count } = await (customer_name?query.ilike("customers",`%${customer_name}%`):query)
        

        if (error) console.error(error)
        else {
        setData(data)
        setTotal(count)
        console.log(data)
        }
    setLoading(false)
  }

  useEffect(() => {
    if (searchQuery){
        fetchSearchItems()
    }else fetchData()
    
    
    
  }, [page]) // refetch when page changes

  const handlePagination = (value)=>{
    setPage(value)
  }
    
    return <div className="lg:flex gap-1">
            {previewOpen||<Sidebar/>}
            <div className="flex flex-col  md:mx-17 lg:mx-auto xl:mx-auto 2xl:mx-auto max-md:gap-4 md:gap-8 lg:gap-14 xl:gap-25 p-4"> 
                <div className="text-center text-blue-600 font-bold">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                {loading?(<Box className="flex justify-center items-center h-[80vh]">
                    <CircularProgress />
                </Box>
                ):(<div>
                    <div className="flex justify-evenly lg:justify-between  mb-2">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onKeyDown={handleSearch}/>
                        <div className="flex gap-0 lg:gap-2">
                            <ReplenishButton click={'/inventory/replenishItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                            <ReleaseButton click={'/inventory/releaseItems'} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[35px]"}/>
                            <ExportExcelButton disable={previewOpen} onClick={handleExportClick} textHiddenMobile={"max-sm:hidden"} perPageStyle={"max-sm:w-[clamp(10px,50vw,45px)] max-sm:h-[36px] h-[20px] "}/>
                            <Button variant="contained" sx={{
                                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: ".8rem" }, // adjusts per screen size
                                    px: { xs: 1, sm: 1, md: 1 }, // responsive horizontal padding
                                    py: { xs: 0.5, sm: .8 }, // responsive vertical padding
                                }} onClick={()=>navigate('/inventory/addItem')}>Add New Item</Button>

                        </div>
                    
                    </div>
                    <InventoryTable refetch={fetchData} data={data} pages={handlePagination} rows={rowsPerPage} total={total}/>
                    <Dialog open={previewOpen} onClose={()=>setPreviewOpen(false)} maxWidth="xl" fullWidth>
                        <DialogTitle className="flex justify-between items-center">
                        Export Preview
                        <IconButton onClick={()=>setPreviewOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        </DialogTitle>
                        <DialogContent>
                        {exportData && <ExportPreview data={exportData} filename={customer_name?`${customer_name}_items_used.xlsx`:"GeneralItems.xlsx"} />}
                        </DialogContent>
                    </Dialog>
                </div>)}
                
                
                
                    
                
            </div>
            
        </div>
}