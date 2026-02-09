import Container from "@/components/Container";
import { IProduct } from "../../page";
import SingleProduct from "@/components/SingleProduct";


interface IProps {
  params: Promise<{ id : number }>;
}


async function ProductPage({ params }: IProps) {
  const { id } = await params;


  const res = await fetch(`http://localhost:8000/products/${id}`, {
    cache: "no-store",
  });

    const product: IProduct = await res.json();

  return (
      <Container>
        <SingleProduct {...product} />
    </Container>
  );
}

export default ProductPage;
