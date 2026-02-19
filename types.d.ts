type Todos = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean; // optional if you plan to add a checkbox
  createdAt?: string;
};

type IProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type Ticket = {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
};

// // In app/blog/[slug]/page.tsx or layout.tsx
// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export default async function Page({ params }: PageProps) {
//   const { slug } = await params; // Await the promise to access values
//   return <h1>Blog Post: {slug}</h1>;
// }

// // In app/shop/page.tsx
// interface PageProps {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

// export default async function ShopPage({ searchParams }: PageProps) {
//   const currentSearchParams = await searchParams; // Await the promise
//   const query = currentSearchParams?.query;
//   const page = currentSearchParams?.page;
//   // ... runtime validation/conversion is needed, e.g., to convert to a number
// }
