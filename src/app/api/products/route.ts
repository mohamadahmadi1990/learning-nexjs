import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnectCompass";
import Product from "@/models/Product";


export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

