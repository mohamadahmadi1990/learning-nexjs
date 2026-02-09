
import { NextResponse } from "next/server"

const DATA_SOURCE_URL = "http://localhost:8000/todos"
const API_KEY : string = process.env.DATA_API_KEY as string


export async function GET(){

    const res = await fetch(DATA_SOURCE_URL)

    const todos : Todos[] = await res.json()

    return NextResponse.json(todos)
}


export async function DELETE(request : Request){

    const { id } : Partial<Todos> = await request.json()

    if(!id) return NextResponse.json({"message": 'Id is required!'})

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'API-key' : API_KEY
        }
    })

    return NextResponse.json({"message": `Todo ${id} deleted!`})
}

export async function POST(request : Request){

    const { title, description} : Partial<Todos> = await request.json()

    if(!title) return NextResponse.json({"message": 'Title is required!'})

    const res = await fetch(DATA_SOURCE_URL, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'API-key' : API_KEY
        },
        body : JSON.stringify({
            title,
            description
        })
    })

    const newTodo : Todos = await res.json()

    return NextResponse.json(newTodo)
}

export async function PUT(request : Request){

    const { id, title, description } : Todos = await request.json()

    if(!id || !title || !description) return NextResponse.json({"message": 'Title is required!'})

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'API-key' : API_KEY
        },
        body : JSON.stringify({
            id,
            title,
            description 
        })
    })

    const updatedTodo : Todos = await res.json()

    return NextResponse.json(updatedTodo)
}