import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnectCompass";
import Todo from "@/models/Todo";

export async function GET() {
  try {
    await dbConnect();
    const todos = await Todo.find({});
    return NextResponse.json(todos);
  } catch (err) {
    console.error("GET /api/todos error:", err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTodo = await Todo.create({ title, description });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    console.error("POST /api/todos error:", err);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
