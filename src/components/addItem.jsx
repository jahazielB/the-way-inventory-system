import { useEffect,useState } from "react"
import supabase from "../supabase-client"

import CircularProgress from "@mui/material/CircularProgress";
export const AddItem = ()=>{
    const [datas,setData] = useState()
    const [formData, setFormData] = useState({
        item_name: "",
        unit: "",
        project: "",
        location: "",
        opening_stock: "",
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("location_project_unit")
                .select("*");

            if (error) {
                console.error(error);
            } else {
                setData(data[0])
                
            }
            };
         fetchData();
         
        }, []);
    
    return (
        <div className="w-[clamp(100px,80vw,600px)] items-center md:w-[600px] lg:w-[clamp(200px,50vw,533px)] h-[400px] xl:h-[467px] mx-auto my-auto  
                         bg-white rounded-2xl flex flex-col xl:gap-[20px] p-15 md:p-12 lg:p-10 xl:p-8 gap-3.5">
                            <div className="createAccountTextArea">
                                <input onChange={(e)=>handleChange(e)} name="item_name" type="text" placeholder="Item Name" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <select defaultValue="" name="unit" onChange={(e)=>handleChange(e)} className="border-none focus:outline-none  rounded w-15 py-2 ">
                                    <option value=""  disabled  hidden>Unit</option>
                                    {datas&&(datas.units).map((d,index)=><option key={index} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <select defaultValue="" name="project"  onChange={(e)=>handleChange(e)} className="border-none focus:outline-none rounded w-35 py-2 ">
                                    <option  value=""  disabled  hidden>Choose Project</option>
                                    {datas&&(datas.projects).map((d,index)=><option  key={index} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="createAccountTextArea flex items-center justify-center">
                                <select defaultValue="" name="location" onChange={(e)=>handleChange(e)} className="border-none focus:outline-none rounded w-36 py-2 ">
                                    <option value=""  disabled  hidden>Choose Location</option>
                                    {datas&&(datas.locations).map((d,index)=><option key={index} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="number" onChange={(e)=>handleChange(e)} name="opening_stock" placeholder="Set Opening Stock" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <button onClick={()=>console.log(formData)} className="w-[clamp(100px,70vw,350px)] md:h-[50px] md:w-full h-[40px] lg:h-[55px] xl:h-[65px] bg-blue-600 rounded-2xl text-white hover:bg-[rgba(37,99,235,.8)]
                         active:bg-[rgba(12,51,137,0.8)] active:scale-99">Submit</button>
                        </div>
    )
}