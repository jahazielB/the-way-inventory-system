import { useParams,useLocation } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import { AddItem } from "../components/addItem"
import supabase from "../supabase-client"
import { useState } from "react"
import { createUser } from "../api/createUser"
import { Snackbar,Alert } from "@mui/material"
export const CreateAccountPage = ()=>{
    const [formData, setFormData] = useState({
        profile_name: "",
        role: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
    const [passwordStrength, setPasswordStrength] = useState("");

    const location = useLocation()

    const handleChange = (e)=>{
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
        if (e.target.name === "password") {
      setPasswordStrength(getPasswordStrength(e.target.value));
    }
    }
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );
      // Calculate password strength
    const getPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;

        if (score <= 2) return "Weak";
        if (score === 3 || score === 4) return "Medium";
        if (score === 5) return "Strong";
        return "";
    };

    const handleCreateAccount = async (e) =>{
        e.preventDefault()
        const {profile_name,role,email,password} = formData;

        if (!profile_name || !email || !password){
            setSnackbar({ open: true, type: "error", message: "Please fill in all required fields" });
            return
        }
        if(!isValidEmail(email)){
            setSnackbar({ open: true, type: "error", message: "Please enter a valid email address" });
            return
        }
        if(!isValidPassword(password)){
            setSnackbar({ open: true, type: "error", message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character." });
            return
        }
        setLoading(true)
        try{
            const res = await createUser({email, password, role, profile_name});
            setSnackbar({ open: true, type: "success", message: res.message||"user created successfully" });
            setFormData({ profile_name: "", role: "user", email: "", password: "" })
            setPasswordStrength("")

        }catch(err){
            setSnackbar({ open: true, type: "error", message: err.message||"Error creating user/admin" });
        }finally{
            setLoading(false)
        }

    }
    return (
       
        <div className="lg:flex gap-1 ">
                <Sidebar/>
                <div className="flex flex-col mx-auto gap-4 xl:gap-15 p-4">
                    <div className="text-center text-blue-600 font-bold text-[20px] xl:text-[30px]">
                        <span className="title">INVENTORY MANAGEMENT SYSTEM</span>
                    </div>
                    <div >
                        <span className="text-center text-[20px] md:text-[30px] lg:text-[42px] flex justify-center font-medium">{location.pathname === '/accounts/create'?"Create Account":"Add Item"}</span>
                        {location.pathname === '/accounts/create'?(<div className="w-[clamp(100px,80vw,600px)] items-center md:w-[600px] lg:w-[clamp(200px,50vw,533px)] h-[400px] xl:h-[467px] mx-auto my-auto  
                         bg-white rounded-2xl flex flex-col xl:gap-[20px] p-15 md:p-12 lg:p-10 xl:p-8 gap-3.5">
                            <form action="" onSubmit={handleCreateAccount} className="flex flex-col gap-5">
                                <div className="createAccountTextArea">
                                <input type="text" placeholder="Profile Name" name="profile_name" value={formData.profile_name} onChange={(e)=>handleChange(e)} className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea">
                                <select  required name="role" value={formData.role} onChange={(e)=>handleChange(e)} className="border-none focus:outline-none text-center mx-42 my-4  rounded w-fit  ">
                                    <option value=""  disabled  hidden>Designation</option>
                                    <option key={1} value="admin">admin</option>
                                    <option key={2} value="user">user/stockman</option>
                                </select>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={(e)=>handleChange(e)} className="w-full h-full outline-none bg-transparent text-center"/>
                            </div>
                            <div className="createAccountTextArea">
                                <input type="text" placeholder="Create Password" name="password" value={formData.password} onChange={(e)=>handleChange(e)} className="w-full h-full outline-none bg-transparent text-center"/>
                                {formData.password && (
                                <p
                                    className={`text-center font-medium ${
                                    passwordStrength === "Weak"
                                        ? "text-red-500"
                                        : passwordStrength === "Medium"
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                    }`}
                                >
                                    Password strength: {passwordStrength}
                                </p>
                                )}
                            </div>
                            <button disabled={loading} className="w-[clamp(100px,70vw,350px)] md:h-[50px] md:w-full h-[40px] lg:h-[55px] xl:h-[65px] bg-blue-600 rounded-2xl text-white hover:bg-[rgba(37,99,235,.8)]
                         active:bg-[rgba(12,51,137,0.8)] active:scale-99">{loading?"creating...": "Create Account"}</button>
                            {/* {message && <p className="text-center text-sm mt-2">{message}</p>} */}
                            </form>
                            
                        </div>):<AddItem/>}
                        
                    </div>
                    
                    
                   
                    
                </div>
                {/* Snackbar for Success / Error */}
                    <Snackbar
                            open={snackbar.open}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            slotProps={{
                              root: {
                                sx: {
                                  position: "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                },
                              },
                            }}
                            autoHideDuration={3000}
                            onClose={() => setSnackbar({ ...snackbar, open: false })}>
                              <Alert severity={snackbar.type} sx={{ width: "100%" }}>
                                {snackbar.message}
                                </Alert>
                    </Snackbar>
            </div>
    )
}