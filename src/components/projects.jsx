import { useNavigate,useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
import supabase from "../supabase-client"


export const Projects = ({handleClick,handleGeneralClick})=>{
    const [data,setData] = useState([])
    const fetch = async()=>{
            const {data,error} = await supabase.from('customers').select('*')
            if (error) console.error(error)
            else setData(data) 
            console.log(data)
        }
    useEffect(()=>{
        fetch()
    },[])
    const location = useLocation()
    const navigate = useNavigate();
    return  (<div className=" flex flex-col justify-center items-center gap-3.5 h-fit lg:grid lg:grid-cols-[minmax(200px,350px)_minmax(200px,350px)] xl:gap-[20px] rounded-2xl  max-w-full " >
                {location.pathname==='/inventory'&&<div className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl" onClick={()=>navigate("/inventory/item_summary")}>
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold text-[12px]">
                        <span>General</span>
                    </div>
                    
                </div>}
                {data.map((p,index)=>
                    <div key={index} className="flex w-full h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                         active:bg-amber-200 active:scale-97  shadow-2xl" onClick={()=>handleClick(p.id)}>
                        <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                                7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                                stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-light text-[15px] ">
                            <span>{p.name}</span>
                        </div>
                    </div>
                )}
                
                
                <div className="flex w-full  h-[80px] max-sm:h-[60px]  bg-white rounded-[10px] p-5 max-sm:p-3 hover:bg-[rgba(233,223,195,.7)]
                 active:bg-amber-200 active:scale-97  shadow-2xl">
                    <svg width="36" height="36" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.3333 16.3333C37.3333 21.488 33.1546 25.6667 28 25.6667C22.8453 25.6667 18.6667 21.488 18.6667 16.3333C18.6667 11.1787 22.8453 7 28 7C33.1546
                     7 37.3333 11.1787 37.3333 16.3333Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 32.6667C18.9793 32.6667 11.6667 39.9793 11.6667 49H44.3333C44.3333 39.9793 37.0206 32.6667 28 32.6667Z" stroke="black" stroke-width="1.2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="border-l h-[36px] mx-6 pl-10 pt-1.5 font-bold text-[12px]">
                        <span>ADD PROJECT</span>
                    </div>
                    
                </div>
                
            </div>)
        
}