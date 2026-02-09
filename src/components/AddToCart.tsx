'use client'

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import TrashIcon from "./TrashIcon";

interface IAddToCartProps{
    id : string
}

function AddToCart({id} : IAddToCartProps) {

    const {increaseProductQty, getItemQty, decreaseProductQty, removeProduct} = useShoppingCartContext()

    const productId = parseInt(id)
    const qty = getItemQty(productId)

  return (
    <div className="flex justify-between w-50 items-center mt-5">
      <div className="flex justify-between items-center">
        {
            qty > 0 ? <div className="flex"><button className="bg-blue-500 p-3 text-white" onClick={()=> increaseProductQty(parseInt(id))}> + </button>
            <p className="p-3">{getItemQty(parseInt(id))}</p>
            <button className="bg-amber-500 p-3 text-white" onClick={()=> decreaseProductQty(parseInt(id))}> - </button>
            <button className="ml-5" onClick={()=> removeProduct(parseInt(id))}><TrashIcon /></button>
            </div>
             
            : <div>         
                <button className="bg-green-500 p-3 text-white" onClick={()=> increaseProductQty(parseInt(id))}>Add to card</button>
              </div>
        }
      </div>
    </div>
  );
}

export default AddToCart;
