import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../supabase-client"
const LandingPage = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    
   
    const handleLogin = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setMessage("")
        const redirectUrl =
  window.location.hostname === "localhost" || window.location.hostname.startsWith("192.")
    ? `${window.location.protocol}//${window.location.host}/auth/callback`
    : "https://the-way-inventory.netlify.app/auth/callback";

        try{
             const { data: userCheck, error: userCheckError } = await supabase
            .from("users")
            .select("is_logged_in")
            .eq("email", email)
            .single();

            if (userCheckError) throw userCheckError;

            if (userCheck?.is_logged_in) {
            setMessage("This account is already logged in on another device.");
            setLoading(false);
            return;
            }
            const {data:signInCheck, error:signInError} = await supabase.auth.signInWithPassword({email,password});

            if (signInError) throw new Error("Invalid email or password")

            const {error:otpError} = await supabase.auth.signInWithOtp({
                email,
                options:{
                    emailRedirectTo: redirectUrl  
                }
            })

            if (otpError) throw otpError
                await supabase
            .from("users")
            .update({ is_logged_in: true, last_active: new Date() })
            .eq("id", signInCheck.user.id);

            setMessage("OTP sent! Check your email to confirm login")
        }catch(error){
            setMessage(error.message)
        }finally{
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () =>{
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `https://localhost:5173/`, // redirect after login
      },
        });
        if (error) alert(error.message);
    }

    return <div className="p-0">
        {/* company text */}
        <div className="h-[61px] max-w-full  bg-white pt-[5px] mt-[80px]">
            <h1 className=" text-center  text-[36px] font-black  text-[rgba(1,24,216,1)] company-name ">THE WAY</h1>
        </div>
        {/* login form */}
        <div className="flex flex-col items-center justify-center mt-9">
            <div className=" h-[300px] w-[285px] bg-white shadow-2xl rounded-3xl p-10">
                <form className="flex flex-col gap-6" action="" method="post" onSubmit={handleLogin} >
                    <div className="flex w-[197px] h-[32px] border rounded-[10px] border-[rgba(1,24,216,1)] p-1.5 gap-2">
                        <svg className="h-[18px] w-[18] text-[rgba(1,24,216,1)]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g id="_01_align_center" data-name="01 align center"><path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z"/></g></svg>
                        <input className="w-[150px] h-[17px] outline-0" type="email" name="email" placeholder="email" required onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="relative w-[197px] h-[32px] border rounded-[10px] border-[rgba(1,24,216,1)] p-1.5 flex items-center">
                        <svg
                            className="h-[18px] w-[18px] text-[rgba(1,24,216,1)] mr-2 flex-shrink-0"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z" />
                            <path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z" />
                        </svg>

                        <input
                            className="w-full h-[17px] outline-0 border-0 pr-6"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />

                        {/* 👁️ Eye toggle inside input */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 text-[rgba(1,24,216,1)] focus:outline-none"
                        >
                            {showPassword ? (
                            // 👁️ Eye Open
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            ) : (
                            // 🚫 Eye Closed
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c1.657 0 3 1.343 3 3a3 3 0 01-.477 1.523m2.685 2.685A8.978 8.978 0 0012 21c-4.477 0-8.268-2.943-9.542-7a8.978 8.978 0 013.304-4.527m2.685-2.685A8.978 8.978 0 0112 3c4.477 0 8.268 2.943 9.542 7a8.978 8.978 0 01-3.304 4.527"
                                />
                            </svg>
                            )}
                        </button>
                    </div>

                    <button className="w-[197px] h-[32px] rounded-[10px]  bg-[rgba(1,24,216,1)] 
                        hover:bg-[rgba(107,107,182,0.9)] 
                        active:bg-[rgba(104,118,238,0.7)] 
                        active:scale-95 
                        text-white text-sm font-medium 
                         transition-all duration-200 ease-in-out " disabled={loading}  type="submit">{loading ? "Processing..." : "Login"}</button>
                         {message && <p className="text-center text-sm mt-2">{message}</p>}
                
                </form>
                {/* <button
                       
                        onClick={handleGoogleLogin}
                        className="w-[197px] h-[32px] rounded-[10px] bg-[rgba(1,24,216,1)] 
                                    hover:bg-[rgba(107,107,182,0.9)] 
                                    active:bg-[rgba(104,118,238,0.7)] 
                                    active:scale-95 
                                    text-white text-sm font-medium 
                                    flex items-center justify-center gap-2 
                                    transition-all duration-200 ease-in-out mt-2"
                        >
                        <svg className="h-[18px] w-[18]"  viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                        <span>Google</span>
                    </button> */}
            </div>
        </div>
        {/* svg bg's */}
        <svg className="transform absolute top-0 p-0 -z-10 right-0 h-screen
         " viewBox="0 0 251 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1147 474.881C1147 806.252 890.235 1074.88 573.5 1074.88C256.765 1074.88 0 806.252 0 474.881C0
         143.51 256.765 -125.119 573.5 -125.119C890.235 -125.119 1147 143.51 1147 474.881Z" fill="#0118D8"/>
        <path d="M1216 384.5C1216 690.19 959.235 938 642.5 938C325.765 938 69 690.19 69 384.5C69 78.8104 325.765 -169 642.5 
        -169C959.235 -169 1216 78.8104 1216 384.5Z" fill="#1B56FD"/>
        </svg>
        <svg className="transform absolute  bottom-0  p-0  -z-10 left-0 h-screen max-sm:hidden" height='100' viewBox="0 0 231 778" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-916 643.881C-916 975.252 -659.235 1243.88 -342.5 1243.88C-25.7647 1243.88 231 975.252 231 643.881C231 312.51 -25.7647 43.8813 -342.5 43.8813C-659.235 43.8813 -916 312.51 -916 643.881Z" fill="#0118D8"/>
            <path d="M-985 553.5C-985 859.19 -728.235 1107 -411.5 1107C-94.7647 1107 162 859.19 162 553.5C162 247.81 -94.7647 1.97551e-06 -411.5 1.97551e-06C-728.235 1.97551e-06 -985 247.81 -985 553.5Z" fill="#1B56FD"/>
        </svg>

        
    </div>

}
export default LandingPage;