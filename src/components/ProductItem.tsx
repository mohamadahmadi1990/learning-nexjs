import { IProduct } from "@/app/products/page";
import Image from "next/image";

function ProductItem({title,price,description,image}: IProduct) {
  return (
    <div className="shadow p-4 hover:scale-102 transition-all duration-300 ease-in-out hover:bg-blue-50 ">
      <Image src={image} alt={title} className="h-30 w-auto object-contain" width={0} height={0} sizes="auto"  />
      <h1 className="font-black py-2 h-20 line-clamp-2">{title}</h1>
      <p className="line-clamp-2 mask-b-from-1 h-20">{description}</p>
      <h3 className="py-5 font-bold">${price}</h3>
    </div>
  );
}

export default ProductItem;
