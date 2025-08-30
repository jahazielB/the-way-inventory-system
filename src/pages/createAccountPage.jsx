import { useParams } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
export const CreateAccountPage = ()=>{
     
    return (
       
        <div className="lg:flex gap-1 ">
                <Sidebar/>
                <div className="flex flex-col mx-auto gap-4 xl:gap-15 p-4">
                    <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px]">
                        <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="text-center text-[20px] md:text-[30px] lg:text-[42px] flex justify-center font-medium">Create Account</span>
                        <div className="w-[clamp(100px,80vw,600px)] items-center md:w-[600px] lg:w-[clamp(200px,50vw,533px)] h-[400px] xl:h-[467px] mx-auto my-auto  
                         bg-white rounded-2xl flex flex-col xl:gap-[20px] p-15 md:p-12 lg:p-10 xl:p-8 gap-3.5">
                            <div className="createAccountTextArea">
                                <input type="text" placeholder="Profile Name" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="text" placeholder="Designation" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="text" placeholder="Username" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="text" placeholder="Create Password" className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <button className="w-[clamp(100px,70vw,350px)] md:h-[50px] md:w-full h-[40px] lg:h-[55px] xl:h-[65px] bg-blue-600 rounded-2xl text-white hover:bg-[rgba(37,99,235,.8)]
                         active:bg-[rgba(12,51,137,0.8)] active:scale-99">Create Account</button>
                        </div>
                    </div>
                    
                    
                   
                    
                </div>
                
            </div>
    )
}