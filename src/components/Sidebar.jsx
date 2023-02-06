import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Link,useNavigate} from "react-router-dom";
import { useAuthContext } from '../context';

function Sidebar() {
  const {isUser,setIsUser,loading,setIsloading} = useAuthContext()
  const navigate = useNavigate()
  

  const handleLogout =()=>{
    setIsloading('true')
    Cookies.remove('activeUser')
   
    navigate('/')
     window.location.reload()
    setIsloading(false)
  }

  if (loading) {
    return <div className="mx-auto mt-[10vw] text-[2vw] text-[#D40E1F]">Loading...</div>;
  }

  return (
    <div>
        <div className='w-[17vw] bg-[#D40E1F0D] font-inter items-center justify-center h-[90vh] hidden xl:flex'>
            <div className='h-[98%] w-[90%] flex flex-col justify-between '>
            <div className='flex flex-col'>
            <Link to="/" className=' text-[#D40E1F] hover:bg-[#D40E1F] hover:text-[#ffffff] font-medium w-full flex items-center px-[5%] h-[8vh] rounded-[0.2vw] text-[1.1vw] mb-[3%]'>
            <i class="fa-solid fa-truck text-[18px] w-[8%]"></i>
            <h1 className='ml-[8%]'>Orders</h1>
            </Link>
            <Link to="/account" className='text-[#D40E1F] hover:bg-[#D40E1F] hover:text-[#ffffff] font-medium w-full flex items-center px-[5%] h-[8vh] rounded-[0.2vw] text-[1.1vw] mb-[3%]'>
            <i class="fa-solid fa-user-group text-[18px] w-[8%]"></i>
            <h1 className='ml-[8%]' >Account</h1>
            </Link>
            </div>
           { 
           isUser !== false?
           <div className='w-full text-[#D40E1F] hover:bg-[#D40E1F] hover:text-[#ffffff] font-medium flex items-center px-[5%] h-[8vh] rounded-[0.2vw] text-[1.1vw] mb-[3%] ' onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket text-center text-[18px] w-[8%]"></i>
              <h1 className='ml-[8%]  '>Log out</h1>
            </div>
            :
            <Link to="/login" className='w-full text-[#D40E1F] hover:bg-[#D40E1F] hover:text-[#ffffff] font-medium flex items-center px-[5%] h-[8vh] rounded-[0.2vw] text-[1.1vw] mb-[3%] ' >
              <i className="fa-solid fa-arrow-right-from-bracket text-center text-[18px] w-[8%]"></i>
              <h1 className='ml-[8%]  '>Login</h1>
            </Link>}
            </div>
        </div>
    </div>
  )
}

export default Sidebar