import { useNavigate } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
export const NotificationsPage = ()=>{
    const navigate = useNavigate()
   return (
        <div className="lg:flex  ">
            <Sidebar/>
            <div className="flex flex-col mx-auto md:gap-8 lg:gap-10 xl:gap-14 p-4">
                <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px]">
                    <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                </div>
                
                <div className="mx-auto">
                    <span className="text-xs md:text-[22px] font-bold">Notifications</span>
                    <div className="flex flex-col mx-auto gap-60">
                     {/* for approval notif */}
                    <div className="md:h-[66px] w-[clamp(100px,70vw,2000px)] text-xs md:text-[20px]  bg-white rounded-[5px] shadow-2xl p-2 md:p-4 flex  cursor-pointer" onClick={()=>navigate('/notifications/approval')}>
                        <div className="font-bold h-fit w-[clamp(80px,50vw,200px)] border-r text-left md:text-center"><span>Stockman</span></div>
                        <div className="font-bold h-fit w-[clamp(80px,50vw,200px)] border-r text-left md:text-center"><span>Stockman</span></div>
                        <div className="font-bold h-fit w-[clamp(80px,50vw,200px)]  flex justify-start md:justify-center">
                            <span className="font-bold">for approval</span>
                            <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                                    fill="#FFCC00"/>
                                    ...</svg>
                            </span>
                            </div>
                    </div>
                    {/* approved notif */}
                    <div>
                        <div className="md:h-[66px] w-[clamp(100px,70vw,2000px)] text-xs md:text-[20px] bg-[rgba(240,241,244,0.5)]  rounded-[5px] shadow-2xl p-2 md:p-4 flex" >
                            <div className="font-light h-fit w-[clamp(80px,50vw,200px)] border-r text-left md:text-center"><span>Stockman</span></div>
                            <div className="font-light h-fit w-[clamp(80px,50vw,200px)] border-r text-left md:text-center"><span>Stockman</span></div>
                            <div className="font-light h-fit w-[clamp(80px,50vw,200px)]  flex  justify-start md:justify-center">
                                <span >approved</span>
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
        </div>
    )
}