import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/dbConnectCompass";
import Todo from "@/models/Todo";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {

  const { id } = await context.params;

  await dbConnect();

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
}


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  
  const { id } = await context.params;
  const { title, description } = await req.json();

  await dbConnect();

  const updated = await Todo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
}

