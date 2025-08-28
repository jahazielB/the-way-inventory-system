import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Sidebar = ({bg})=>{
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    const temporaryHandleClick = (menu)=>{
        navigate(`/${menu}`)
        console.log('clicked')
    }
    
    return (
    <div className="flex max-lg:fixed max-lg:w-[200px] lg:w-[256px] ">
    
      {/* Sidebar */}
      <div className={`h-full z-50 w-54 md:w-[256px]  transform transition-transform duration-300 md:min-h-screen bg-white text-[rgba(0,0,255,90)] max-lg:fixed flex flex-col
         justify-between rounded-2xl lg:translate-x-0 ${isOpen?'translate-x-0':'-translate-x-full'}`}>
        {/* Top Section */}
        <div>
          {/* Company Name (Upper Right) */}
          <div className="flex p-4  ">
            <h1 className="text-[22px] md:text-[32px] font-extrabold">THE WAY</h1>
          </div>

          {/* Menu */}
          <nav className="mt-8 ml-2 md:ml-3.5">
            <ul className="space-y-1.5">
              <li className="dashboard-menu text-[15px] md:text-[20px] font-extrabold" style={bg?{backgroundColor:'#E0E2E8'}:{backgroundColor:'none'}} onClick={()=>temporaryHandleClick('dashboard')}>
                <svg className="mt-1"  width="18" height="18" viewBox="0 0 18 18" fill="#0118D8" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3407 6.80171L11.652 1.11221C10.9479 0.410203 9.99424 0.0159912 9 0.0159912C8.00575 0.0159912 7.05206 0.410203 6.348 1.11221L0.659245 6.80171C0.449564 7.01005 0.283322 7.25794 0.170157 7.531C0.0569911 7.80407 -0.000847106 8.09688 -5.2455e-06 8.39246V15.7552C-5.2455e-06 16.3519 0.237048 16.9242 0.659005 17.3462C1.08096 17.7682 1.65326 18.0052 2.25 18.0052H15.75C16.3467 18.0052 16.919 17.7682 17.341 17.3462C17.7629 16.9242 18 16.3519 18 15.7552V8.39246C18.0008 8.09688 17.943 7.80407 17.8298 7.531C17.7167 7.25794 17.5504 7.01005 17.3407 6.80171ZM11.25 16.5052H6.75V13.5547C6.75 12.958 6.98705 12.3857 7.40901 11.9637C7.83096 11.5418 8.40326 11.3047 9 11.3047C9.59673 11.3047 10.169 11.5418 10.591 11.9637C11.0129 12.3857 11.25 12.958 11.25 13.5547V16.5052ZM16.5 15.7552C16.5 15.9541 16.421 16.1449 16.2803 16.2855C16.1397 16.4262 15.9489 16.5052 15.75 16.5052H12.75V13.5547C12.75 12.5601 12.3549 11.6063 11.6516 10.9031C10.9484 10.1998 9.99456 9.80471 9 9.80471C8.00543 9.80471 7.05161 10.1998 6.34835 10.9031C5.64508 11.6063 5.25 12.5601 5.25 13.5547V16.5052H2.25C2.05108 16.5052 1.86032 16.4262 1.71966 16.2855C1.57901 16.1449 1.5 15.9541 1.5 15.7552V8.39246C1.50069 8.1937 1.57964 8.0032 1.71975 7.86221L7.4085 2.17496C7.83127 1.75416 8.40349 1.51792 9 1.51792C9.5965 1.51792 10.1687 1.75416 10.5915
                 2.17496L16.2802 7.86446C16.4198 8.0049 16.4987 8.19448 16.5 8.39246V15.7552Z" />
                </svg>
                <span>Dashboard</span>
              </li>
              <li className="dashboard-menu submenu" onClick={()=>temporaryHandleClick('projects')}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#0118D8" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 5.25V12.75C2.25 13.5784 2.92157 14.25 3.75 14.25H14.25C15.0784 14.25 15.75 13.5784 15.75 12.75V6.75C15.75 5.92157 15.0784 5.25 14.25 5.25H9.75L8.25 3.75H3.75C2.92157 3.75 2.25 4.42157 2.25 5.25Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Projects</span>
              </li>
              <li className="dashboard-menu submenu " onClick={()=>temporaryHandleClick('inventory')}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#0118D8" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12M9 8.25V12M6 10.5V12M4.5 15H13.5C14.3284 15 15 14.3284 15 13.5V4.5C15 3.67157 14.3284 3 13.5 3H4.5C3.67157 3 3 3.67157 3 4.5V13.5C3 14.3284 3.67157 15 4.5 15Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Inventory</span>
              </li>
              <li className="dashboard-menu submenu" onClick={()=>temporaryHandleClick('accounts')}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#0118D8" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3.26563C9.54971 2.64282 10.354 2.25 11.25 2.25C12.9069 2.25 14.25 3.59315 14.25 5.25C14.25 6.90685 12.9069 8.25 11.25 8.25C10.354 8.25 9.54971 7.85718 9 7.23437M11.25 15.75H2.25V15C2.25 12.5147 4.26472 10.5 6.75 10.5C9.23528 10.5 11.25 12.5147 11.25 15V15.75ZM11.25 15.75H15.75V15C15.75 12.5147 13.7353 10.5 11.25 10.5C10.4304 10.5 9.66189 10.7191 9 11.102M9.75 5.25C9.75 6.90685 8.40685 8.25 6.75 8.25C5.09315 8.25 3.75 6.90685 3.75 5.25C3.75 3.59315 5.09315 2.25 6.75 2.25C8.40685 2.25 9.75 3.59315 9.75 5.25Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Account Management</span>
              </li>
            </ul>
          </nav>
        </div>

        {/* Optional Bottom Section */}
        <div className="flex-col p-4  ml-5 my-7 text-[11px] md:text-[13px] text-blue">
            <div className="flex  gap-2 mb-2 cursor-pointer active:bg-amber-600 hover:bg-[rgba(107,107,182,0.9)] rounded-4xl" onClick={()=>navigate('/notifications')}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.3005 2.97726C9.43746 2.63875 9.6724 2.34885 9.97519 2.14472C10.278 1.9406 10.6348 1.83154 11 1.83154C11.3652 1.83154 11.722 1.9406 12.0248 2.14472C12.3276 2.34885 12.5625 2.63875 12.6995 2.97726C14.0553 3.34964 15.2512 4.157 16.1034 5.27522C16.9557 6.39345 17.4171 7.76063 17.4167 9.1666V13.4722L19.096 15.9912C19.1881 16.1292 19.241 16.2897
                   19.2491 16.4555C19.2571 16.6212 19.22 16.7861 19.1417 16.9324C19.0634 17.0787 18.9469 17.201 18.8045 17.2863C18.6621 17.3716 18.4993 17.4166 18.3333 17.4166H14.1763C14.0659 18.1803 13.6841 18.8786 13.1007 19.3837C12.5174 19.8888 11.7716 20.1668 11 20.1668C10.2284 20.1668 9.4826 19.8888 8.89927 19.3837C8.31594 18.8786 7.93412 18.1803 7.82375 17.4166H3.66667C3.50071 17.4166 3.33786 17.3716 3.19549 17.2863C3.05312 17.201 2.93657 17.0787 2.85828 16.9324C2.77999 16.7861 2.74289 16.6212 2.75094 16.4555C2.75899 16.2897 2.81189 16.1292 2.904 15.9912L4.58333 13.4722V9.1666C4.58333 6.21126 6.58167 3.7216 9.3005 2.97726ZM9.70383 17.4166C9.79851 17.6849 9.97405 17.9172 10.2063 18.0815C10.4385 18.2458 10.716 18.334 11.0005 18.334C11.2849 18.334 11.5624 18.2458 11.7946 18.0815C12.0269 17.9172 12.2024 17.6849 12.2971 17.4166H9.70383ZM11 4.58326C9.78442 4.58326 8.61864 5.06615 7.75909 5.92569C6.89955 6.78523 6.41667 7.95102 6.41667 9.1666V13.7499C6.41671 13.931 6.36312 14.108 6.26267 14.2587L5.37992 15.5833H16.6192L15.7364 14.2587C15.6363 14.1079 15.583 13.9309 15.5833 13.7499V9.1666C15.5833 7.95102 15.1004 6.78523 14.2409 5.92569C13.3814 5.06615 12.2156 4.58326 11 4.58326Z" fill="#0118D8"/>
                </svg>
                <span>Notifications</span>
            </div>
            <div className="flex gap-2 mb-2">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="#0118D8" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6667 6.41667C14.6667 8.44171 13.025 10.0833 11 10.0833C8.97496 10.0833 7.33333 8.44171 7.33333 6.41667C7.33333 4.39162 8.97496 2.75 11 2.75C13.025 2.75 14.6667 4.39162 14.6667 6.41667Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 12.8333C7.45617 12.8333 4.58333 15.7062 4.58333 19.25H17.4167C17.4167 15.7062 14.5438 12.8333 11 12.8333Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Administrator</span>
            </div>
            <div className="flex gap-3 ">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.962406 8.01765L0.37594 7.54773L0 8.01765L0.37594 8.48758L0.962406 8.01765ZM7.72932 8.76953C7.92873 8.76953 8.11998 8.69032 8.26098 8.54931C8.40199 8.40831 8.4812 8.21706 8.4812 8.01765C8.4812 7.81824 8.40199 7.627 8.26098 7.48599C8.11998 7.34499 7.92873 7.26577 7.72932 7.26577V8.76953ZM3.38346 3.78833L0.37594 7.54773L1.54887 8.48758L4.55639 4.72818L3.38346 3.78833ZM0.37594 8.48758L3.38346 12.247L4.55639 11.3071L1.54887 7.54773L0.37594 8.48758ZM0.962406 8.76953H7.72932V7.26577H0.962406V8.76953Z" fill="#0118D8"/>
                <path d="M6.97744 5.10931V4.55066C6.97744 3.33337 6.97744 2.7251 7.33383 2.3048C7.69023 1.8845 8.29023 1.78375 9.49023 1.58299L10.7474 1.37397C13.1857 0.967956 14.4045 0.764949 15.2023 1.44014C16 2.11608 16 3.35217 16 5.8236V10.2108C16 12.683 16 13.9191 15.203 14.5943C14.4045 15.271 13.1857 15.068 10.7474 14.6612L9.49023 14.4514C8.29023 14.2514 7.69023 14.1514 7.33383 13.7311C6.97744 13.3101 6.97744 12.701 6.97744 11.4837V11.074" stroke="#0118D8" stroke-width="2"/>
              </svg>
              <span>Logout</span>
            </div>
        </div>
      </div>
      
      <svg className="absolute lg:hidden cursor-pointer active:scale-95" width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setIsOpen(!isOpen)}>
        <path d="M5 8H13.75M5 12H19M10.25 16L19 16" stroke="#0118D8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {/* Backdrop Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )

}