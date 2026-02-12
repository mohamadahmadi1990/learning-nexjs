import AddToCart from "./AddToCart";
import Image from "next/image";

function SingleProduct({title, description, price, id, image}:IProduct) {
  return (
    <div className="shadow mt-5 grid grid-cols-12 items-center">
      <div className="col-span-3">
        <Image src={image} alt={title} className="h-30 w-auto object-contain" width={0} height={0} sizes="auto"  />
      </div>
      <div className="col-span-9 p-4">
        <h1 className="font-black py-5">{title}</h1>
        <p className="w-200">{description}</p>
        <h3 className="font-bold text-xl mt-4">${price}</h3>
        <AddToCart id={id.toString()} />
      </div>
    </div>
  );
}

export default SingleProduct;
