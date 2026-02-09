import { NextResponse } from "next/server"


/////////// GET /////////// 
const DATA_SOURCE_URL = "http://localhost:8000/todos"

export async function GET(request: Request, context: {params: Promise<{ id: string }>} ) {

  const { id } = await context.params

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`)

  if (!res.ok) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: res.status }
    )
  }

  const data = await res.json()

  return NextResponse.json(data)
}

/////////// DELETE /////////// 
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {

  const { id } = await context.params;

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: res.status }
    );
  }

  return NextResponse.json({ message: "Deleted successfully" });
}

/////////// PUT ///////////
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  
  const { id } = await context.params;

  try {
    const body = await request.json();

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to update task" },
        { status: res.status }
      );
    }

    const updatedTask = await res.json();

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
