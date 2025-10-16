import { Sidebar } from "../components/sidebar"
import { Button, Popover, TextField, Drawer, List, ListItem, ListItemText, Box, Typography,Snackbar,Alert,CircularProgress} from "@mui/material";
import { SearchBar } from "../components/searchBar"

import supabase from "../supabase-client"

import { useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";


import { useState } from "react";
export const ReplenishReleasePage = ({mode})=>{
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        name:"",
        item_id:"",
        quantity:""
    })
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" })
    const [loading,setLoading] = useState(false)
    const user = useAuthStore((state)=>state.user)
    const rowsPerPage = 15

    const from = (page - 1) * rowsPerPage
    const to = from + rowsPerPage - 1

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
    const handleClose = () => {
    setAnchorEl(null);
  };
    const open = Boolean(anchorEl);
    const fetchSearchItems = async ()=>{
        const { data: items, count, error } = await supabase
            .from("item_summary")
            .select("*", { count: "exact" })
            .ilike("item_name", `%${searchQuery}%`) // filter by searchQuery
            

        if (error) console.error("Fetch error:", error);
        else {
        // console.log(items)
        setData(items);
        setTotal(count);
        
         
    }
    }
    const handleSearch = (e) => {
        if (e.key === "Enter") {
        setPage(1); // reset to first page on new search
        fetchSearchItems();
        setDrawerOpen(true)
        e.preventDefault();
        }
    };

    const handleSubmit =async (e)=>{
        setLoading(true)
        e.preventDefault()
        const {data,error} = await supabase.rpc("manage_item",{
            p_action: mode==="Replenish"?"stock_in":"stock_out",
            p_item_id:selectedItem.item_id,
            p_quantity:selectedItem.quantity?parseInt(selectedItem.quantity):0,
            ...(mode === "Replenish"
        ? { p_received_by: `${user.role} - ${user.profile_name}` }
        : { p_used_by: `${user.role} - ${user.profile_name}` }),
        })
        if (error) {
            setSnackbar({ open: true, type: "error", message: "Something went wrong" })
            setLoading(false)
            console.error(error)
        }else {
            setSnackbar({ open: true, type: "success", message: mode==="Replenish"?"Stock in Success":"Stock out Success" })
            setSelectedItem({
                name:"",
                item_id:"",
                quantity:""
            })
            setLoading(false)
        }
    }
    return (
        <div className="lg:flex ">
            <Sidebar/>
            <div className="flex flex-col lg:mx-auto gap-4 p-4">
                <div className="text-center text-blue-600 font-bold ">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <span className=" md:text-[20px] lg:text-[22px] max-md:mx-0 max-lg:mx-[clamp(20px,16vw,310px)] font-medium">{mode} Item</span>
                <div className="w-full md:w-[600px] md:mx-auto lg:w-[clamp(700px,70vw,1000px)]  flex  justify-center bg-white rounded-2xl h-[600px]  p-4">
                    {/* <button className="w-[clamp(50px,50vw,498px)] h-[32px]  bg-[rgba(241,243,249,1)] text-[12px] hover:bg-[rgba(61,61,62,0.8)]
                     active:bg-[rgba(12,51,137,0.8)] active:scale-99 hover:text-white" onClick={handleClick}>+ ADD ITEM</button> */}

                        <form action="" onSubmit={handleSubmit}>
                            <div className=" w-[clamp(50px,50vw,498px)] md:w-full md:h-[300px] lg:h-[352px] shadow-lg bg-white p-1.5 md:p-16">
                                <div className="flex flex-col gap-3.5 mb-6">
                                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onKeyDown={handleSearch}/>
                                    <div className="w-full aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="text" placeholder="ITEM" required value={selectedItem.name} readOnly className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    <div className="w-full aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="number" placeholder="AMOUNT" name="quantity" value={selectedItem.quantity} onChange={(e)=>setSelectedItem({...selectedItem,
                                            [e.target.name]:e.target.value})} required className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>   
                                </div>
                                <Button disabled={loading} type="submit" className="w-full aspect-[472/65] " variant="contained" startIcon={loading?<CircularProgress size={20} color="inherit"/>:null}>SUBMIT</Button>
                            </div>
                        </form>

                          <Drawer
                            anchor="right" // can be "bottom", "left", or "top"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <Box sx={{ width: 350, p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Search Results
                            </Typography>

                            {data.length > 0 ? (
                                <List>
                                {data.map((item, i) => (
                                    <ListItem
                                    key={i}
                                    component="button"
                                    onClick={() =>{ 
                                        setSelectedItem({...selectedItem,name:item.item_name,item_id:item.item_id})
                                        setSearchQuery("")
                                        setDrawerOpen(false)
                                        alert(`Selected: ${item.item_name}`)}}
                                    >
                                    <ListItemText primary={item.item_name} />
                                    </ListItem>
                                ))}
                                </List>
                            ) : (
                                <Typography color="text.secondary">No results found</Typography>
                            )}
                            </Box>
                        </Drawer>
                </div>
            </div> 
                {/* Snackbar for Success / Error */}
                    <Snackbar
                            open={snackbar.open}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            slotProps={{
                              root: {
                                sx: {
                                  position: "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                },
                              },
                            }}
                            autoHideDuration={3000}
                            onClose={() => setSnackbar({ ...snackbar, open: false })}>
                              <Alert severity={snackbar.type} sx={{ width: "100%" }}>
                                {snackbar.message}
                                </Alert>
                    </Snackbar>      
        </div>
    )
}