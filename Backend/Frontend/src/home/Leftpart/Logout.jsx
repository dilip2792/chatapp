import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import axios from 'axios'
import toast from 'react-hot-toast';
const Logout = () => {
    const [loading,setLoading]=useState(false)
    const handleLogout=async()=>{
        setLoading(true)
       try{
       const res= await axios.post("/api/user/logout");
       localStorage.removeItem("ChatApp");
       Cookies.remove("jwt")     
       toast.success("Logged out successfully")
       setLoading(false)
       window.location.reload();
       }catch(error){
        console.log("Error in Logout",error)
        toast.error("Error in logged out")
       }
    }
    return (
       <div className='h-[10vh] bg-slate-800'>
        <div>
        <BiLogOutCircle className='text-white text-4xl hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2'
        onClick={handleLogout}
        />
        </div>
       </div>
    )
}

export default Logout
