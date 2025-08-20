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
        <div className="flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                    <h1>INVENTORY MANAGEMENT SYSTEM</h1>
                </div>
                <span className=" text-[22px] font-medium">{mode}</span>
                <div className="w-[clamp(300px,50vw,1000px)] aspect-[1000/616] bg-white rounded-2xl flex justify-center p-4">
                    <button  className="w-[clamp(50px,50vw,498px)] h-[32px]  bg-[rgba(241,243,249,1)] text-[12px] hover:bg-[rgba(61,61,62,0.8)]
                     active:bg-[rgba(12,51,137,0.8)] active:scale-99 hover:text-white" onClick={handleClick}>+ ADD ITEM</button>
                    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: "bottom",horizontal: "left",}} transformOrigin={{vertical: "top",horizontal: "left",}}>
                        <form action="">
                            <div className="w-[clamp(50px,50vw,498px)] h-[352px] bg-white p-16">
                                <div className="flex flex-col gap-3.5 mb-6">
                                    <div className="w-[clamp(150px,50vw,364px)] aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="text" placeholder="ITEM" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    <div className="w-[clamp(150px,50vw,364px)] aspect-[472/65] bg-[rgba(241,243,249,1)]  rounded-md px-5">
                                        <input type="text" placeholder="UNIT" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    
                                </div>
                                <Button className="w-[clamp(150px,50vw,364px)] aspect-[472/65] " variant="contained">SUBMIT</Button>
                            </div>
                        </form>
                    </Popover>
                </div>
            </div>       
        </div>
    )
}