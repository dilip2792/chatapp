import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';
import axios from 'axios';

const Typesend = () => {
  
  const [message, setMessage]=useState("")
  const {loading ,sendMessages  }=useSendMessage();

  const handleSubmit=async(e)=>{
    console.log(e);
    e.preventDefault();
   
    await sendMessages(message);
    setMessage("")
  }

  return (
   <form onSubmit={handleSubmit}>
     <div className='flex space-x-1 h-[8vh]  bg-gray-800'>
        <div className=' w-[70%] mx-4 '>
      <input type="text" placeholder="Type here"  
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      className="border mt-1 border-gray-700 rounded-xl outline-none px-4 py-3 w-full text-blue-900" />
    </div>
    <button className='text-2xl'><IoSend /></button>
    </div>
   </form>
  )
}

export default Typesend
