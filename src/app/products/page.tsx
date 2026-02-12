import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Link from "next/link";
import { dbConnect } from "@/lib/mongoose"; // Import your DB logic
import Product from "@/models/Product";     // Import your Model
import CategoryMenu from "@/components/CategoryMenu";

export default async function ProductsPage() {
  // 1. Connect and Fetch directly (No fetch() needed!)
  await dbConnect();
  const products = await Product.find({}).lean(); // .lean() makes it a plain JS object

  return (
    <Container>
      <CategoryMenu />
      <div className="grid grid-cols-4 gap-3 mt-5">
        {products.map((item: IProduct) => (
          <Link key={item._id.toString()} href={`/products/${encodeURIComponent(item.category)}/${item._id}`}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}