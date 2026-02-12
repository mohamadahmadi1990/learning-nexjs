import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/mongoose";
import Product from "@/models/Product";
import data from "@/database/products.json"; // move your JSON into /data folder

export async function POST() {
  try {
    await dbConnect();

    await Product.deleteMany(); // optional wipe

    await Product.insertMany(data.products);

    return NextResponse.json({ message: "Products imported successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
