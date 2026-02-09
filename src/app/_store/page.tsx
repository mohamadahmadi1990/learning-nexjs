// import Container from "@/components/Container";
// import Pagination from "@/components/Pagination";
// import ProductItem from "@/components/ProductItem";
// import Link from "next/link";

// export interface IGetProduct {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

// export interface IProductItemList{
  
//   first: number | null,
//   prev: number | null,
//   next: number | null,
//   last: number | null,
//   pages: number,
//   items: number | null,
//   data: IGetProduct[]
// }

// interface IStoreProps{
//   params: Promise<{id : string}>;
//   searchParams: Promise<{page : string, per_page : string}>
// }


// async function Store({params} : IStoreProps) {

//   const { id } = await params
  
//   const result = await fetch(`http://localhost:8000/products/${id}`)
//   const data = await result.json() as IProductItemList

//   return (
//     <Container>
//       <h1 className="mt-10">Store page</h1>
//       <div className="grid grid-cols-4 gap-3 mt-5">
//       {
//         data.data.map((item)=>(
//           <Link key={item.id} href={`/store/${item.id}`}>
//             <ProductItem {...item}  />
//           </Link>
//         ))
//       }
//       </div>
//       <div>
//           <Pagination pageCount={data.pages} />
//       </div>
//     </Container>

    
//   );
// }

// export default Store;
