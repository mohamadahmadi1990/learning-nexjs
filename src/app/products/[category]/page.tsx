import Link from "next/link";

import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import { IProduct } from "../page";
import CategoryMenu from "@/components/CategoryMenu";


interface IProps {
  params: { category: string };
}

export default async function Categories({ params }: IProps) {
  const { category } = await params;


  const res = await fetch(`http://localhost:8000/products?category=${category}`, {
    cache: "no-store",
  });

  const product: IProduct[] = await res.json();

  return (
    <Container>
      <CategoryMenu />
      <div className="grid grid-cols-4 gap-3 mt-5">
      {
        product.map((item)=>(
          <Link key={item.id} href={`/products/${category}/${item.id}`}>
            <ProductItem {...item}  />
          </Link>
        ))
      }
      </div>
    </Container>
  );
}
