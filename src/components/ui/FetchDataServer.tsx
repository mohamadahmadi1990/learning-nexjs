import { IPostFetchServer } from "@/app/learning/ssg/page"
import Container from "../Container"



function FetchDataServer({title, price} : IPostFetchServer) {
  return (
    <Container>
    <div className="p-4 gap-2 bg-amber-300 mb-8">
        <h1>{title}</h1>
        <p>{price}</p>
    </div>
    </Container>
  )
}

export default FetchDataServer