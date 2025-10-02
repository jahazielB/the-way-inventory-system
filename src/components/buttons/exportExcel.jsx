import { CircularProgress } from "@mui/material";

export const ExportExcelButton = ({perPageStyle,textHiddenMobile,onClick,disable})=>{
    const baseStyle = "flex text-[11px] h-[46px] font-bold items-center px-2  gap-1 border active:bg-amber-300 border-gray-300 rounded-lg  hover:bg-gray-50 ";
    return <button disabled={disable} onClick={()=>onClick()} className={`${baseStyle} ${perPageStyle}`}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 10V12.6667C14.5 13.0203 14.3595 13.3594 14.1095 13.6095C13.8594 13.8595 13.5203 14 13.1667 14H3.83333C3.47971 14 3.14057 13.8595 2.89052 13.6095C2.64048 13.3594 2.5 13.0203 2.5 12.6667V10" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.16666 6.66675L8.49999 10.0001L11.8333 6.66675" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.5 10V2" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className={`${textHiddenMobile}`}>{disable?<CircularProgress/>:'Export Excel'}</span> 
        </button>
}