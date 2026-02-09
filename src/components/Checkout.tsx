'use client'


import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumber} from "@/utils/number";
import { IGetProduct } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface IDiscountData{ 
  id: string,
  code: string, 
  percentage: number 
}


function Checkout() {

  const [data , setData] = useState<IGetProduct[]>([])
  const {cartItems} = useShoppingCartContext()

  const [discountCode, setDiscountCode] = useState("")
  const [discountPrice, setDiscountPrice] = useState(0)

    useEffect(() => {

    axios(`https://fakestoreapi.com/products`).then(result =>{
      const { data } = result
      setData(data)
    })

  }, [])

  //Update Discount Amount in case of CartItem changes
    useEffect(() => {
    setDiscountPrice(0)
  }, [cartItems])
  



  //Total Price Function
  let totalPrice = formatNumber(
      cartItems.reduce((total, item)=>{

      let selectedProduct = data.find((product)=> product.id == item.id)

      return total + (selectedProduct?.price || 0) * item.qty
      }, 0))


  //Handel Discount on Click Apply
  const handleDiscount = () => {
    axios(`http://localhost:8000/discounts?code=${discountCode}`)
      .then((result) => {
        const data = result.data as IDiscountData[];

        // Guard clause: do nothing if no discount found
        if (!Array.isArray(data) || data.length === 0) {setDiscountPrice(0)}

        const discountPrice = (totalPrice * data[0].percentage) / 100;

        setDiscountPrice(discountPrice);
      })
      .catch(() => {
        // optional: silence is golden
      });
  };


  return (
    <div className="shadow w-100 p-4 ">
      <h1 className="font-black py-2 h-20 line-clamp-2">Items</h1>

      <h3 className="py-5 font-bold">item number 1</h3>
      <label>Coupon</label>
      
      <input
        type="text"
        onChange={(e) => setDiscountCode(e.target.value.trim())}
        className="p-1 mx-2 border w-50"
        placeholder="your discount code"
      />

      <button
        className={`px-2 py-1 text-white ${
          discountCode ? "bg-amber-500" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!discountCode}
        onClick={handleDiscount}
      >
        Apply
      </button>
      <p className="mt-4 italic">Discount Price : {formatNumber(discountPrice)}</p>
      <h3 className="py-5 font-bold">Total Prise : $
        {discountPrice <= 0 ? totalPrice : formatNumber(totalPrice - discountPrice)}
        </h3>
    </div>
  );
}

export default Checkout;
