import { Sidebar } from "../components/sidebar";
import { Projects } from "../components/projects";

export const InventoryPage = ()=>{
    return <div className="flex">
        <Sidebar/>
        <div className="flex flex-col  gap-16 my-5 mx-21 md:mx-30 lg:mx-60 xl:mx-80 2xl:mx-120"> 
            <div className="text-center text-blue-600 font-bold">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
           
            <Projects link={'/inventory/projectinventory'}/>
            
        </div>
        
    </div>
}