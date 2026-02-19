import Container from "@/components/Container";
import SingleProduct from "@/components/SingleProduct";
import { dbConnect } from "@/lib/dbConnectCompass";
import Product from "@/models/Product";
import { notFound } from "next/navigation";


interface IProps {
  params: Promise<{ category: string; id: string }>;
}

async function ProductPage({ params}: IProps) {
  
  const { id } = await params;

  await dbConnect();

  // 1. Fetch the product by ID
  // We use .lean() to get a plain JavaScript object
  const product = await Product.findById(id).lean();

  // 2. Handle "Product Not Found"
  if (!product) {
    notFound(); // This triggers your not-found.tsx page
  }

  return (
      <Container>
        <SingleProduct {...product} />
    </Container>
  );
}

export default ProductPage;