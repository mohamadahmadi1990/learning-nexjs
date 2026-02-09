"use client";
import { createContext, useContext, useEffect, useState } from "react";

type TContext = {
  cartItems: TCartItems[]
  increaseProductQty: (id: number) => void
  decreaseProductQty: (id: number) => void
  removeProduct : (id: number) => void
  getItemQty: (id: number) => number
  cartTotalQty : number
}

export type TCartItems = {
  id: number
  qty: number
}

type IContextProvider = {
  children: React.ReactNode;
}

const ShoppingCartContext = createContext({} as TContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartContextProvider({ children }: IContextProvider) {
  const [cartItems, setCartItems] = useState<TCartItems[]>([]);
  

  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };

  const cartTotalQty = cartItems.reduce((totalQty, item)=>{
        return totalQty + item.qty
    }, 0)


  const increaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      const isNotProductExist = currentItems.find((item) => item.id == id) == null;

      if (isNotProductExist) {
        return [...cartItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

const decreaseProductQty = (id: number) => {
  setCartItems((currentItems) => {
    const item = currentItems.find(item => item.id === id)

    if (!item) return currentItems

    if (item.qty === 1) {
      return currentItems.filter(item => item.id !== id)
    }

    return currentItems.map(item =>
      item.id === id
        ? { ...item, qty: item.qty - 1 }
        : item
    )
  })
}

const removeProduct = (id : number) =>{
    setCartItems(currentItems =>{
        return currentItems.filter(item => item.id !== id)
    })
}

//Local Storage
//Read Data First
useEffect(() => {
  const storedCartItems = localStorage.getItem("cartItems")

  if(storedCartItems){
    setCartItems(JSON.parse(storedCartItems))
  }
}, [])

//Set Data After that
useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}, [cartItems])



  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, increaseProductQty, getItemQty, decreaseProductQty, cartTotalQty, removeProduct }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
