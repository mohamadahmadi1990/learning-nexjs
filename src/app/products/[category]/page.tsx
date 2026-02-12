import Link from "next/link";
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import CategoryMenu from "@/components/CategoryMenu";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

interface IProps {
  // On this specific route, we only care about the category param
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: IProps) {
  const { category } = await params;
  
  // URL categories like "men%27s%20clothing" need to be decoded 
  // to match the database string "men's clothing"
  const decodedCategory = decodeURIComponent(category);

  await dbConnect();

  // 1. Use .find() with a filter object to get an array of products
  const products = await Product.find({ category: decodedCategory }).lean();

  // 2. Logic Check: .find() returns an empty array [] if nothing is found.
  // We check the length instead of just !products.
  if (!products || products.length === 0) {
    // You can either show a "No products found" message or use notFound()
    return (
      <Container>
        <div className="mt-10 text-center text-gray-500">
          No products found in the `{decodedCategory}` category.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* <h1 className="mt-6 text-2xl font-bold capitalize">{decodedCategory}</h1> */}
      <CategoryMenu />
      <div className="grid grid-cols-4 gap-3 mt-5">
        {products.map((item: IProduct) => (
          <Link
            key={item._id.toString()}
            href={`/products/${category}/${item._id}`}
          >
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}