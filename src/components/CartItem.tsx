"use client";
import { TCartItems } from "@/context/ShoppingCartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { IGetProduct } from "@/utils/types";
import Image from "next/image";

function CartItem({ id }: TCartItems) {
  const [productData, setProductData] = useState({} as IGetProduct);

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/${id}`).then((result) => {
      const { data } = result;
      setProductData(data);
    });
  }, [id]);

  return (
    <div className="flex justify-between mt-5">
      <div className="shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-black w-70 line-clamp-1">{productData.title}</h1>
          {productData.image && (
            <Image
              src={productData.image}
              alt={productData.title}
              className="h-10 w-20 object-contain"
              width={0}
              height={0}
              sizes="auto"
            />
          )}
        </div>

        <div>
          <AddToCart id={id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
