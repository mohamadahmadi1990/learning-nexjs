'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import Container from "./Container"
import { useShoppingCartContext } from "@/context/ShoppingCartContext"
import { Button } from "./ui/button"
import { ShoppingCartIcon } from "lucide-react"

function Navbar() {


    const pathName = usePathname()
    const {cartTotalQty} = useShoppingCartContext()

    const navlinks = [
        {
            href : "/",
            title : "Home"
        },
        {
            href : "/products",
            title : "products"
        },
        {
            href : "/todos",
            title : "todos"
        },
        {
            href : "/ticket",
            title : "ticket"
        }
    ]
  return (
    <nav className="shadow p-4">
        <Container>
        <div className="flex justify-between">
            <div>
            {   
                
                navlinks.map((item)=>(
                    <Link className={`ml-4 ${pathName === item.href && "text-blue-500 italic"} `} key={item.href} href={item.href}>{item.title}</Link>
                ))
            }
            </div>
        <div className="flex justify-between w-30 items-center">
            
            <div><Link href={"/login"} ><Button variant={"secondary"}>Login</Button></Link></div>
            <div className="flex">
            <Link className="" href={"/cart"}><ShoppingCartIcon /></Link>
            {
                cartTotalQty > 0 && <span className="bg-red-700 text-white size-5 rounded-full text-[12px] text-center">{cartTotalQty}</span>
            }
            </div>
            
        </div>
        
        </div>
        </Container>
    </nav>
  )
}

export default Navbar