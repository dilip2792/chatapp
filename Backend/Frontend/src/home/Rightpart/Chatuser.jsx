import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from "react-icons/ci";
const Chatuser = () => {
    const { selectedConversation }=useConversation();
    console.log(selectedConversation)
    const {onlineUsers}=useSocketContext();
    const getOnlineUsersStatus=(userId)=>{
        return onlineUsers.includes(userId)?"Online":"Offline"
    }
    return (
        <div className='flex space-x-3 justify-center h-[8vh] items-center bg-slate-700 cursor-pointer hover:bg-slate-600 duration-300'>
            
                    <label
                      htmlFor="my-drawer-2"
                      className="btn btn-ghost drawer-button lg:hidden absolute left-5"
                    >
                      <CiMenuFries className="text-black text-xl" />
                    </label>
            <div className="avatar online">
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h1 className='text-xl'>{selectedConversation.fullname}</h1>
                <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
            </div>
            
        </div>
    )
}

export default Chatuser
