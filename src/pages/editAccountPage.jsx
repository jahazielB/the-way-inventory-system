import { Sidebar } from "../components/sidebar"

export const EditAccountPage = ()=>{
    return(
        (
                <div className="flex gap-1 ">
                        <Sidebar/>
                        <div className="flex flex-col ml-[5%] md:mx-[9%] lg:mx-[15%] xl:mx-[10%] max-md:gap-4 gap-4 p-4">
                            <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px] ml-10">
                                <h1>INVENTORY MANAGEMENT SYSTEM</h1>
                            </div>
                            <span className="text-center text-[42px] font-medium">Profile 1</span>
                            <div className="w-[clamp(200px,50vw,533px)] aspect-[533/467] bg-white rounded-2xl flex flex-col p-8 gap-3.5">
                                <div className="w-[clamp(150px,50vw,472px)] aspect-[472/65] border border-[rgba(68,68,68,1)] rounded-2xl px-5">
                                    <input type="text" placeholder="Profile Name" className="w-full h-full outline-none bg-transparent text-center"/>
                                </div>
                                <div className="w-[clamp(150px,50vw,472px)] aspect-[472/65] border border-[rgba(68,68,68,1)] rounded-2xl">
                                    <input type="text" placeholder="Designation" className="w-full h-full outline-none bg-transparent text-center"/>
                                </div>
                                <div className="w-[clamp(150px,50vw,472px)] aspect-[472/65] border border-[rgba(68,68,68,1)] rounded-2xl">
                                    <input type="text" placeholder="Username" className="w-full h-full outline-none bg-transparent text-center"/>
                                </div>
                                <div className="w-[clamp(150px,50vw,472px)] aspect-[472/65] border border-[rgba(68,68,68,1)] rounded-2xl">
                                    <input type="text" placeholder="Create Password" className="w-full h-full outline-none bg-transparent text-center"/>
                                </div>
                                <button className="w-[clamp(150px,50vw,472px)] aspect-[472/65]  bg-blue-600 rounded-2xl text-white
                                 hover:bg-[rgba(37,99,235,.8)] active:bg-[rgba(12,51,137,0.8)] active:scale-99">Edit Account</button>
                                 <button className="w-[clamp(150px,50vw,472px)] aspect-[472/65]  bg-blue-600 rounded-2xl text-white
                                 hover:bg-[rgba(37,99,235,.8)] active:bg-[rgba(12,51,137,0.8)] active:scale-99">Delete Account</button>
                            </div>
                           
                            
                        </div>
                        
                    </div>
            )
    )

}