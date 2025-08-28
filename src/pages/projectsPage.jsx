import { Sidebar } from "../components/sidebar"
import { Projects } from "../components/projects"
export const ProjectsPage = ()=>{
    return <div className="lg:flex">
        <Sidebar/>
        <div className="flex flex-col gap-10 my-0 mx-[clamp(5px,20vw,15rem)]  md:mx-[clamp(10px,40vw,15rem)]  lg:mx-auto xl:mx-auto 2xl:mx-auto">
            <div className="text-center text-blue-600 font-bold my-5 ">
                <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
            </div>
            <Projects link={'/selected'}/>  
        </div>
           
    </div>

}