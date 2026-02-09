import FetchDataServer from "@/components/ui/FetchDataServer"
import Link from "next/link"

export interface IPostFetchServer{
    id : number,
    title : string,
    price : number,
}


export default async function getData(){

    const response = await fetch("https://fakestoreapi.com/products")
    const data : IPostFetchServer[] = await response.json()

    return(
        <div>
            {
                data.map((item, index)=> (
                    <Link href={`/learning/ssg/${item.id}`}  key={index}>
                        <FetchDataServer {...item} />
                    </Link>
                ))
            }
        </div>
    )
}