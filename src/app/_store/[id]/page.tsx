// import Container from "@/components/Container";
// import { IGetProduct } from "../page";
// import AddToCart from "@/components/AddToCart";

// export interface IProps {
//   params: Promise<{ id : string }>;
//   searchParams: Promise<{}>;
// }

// async function ProductPage({ params }: IProps) {
//   const { id } = await params;
//   // console.log(await params)

//   const result = await fetch(`http://localhost:8000/Products/${id}`);
//   const data = (await result.json()) as IGetProduct;

//   return (
//     <Container>
//       <div className="shadow mt-5 grid grid-cols-12">
//         <div className="col-span-3 bg-amber-200">
//           <img src={data.image} className="h-50 mx-auto p-3"></img>
//         </div>
//         <div className="col-span-9 p-4">
//             <h1 className="font-black py-5">{data.title}</h1>
//             <p className="w-200">{data.description}</p>
//             <h3 className="font-bold text-xl mt-4">${data.price}</h3>
//             <AddToCart id={id} />
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default ProductPage;
