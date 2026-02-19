import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnectCompass";
import Product from "@/models/Product";
import mongoose from "mongoose";

interface IProps {
  params: Promise<{ category: string; id: string }>;
}

export async function GET(request: Request, { params }: IProps) {

  try {
    await dbConnect();

    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).lean();

    console.log("FOUND PRODUCT:", product);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
