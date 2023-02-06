import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import OrderItem from '../components/orderItem';
import { useAuthContext } from '../context';

const Index = () => {
  const {isUser} = useAuthContext()
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pages = Math.ceil(orderList.length / itemsPerPage);
  let currentData = orderList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [sortBy, setSortBy] = useState('shipping_limit_date');

  useEffect(() => {
    setIsLoading(false)
    const fetchOrderList = async () => {
      setIsLoading(true);
      if (isUser === false) {
        return setIsLoading(false)
       }
      const activeUser = JSON.parse(Cookies.get('activeUser'));
      console.log(activeUser[0])
      try {
        const response = await fetch(
          `https://unshelled.onrender.com/order_item/${activeUser[0].seller_id}?limit=20&offset=0&sort=shipping_limit_date`,
          {
            method: "GET",
            headers: {
              "Authorization": `Basic ${btoa(`${activeUser[0].seller_id}:${activeUser[0].seller_zip_code_prefix}`)}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setOrderList(data);
      } catch (error) {
        setError(error);
      }finally{
        setIsLoading(false);
      }
    };

    fetchOrderList();
  }, [isUser]);

  const handleSortBy = async (value) => {
    setIsLoading(true)
    setSortBy(value);
    await sortOrders();
    setIsLoading(false);
    
  };

  const sortOrders = async () => {
    const activeUser = JSON.parse(Cookies.get("activeUser"));
    const response = await fetch(
      `https://unshelled.onrender.com/order_item/${activeUser[0].seller_id}?limit=20&offset=0&sort=${sortBy}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Basic ${btoa(`${activeUser[0].seller_id}:${activeUser[0].seller_zip_code_prefix}`)}`,
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    setOrderList(data)
  };
  

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div className="mx-auto mt-[10vw] text-[2vw] text-[#D40E1F]">Loading...</div>;
  }

  return (
    <div>
        <div className='mt-[1vw] ml-[0.5vw]'>
          <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-[1.4vw] xl:text-[1vw]" onClick={() => handleSortBy('price')}>
            <i className="fa-solid fa-dollar-sign"></i> Price
          </button>
          <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4 text-[1.4vw] xl:text-[1vw]" onClick={() => handleSortBy('shipping_limit_date')}>
            <i className="fa-regular fa-calendar-days"></i> Shipping date
          </button>
        </div>
        <div class='mt-[1vh] mx-auto w-[80vw] border-[1px] border-solid border-[#7070701D]'>
        <div class='bg-[#D40E1F0D] h-[50px] lg:h-[6.5vh] text-[1.4vw] xl:text-[1vw] font-inter text-[#D40E1F] font-bold flex items-center justify-around text-center'>
            <h1 class="w-[5%] ">S/N</h1>
            <h1 class='w-[10%]  '>Order item id</h1>
            <h1 class="w-[30%]  ">Product id</h1>
            <h1 class='w-[20%]  '>Product category</h1>
            <h1 class='w-[10%]  '>Price</h1>
            <h1 class='w-[17%]  '>Shipping Date</h1>
        </div>
       {
        isUser === false ? <p className='text-center mt-[10vw] text-[1.5vw] text-[#D40E1F] font-bold'>Login to see orders</p>
        :
        <div>
        {
         currentData.map((items,index)=>{
           return <OrderItem key={index} sn={index + 1} {...items}/>
         })
        }
     </div>
       }
        <div>
        {currentPage > 1 && (
          <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        
        )}
        {currentPage < pages && (
          <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-1 py-1 px-4 rounded"
        >
          Next
        </button>
        
        )}
      </div>
        </div>
    </div>
  )
}

export default Index