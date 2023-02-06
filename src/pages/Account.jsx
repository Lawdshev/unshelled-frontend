import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuthContext } from '../context';

const Account = () => {
  const [seller,] = useState()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {isUser} = useAuthContext()
  const navigate = useNavigate()

 
  useEffect(() => {
    setIsLoading(true)
    if (isUser === false) {
      navigate('/login')
      return setIsLoading(false)
     } 
     setIsLoading(false)
  }, [])
  
  const updateData = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const state = e.target.elements.state.value;
  try {
    const response = await fetch('https://unshelled.onrender.comaccount', {
      method: 'PUT',
      headers: {
        "Authorization": `Basic ${btoa(`${seller[0].seller_id}:${seller[0].seller_zip_code_prefix}`)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seller_id: seller[0].seller_id ,
        seller_city: city,
        seller_state: state
      })
    });
    const result = await response.json();

  } catch (error) {
    setError(error);
  }
};

    if (error) {
      return <div>{error.message}</div>;
    }

    if (isLoading) {
      return <div className="mx-auto mt-[3vw]">Loading...</div>;
    }

    return (
      <div class="p-4  w-[60vw]">
      <h2 class="text-lg font-medium text-center">Account details:</h2>
      <form onSubmit={updateData} class="mt-4 flex items-center flex-col">
         <div class="mb-4 w-[50%]">
            <input type="text" name="city" placeholder="city" class="block p-2 w-full border border-gray-400 rounded-lg" />
         </div>
         <div class="mb-4 w-[50%]">
            <input type="text" name="state" placeholder="state" class="block p-2 w-full border border-gray-400 rounded-lg" />
         </div>
         <button type="submit" class="bg-[#D40E1F] text-white p-2 rounded-lg hover:bg-[#D40E1F0D] w-[20%]">update</button>
      </form>
      <div class="mt-4">
         {seller && (
            <div>
               <p class="font-medium">Seller ID: {seller.seller_id}</p>
               <p class="font-medium">Seller City: {seller.seller_city}</p>
               <p class="font-medium">Seller State: {seller.seller_state}</p>
            </div>
         )}
      </div>
   </div>
   
    );
  
};

export default Account;
