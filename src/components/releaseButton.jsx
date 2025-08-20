import { useNavigate } from "react-router-dom";

export const ReleaseButton = () => {
  const navigate = useNavigate()
  return (
    <button className="flex h-[40px] items-center gap-1 bg-[#0A84FF] text-white px-4 py-2 rounded-md hover:bg-[#0077e6] transition-colors active:scale-95" onClick={()=>navigate('/inventory/releaseItems')}>
      <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.83334 8H13.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      <span>Release</span>
    </button>
  );
};

