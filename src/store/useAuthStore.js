import {create} from "zustand";
import {persist} from "zustand/middleware"
import supabase from "../supabase-client";

const useAuthStore = create(
    persist(
        (set)=>({
            user:null,

            setUser:(userData) => set({user:userData}),

            clearUser:()=>set({user:null}),

    
        }),
        {
            name: "auth-storage"
        }
    )
)

export default useAuthStore;