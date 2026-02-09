import CategoryMenu from "@/components/CategoryMenu"
import Container from "@/components/Container"
import ProductItem from "@/components/ProductItem"
import Link from "next/link"


export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default async function CategoriesPage() {

  const res = await fetch("http://localhost:8000/products", {
    cache: "no-store",
  })

  const products: IProduct[] = await res.json()
 
  return (
    <Container>
    <div>
      <h1 className="font-black italic mb-5">Categories</h1>
      <CategoryMenu />
      <div className="grid grid-cols-4 gap-3 mt-5">
      {
        products.map((item)=>(
          <Link key={item.id} href={`/products/${encodeURIComponent(item.category)}/${item.id}`}>
            <ProductItem {...item}  />
          </Link>
        ))
      }
      </div>
    </div>

    </Container>
  )
}
