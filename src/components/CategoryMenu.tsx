import { Button } from "./ui/button";
import Link from "next/link";
import { dbConnect } from "@/lib/dbConnectCompass";
import Product from "@/models/Product";

export default async function CategoryMenu() {
  // 1. Connect to the database
  await dbConnect();

  // 2. Use MongoDB's .distinct() to get only unique category names
  // This is much faster than downloading all products and filtering them in JS
  const categories: string[] = await Product.distinct("category");

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-10 mb-10">
      {/* Add an "All" button to go back to the main list */}
      <Link href="/products">
        <Button className="cursor-pointer" variant="outline">
          All Products
        </Button>
      </Link>

      {categories.map((category) => (
        <Link 
          href={`/products/${encodeURIComponent(category)}`} 
          key={category}
        >
          <Button 
            className="cursor-pointer hover:bg-gray-300 capitalize" 
            variant="secondary"
          >
            {category}
          </Button>
        </Link>
      ))}
    </div>
  );
}