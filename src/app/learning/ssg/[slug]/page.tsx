import { IPostFetchServer } from "../page";

interface Iprops {
  params: { slug: string };
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:8000/products");
  const products: IPostFetchServer[] = await res.json();

  return products.map((product) => (
    {slug: product.id.toString(),}
  ));
}

async function PostDetail({ params }: Iprops) {
  const res = await fetch(
    `http://localhost:8000/products?id=${params.slug}`,
    { cache: "force-cache" } // ensures static caching
  );

  const data: IPostFetchServer[] = await res.json();

  if (!data || data.length === 0) {
    return <div>There is an error</div>;
  }

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;
