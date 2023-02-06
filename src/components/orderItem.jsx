import React from 'react';
import {useNavigate} from 'react-router-dom'

function OrderItem({sn,order_item_id,product_id,price,shipping_limit_date,order_id}) {
  const navigate = useNavigate();

  return (
    <div class='bg-[#ffffff] h-[60px] lg:h-[7.5vh] text-[1.4vw] xl:text-[1vw] font-inter text-[#8E8E8E] font-bold flex items-center justify-around border-b-[1px] border-b-[#7070701D] border-b-solid text-center cursor-pointer' onClick={() => {navigate('/item/' + order_id)}}>
      <h1 class="w-[5%]  ">{sn}</h1>
      <h1 class='w-[10%] '>{order_item_id}</h1>
      <h1 class="w-[30%] ">{product_id}</h1>
      <h1 class='w-[20%] '>Exporte_lezer</h1>
      <h1 class='w-[10%] '>{price}</h1>
      <h1 class='w-[17%] '>{shipping_limit_date}</h1>
  </div>

  )
}

export default OrderItem
