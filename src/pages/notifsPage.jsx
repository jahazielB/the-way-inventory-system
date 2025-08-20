import { useNavigate } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
export const NotificationsPage = ()=>{
    const navigate = useNavigate()
   return (
        <div className="flex gap-1 ">
            <Sidebar/>
            <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                    <h1>INVENTORY MANAGEMENT SYSTEM</h1>
                </div>
                <span className=" text-[22px] font-medium">Notifications</span>
                <div className="flex flex-col gap-60">
                     {/* for approval notif */}
                    <div className="h-[66px] w-[clamp(300px,50vw,700px)] bg-white rounded-[10px] shadow-2xl p-5 flex cursor-pointer" onClick={()=>navigate('/notifications/approval')}>
                        <div className=" h-fit w-[clamp(80px,50vw,200px)] border-r text-center"><span>Stockman</span></div>
                        <div className=" h-fit w-[clamp(80px,50vw,200px)] border-r text-center"><span>Stockman</span></div>
                        <div className=" h-fit w-[clamp(80px,50vw,200px)]  flex justify-center">
                            <span>for approval</span>
                            <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                                    fill="#FFCC00"/>
                                    ...</svg>
                            </span>
                            </div>
                    </div>
                    {/* approved notif */}
                    <div>
                        <div className="h-[66px] w-[clamp(300px,50vw,700px)] bg-white rounded-[10px] shadow-2xl p-5 flex" >
                            <div className=" h-fit w-[clamp(80px,50vw,200px)] border-r text-center"><span>Stockman</span></div>
                            <div className=" h-fit w-[clamp(80px,50vw,200px)] border-r text-center"><span>Stockman</span></div>
                            <div className=" h-fit w-[clamp(80px,50vw,200px)]  flex justify-center">
                                <span>approved</span>
                                <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" 
                                        fill="#FFCC00"/>
                                        </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>       
        </div>
    )
}