'use client'

import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import Container from "@/components/Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";


function Cart() {

  const {cartItems, cartTotalQty} = useShoppingCartContext()

  return (
    <Container>
      <div className="flex justify-between mt-10">
        <div>
          {
            cartTotalQty > 0 ? <h1>Your Shopping Cart</h1> : <h1>Your Shopping Cart is empty</h1>
          }
          
          {
            cartItems.map(item=>(
              <CartItem {...item} key={item.id} />
            ))
          }

        </div>

        <div>
          <Checkout />
        </div>
      </div>
    </Container>
  );
}

export default Cart;
