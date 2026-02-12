import { dbConnect } from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await dbConnect(); // <--- THIS IS REQUIRED

    const body = await req.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);

    return NextResponse.json(
      { message: "Ticket Created!" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "There is an Error!", err },
      { status: 500 }
    );
  }
}