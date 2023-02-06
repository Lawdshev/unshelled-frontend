import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuthContext } from '../context';

const ItemDetailsPage = () => {
  const {isUser,setIsUser} = useAuthContext()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [item, setItem] = useState({});
    const [category, setCategory] = useState(null)
    const {order_id} = useParams()
    const activeUser = JSON.parse(Cookies.get('activeUser'));


  useEffect(() => {
    setIsLoading(true)
    if (isUser === false) {
      navigate('/login')
      return setIsLoading(false)
     } 
    const fetchOrderItem = async () => {
        const response = await fetch(`https://unshelled.onrender.com/order_item/${order_id}`, {
          method: "GET",
          headers: {
            "Authorization": `Basic ${btoa(`${activeUser[0].seller_id}:${activeUser[0].seller_zip_code_prefix}`)}`,
            "Content-Type": "application/json"
          }
        });
      
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
      
        if (!response.ok) {
            setError("Failed to fetch order item")
          throw new Error("Failed to fetch order item");
        }
      
        const orderItem = await response.json();
        setItem(orderItem);
        return orderItem.product_id
      };
     
    const fetchProduct = async () => { 
        setIsLoading(true)
        const productId = await fetchOrderItem()
        try {
          const response = await fetch(`https://unshelled.onrender.com/product/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${activeUser[0].seller_id}:${activeUser[0].seller_zip_code_prefix}`)}`,
                "Content-Type": "application/json"
              }
          });
      
          if (!response.ok) {
            setError(response.statusText)
            throw new Error(response.statusText);
          }
      
          const product = await response.json();
          setCategory(product.product_category_name)
          return product;
        } catch (error) {
            setError(error)
          console.error(error);
          throw error;
        } finally{
          setIsLoading(false)
        }

      };

      fetchOrderItem()
      fetchProduct()
      setIsLoading(false)
  }, []);

  const handleEdit = () => {
    // Redirect the user to the edit page for the item
    navigate(`/edit/${item.product_id}`);
  };

  async function deleteOrderItem() {
    setIsLoading(true);
    try {
      const res = await fetch(`https://unshelled.onrender.com/order_item/${order_id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Basic ${btoa(`${activeUser[0].seller_id}:${activeUser[0].seller_zip_code_prefix}`)}`,
            "Content-Type": "application/json"
          }
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (error) {
      setError(error.message);
    } finally {
        navigate(-1);
      setIsLoading(false);
    }
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div className="mx-auto mt-[10vw] text-[2vw] text-[#D40E1F]">Loading...</div>;
  }

  return (
    <div class="p-4 w-[60%]">
   <h1 class="text-2xl font-medium">Item Details</h1>
   <ul class="mt-4">
      <li class="font-medium">category: {category}</li>
      <li class="font-medium">Order Item ID: {item.order_item_id}</li>
      <li class="font-medium">Product ID: {item.product_id}</li>
      <li class="font-medium">Price: {item.price}</li>
      <li class="font-medium">Shipping Limit Date: {item.shipping_limit_date}</li>
   </ul>
   <div class="mt-4">
      <button onClick={()=>deleteOrderItem()} class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 w-[20%]">Delete</button>
      <button onClick={handleEdit} class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 ml-4 w-[20%]">Edit</button>
   </div>
</div>

  );
};

export default ItemDetailsPage;
