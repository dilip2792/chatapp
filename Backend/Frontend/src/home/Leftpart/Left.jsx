import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <>
    
    <div className='text-gray-300 bg-black w-full'>
      <Search/>
      <div className='py-2 flex-1 overflow-y-auto ' style={{minHeight:"calc(84vh - 10vh)",scrollbarWidth:'none'}} >
        <Users/>
        
        </div>
      <Logout/>
    </div>
   
    </>
  )
}

export default Left
