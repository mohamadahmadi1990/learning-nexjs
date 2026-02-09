import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    // This forces an actual round-trip to MongoDB
    await client.db().admin().ping();

    return NextResponse.json({ message: "MongoDB connected successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "MongoDB connection failed" },
      { status: 500 }
    );
  }
}
