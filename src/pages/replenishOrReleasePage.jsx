import { Sidebar } from "../components/sidebar"
import { Button, Popover} from "@mui/material";

import { useState } from "react";
export const ReplenishReleasePage = ({mode})=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
    const handleClose = () => {
    setAnchorEl(null);
  };
    const open = Boolean(anchorEl);
    return (
        <div className="lg:flex ">
            <Sidebar/>
            <div className="flex flex-col lg:mx-auto gap-4 p-4">
                <div className="text-center text-blue-600 font-bold ">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                <span className=" md:text-[20px] lg:text-[22px] max-md:mx-0 max-lg:mx-[clamp(20px,16vw,310px)] font-medium">{mode}</span>
                <div className="w-full md:w-[600px] md:mx-auto lg:w-[clamp(700px,70vw,1000px)]  flex justify-center bg-white rounded-2xl h-[600px]  p-4">
                    <button  className="w-[clamp(50px,50vw,498px)] h-[32px]  bg-[rgba(241,243,249,1)] text-[12px] hover:bg-[rgba(61,61,62,0.8)]
                     active:bg-[rgba(12,51,137,0.8)] active:scale-99 hover:text-white" onClick={handleClick}>+ ADD ITEM</button>
                    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: "bottom",horizontal: "left",}} transformOrigin={{vertical: "top",horizontal: "left",}}>
                        <form action="">
                            <div className=" w-[clamp(50px,50vw,498px)] md:w-full md:h-[300px] lg:h-[352px] bg-white p-1.5 md:p-16">
                                <div className="flex flex-col gap-3.5 mb-6">
                                    <div className="w-full aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="text" placeholder="ITEM" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    <div className="w-full aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="text" placeholder="UNIT" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    
                                </div>
                                <Button className="w-full aspect-[472/65] " variant="contained">SUBMIT</Button>
                            </div>
                        </form>
                    </Popover>
                </div>
            </div>       
        </div>
    )
}