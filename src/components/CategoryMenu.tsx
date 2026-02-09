import { IProduct } from "@/app/products/page";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function CategoryMenu() {
  const res = await fetch("http://localhost:8000/products", {
    cache: "no-store",
  });

  const products: IProduct[] = await res.json();

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  return (
    <div className="flex gap-2 justify-center mt-10 mb-10">
      {categories.map((category) => (
        <Link href={`/products/${category}`} key={category}>
          <Button className="cursor-pointer hover:bg-gray-300" variant={"secondary"}>{category}</Button>
        </Link>
      ))}
    </div>
  );
}
