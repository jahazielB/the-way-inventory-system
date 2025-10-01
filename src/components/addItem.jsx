import { useEffect,useState } from "react"
import supabase from "../supabase-client"

import { Button, CircularProgress, Snackbar, Alert,Select,MenuItem,Checkbox,ListItemText,OutlinedInput } from "@mui/material";
export const AddItem = ()=>{
    const [datas,setData] = useState()
    const [formData, setFormData] = useState({
        item_name: "",
        unit: "",
        project: "",
        location_id: "",
        opening_stock: "",
        reorder_point: 0,
        reorder_quantity: 0,
        customer_ids: [],
      });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
    
  };
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.rpc("manage_item", {
                    p_action: "read"
                });

            if (error) {
                console.error(error);
            } else {
                setData(data)
                console.log(data.locations[0].id)
                
            }
            };
         fetchData();
         
        }, []);
    
    const handleSubmit = async () => {
     // Validate required fields
    if (!formData.item_name.trim() || !formData.unit.trim()) {
        setSnackbar({ open: true, type: "error", message: "Item and Unit Required!" });
        return;
    }
    try {
      setLoading(true);

      const { data, error } = await supabase.rpc("manage_item", {
        p_action: "insert",
        p_item_name: formData.item_name,
        p_unit: formData.unit,
        p_opening_stock: formData.opening_stock ? parseInt(formData.opening_stock) : 0,
        p_reorder_point: formData.reorder_point ? parseInt(formData.reorder_point) : 0,
        p_reorder_quantity: formData.reorder_quantity ? parseInt(formData.reorder_quantity) : 0,
        p_location_id: formData.location_id ? parseInt(formData.location_id) : null,
        p_customer_ids: formData.customer_ids?.map((id) => parseInt(id)) || [], // multiple customers
    });

      if (error) throw error;

      setSnackbar({ open: true, type: "success", message: "Item saved successfully!" });

      // reset form
      setFormData({
        item_name: "",
        unit: "",
        project: "",
        location_id: "",
        opening_stock: "",
        reorder_point: 0,
        reorder_quantity: 0,
        customer_ids: [],
      });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, type: "error", message: "Failed to save item." });
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="w-[clamp(100px,80vw,600px)] items-center md:w-[600px] lg:w-[clamp(200px,50vw,533px)] h-[400px] xl:h-[467px] mx-auto my-auto  
                         bg-white rounded-2xl flex flex-col xl:gap-[20px] p-15 md:p-12 lg:p-10 xl:p-8 gap-3.5">
                            <div className="createAccountTextArea">
                                <input onChange={(e)=>handleChange(e)} required value={formData.item_name} name="item_name" type="text" placeholder="Item Name" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <select  required name="unit" value={formData.unit} onChange={(e)=>handleChange(e)} className="border-none focus:outline-none  rounded w-15 py-2 ">
                                    <option value=""  disabled  hidden>Unit</option>
                                    {datas&&(datas.units).map((d,index)=><option key={index} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <Select
                                    multiple
                                    displayEmpty
                                    name="customer_ids"
                                    value={formData.customer_ids} // must be an array
                                    onChange={(e)=>handleChange(e)}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span className="text-gray-400 ml-39">Choose Customers</span>;
                                    }
                                    return datas?.customers
                                        ?.filter((c) => selected.includes(c.id))
                                        .map((c) => c.name)
                                        .join(", ");
                                    }}
                                    className="w-full"
                                >
                                    {datas?.customers?.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        <Checkbox checked={formData.customer_ids?.includes(c.id)} />
                                        <ListItemText primary={c.name} />
                                    </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <select value={formData.location_id} name="location_id" onChange={(e)=>handleChange(e)} className="border-none focus:outline-none rounded w-36 py-2 ">
                                    <option value=""  disabled  hidden>Choose Location</option>
                                    {datas&&(datas.locations).map((d,index)=><option key={index} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="number" onChange={(e)=>handleChange(e)} name="opening_stock" value={formData.opening_stock} placeholder="Set Opening Stock" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <button onClick={handleSubmit} disabled={loading} className="w-[clamp(100px,70vw,350px)] md:h-[50px] md:w-full h-[40px] lg:h-[55px] xl:h-[65px] bg-blue-600 rounded-2xl text-white hover:bg-[rgba(37,99,235,.8)]
                         active:bg-[rgba(12,51,137,0.8)] active:scale-99">{loading?(<CircularProgress/>):"Submit"}</button>
                         {/* Snackbar for Success / Error */}
                            <Snackbar
                                open={snackbar.open}
                                autoHideDuration={3000}
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
                                onClose={() => setSnackbar({ ...snackbar, open: false })}
                            >
                                <Alert severity={snackbar.type} sx={{ width: "100%" }}>
                                {snackbar.message}
                                </Alert>
                            </Snackbar>
                        </div>
    )
}