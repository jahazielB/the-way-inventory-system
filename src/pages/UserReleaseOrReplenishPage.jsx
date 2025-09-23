import { Button, Popover} from "@mui/material";
import { useState,useRef,useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export const UserReleaseReplenishPage =()=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState("");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const codeReader = useRef(new BrowserMultiFormatReader());
    const controlsRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);

    useEffect(() => {
    if (scanning) {
      codeReader.current
        .decodeFromVideoDevice(null, videoRef.current, (result, err, controls) => {
          // save controls so we can stop later
          if (!controlsRef.current) controlsRef.current = controls;

          const ctx = canvasRef.current?.getContext("2d");
          if (ctx && videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            ctx.clearRect(0, 0, videoWidth, videoHeight);

            // yellow candidate box
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              videoWidth * 0.2,
              videoHeight * 0.3,
              videoWidth * 0.6,
              videoHeight * 0.4
            );
          }

          if (result) {
            setResult(result.getText());
            alert("✅ Detected:", result);

            if (ctx) {
              ctx.strokeStyle = "lime";
              ctx.lineWidth = 4;
              ctx.strokeRect(
                videoRef.current.videoWidth * 0.2,
                videoRef.current.videoHeight * 0.3,
                videoRef.current.videoWidth * 0.6,
                videoRef.current.videoHeight * 0.4
              );
            }

            // stop after detection
            setScanning(false);
            controls.stop();
            controlsRef.current = null;
          }
        });
    }

    return () => {
      // cleanup when component unmounts or scanning toggled off
      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
    };
  }, [scanning]);

    return(
        <div className="p-4.5">
            <div className="flex justify-between "> 
                <div className="text-blue-700 flex flex-col">
                    <span className="text-[15px] font-black">{result?result:'THE WAY'}</span>
                    <span className="text-[10px]">Welcome, Stockman-PR</span>
                </div>
                <div className="flex gap-2">
                     <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.3005 2.97726C9.43746 2.63875 9.6724 2.34885 9.97519 2.14472C10.278 1.9406 10.6348 1.83154 11 1.83154C11.3652 1.83154 11.722 
                            1.9406 12.0248 2.14472C12.3276 2.34885 12.5625 2.63875 12.6995 2.97726C14.0553 3.34964 15.2512 4.157 16.1034 5.27522C16.9557 6.39345 17.4171 7.76063 17.4167 9.1666V13.4722L19.096 15.9912C19.1881 16.1292 19.241 16.2897
                            19.2491 16.4555C19.2571 16.6212 19.22 16.7861 19.1417 16.9324C19.0634 17.0787 18.9469 17.201 18.8045 17.2863C18.6621 17.3716 18.4993 17.4166 
                            18.3333 17.4166H14.1763C14.0659 18.1803 13.6841 18.8786 13.1007 19.3837C12.5174 19.8888 11.7716 20.1668 11 20.1668C10.2284 20.1668 9.4826 19.8888 8.89927 19.3837C8.31594 18.8786 7.93412 18.1803 7.82375
                             17.4166H3.66667C3.50071 17.4166 3.33786 17.3716 3.19549 17.2863C3.05312 17.201 2.93657 17.0787 2.85828 16.9324C2.77999 16.7861 2.74289 16.6212 2.75094 16.4555C2.75899 16.2897 2.81189 16.1292 2.904 15.9912L4.58333 13.4722V9.1666C4.58333 6.21126 6.58167 3.7216 9.3005 2.97726ZM9.70383 17.4166C9.79851 17.6849 9.97405 17.9172 10.2063 18.0815C10.4385 18.2458 10.716 18.334 11.0005 18.334C11.2849 18.334 11.5624 18.2458 11.7946 18.0815C12.0269 17.9172 12.2024 17.6849 12.2971 17.4166H9.70383ZM11 4.58326C9.78442 4.58326 8.61864 5.06615 7.75909 5.92569C6.89955 6.78523 6.41667 7.95102 6.41667 9.1666V13.7499C6.41671 13.931 6.36312 14.108 6.26267 14.2587L5.37992 15.5833H16.6192L15.7364 14.2587C15.6363 14.1079 15.583 13.9309 15.5833 13.7499V9.1666C15.5833 7.95102 15.1004 6.78523 14.2409 5.92569C13.3814 5.06615 12.2156 4.58326 11 4.58326Z" fill="#0118D8"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 9.06087 14.5786 10.0783 13.8284 10.8284C13.0783 
                            11.5786 12.0609 12 11 12C9.93913 12 8.92172 11.5786 8.17157 10.8284C7.42143 10.0783 7 9.06087 7 8C7 6.93913 7.42143 5.92172 8.17157 5.17157C8.92172 4.42143 9.93913 4 11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8ZM13 8C13 8.53043 12.7893 9.03914 12.4142 9.41421C12.0391 9.78929 11.5304 10 11 10C10.4696 10 9.96086 9.78929 9.58579 9.41421C9.21071 9.03914 9 8.53043 9 8C9 7.46957 9.21071 6.96086 9.58579 6.58579C9.96086 6.21071 10.4696 6 11 6C11.5304 6 12.0391 6.21071 12.4142 6.58579C12.7893 6.96086 13 7.46957 13 8Z" fill="#0118D8"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM2 11C2 13.09 2.713 15.014 3.908 16.542C4.74744 15.4401 5.83015 14.5471 7.07164 13.9327C8.31312 13.3183 9.6798 12.9991 11.065 13C12.4324 12.9984 13.7821 13.3091 15.0111 13.9084C16.2402 14.5077 17.3162 15.3797 18.157 16.458C19.0234 15.3216 19.6068 13.9952 19.8589 12.5886C20.111 11.182 20.0244 9.73553 19.6065 8.36898C19.1886 7.00243 18.4512 5.75505 17.4555 4.73004C16.4598 3.70503 15.2343 2.93186 13.8804 2.47451C12.5265 2.01716 11.0832 1.88877 9.66986 2.09997C8.25652 2.31117 6.91379 2.85589 5.75277 3.68905C4.59175 4.52222 3.64581 5.61987 2.99323 6.8912C2.34065 8.16252 2.00018 9.57097 2 11ZM11 20C8.93391 20.0033 6.93014 19.2926 5.328 17.988C5.97281 17.0646 6.83119 16.3107 7.83008 15.7905C8.82896 15.2702 9.93876 14.999 11.065 15C12.1772 14.999 13.2735 15.2635 14.263 15.7713C15.2524 16.2792 16.1064 17.0158 16.754 17.92C15.1395 19.267 13.1026 20.0033 11 20Z" fill="#0118D8"/>
                    </svg>
                </div>
            </div>
            <div className="p-5">
                <div className="w-[clamp(300px,50vw,1000px)] aspect-[1000/616] max-sm:h-[700px] bg-white rounded-2xl flex justify-center p-9">
                    <button  className="w-[clamp(50px,50vw,498px)] h-[32px]  bg-[rgba(241,243,249,1)] text-[12px] hover:bg-[rgba(61,61,62,0.8)]
                     active:bg-[rgba(12,51,137,0.8)] active:scale-99 hover:text-white" onClick={handleClick}>+ ADD ITEM</button>
                    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: "bottom",horizontal: "left",}} transformOrigin={{vertical: "top",horizontal: "left",}}>
                        <form action="">
                            <div className="w-[clamp(50px,50vw,498px)] h-[352px] bg-white p-16 max-sm:p-4">
                                <div className="flex flex-col gap-3.5 mb-6">
                                    <div className="w-[clamp(100px,50vw,364px)] aspect-[472/65] bg-[rgba(241,243,249,1)] max-sm:w-[150px]  rounded-md px-5">
                                        <input type="text" placeholder="ITEM" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    <div className="w-[clamp(100px,50vw,364px)] aspect-[472/65] bg-[rgba(241,243,249,1)] max-sm:w-[150px]  rounded-md px-5">
                                        <input type="text" placeholder="UNIT" className="w-full h-full outline-none bg-transparent text-center"/>
                                    </div>
                                    
                                </div>
                                <Button className="w-[clamp(150px,50vw,364px)] aspect-[472/65] max-sm:w-[150px]" variant="contained">SUBMIT</Button>
                               
                            </div>
                        </form>
                        
                        <div>
                            <div className="absolute top-30 w-full max-w-lg aspect-[16/9] bg-black rounded-lg overflow-hidden">
                                <video ref={videoRef} className="w-full h-full object-cover" />
                                <canvas
                                 ref={canvasRef}
                                 className="absolute top-0 left-0 w-full h-full"
                                 />
                            </div>
                            <button onClick={()=>setScanning(true)} disabled={scanning}>Scan Barcode</button>
                            <button onClick={()=>setScanning(false)} disabled={scanning}>stop scan</button>
                        </div>
                    </Popover>
            </div>
                
            </div>
            
            <svg className="transform absolute  bottom-0  p-0  -z-10 left-0 h-[350px] " width="375"  viewBox="0 0 375 476" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M566.538 295.267C623.357 507.32 497.516 725.284 285.463 782.103C73.4103 838.922 -144.554 713.081 -201.373 501.028C-258.192 288.975 -132.351 71.0113 79.702 14.192C291.755 -42.6274 509.719 83.2141 566.538 295.267Z" fill="#0118D8"/>
                <path d="M573.914 322.796C632.092 539.916 533.731 754.92 354.22 803.02C174.708 851.12 -17.9764 714.102 -76.1537 496.981C-134.331 279.86 -35.9704 64.8565 143.541 16.7565C323.052 -31.3434 515.737 105.675 573.914 322.796Z" fill="#1B56FD"/>
            </svg>
            
        </div>
    )
}