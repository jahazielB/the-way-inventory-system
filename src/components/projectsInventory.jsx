import { useNavigate } from "react-router-dom"
export const ProjectsInventory = ()=>{
    const navigate = useNavigate();
    return <div className="flex  flex-col   max-md:gap-4 gap-4 ">
            
            <div className="grid grid-cols-2 gap-9 w-[800px] h-[600px] pl-30 pt-16 max-w-full" onClick={()=>navigate('/projectinventory')}>
                <div className="flex w-[300px] h-[80px] bg-white  rounded-2xl p-5 hover:bg-[rgba(233,223,195,.7)] active:bg-amber-200 active:scale-97 max-w-full ">
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold">
                        <span>project</span>
                    </div>
                </div>
                <div className="flex w-[300px] h-[80px] bg-white rounded-2xl p-5 hover:bg-[rgba(233,223,195,.7)] active:bg-amber-200 active:scale-97 max-w-full ">
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold">
                        <span>ADD PROJECT</span>
                    </div>
                </div>
            </div>
        </div>
}