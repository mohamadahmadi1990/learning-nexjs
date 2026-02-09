

export async function GET() {
  try {
    const res = await fetch("http://localhost:8000/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    return Response.json(products, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something is wrong!" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {

  try {
    const newProduct = await request.json();
    const res = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something is wrong!" }),
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();

    if (!updatedProduct.id) {
      return Response.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://localhost:8000/products/${updatedProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    const data = await res.json();

    return Response.json(data, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something is wrong!" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { message: "Product id is required for DELETE" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://localhost:8000/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something is wrong!" },
      { status: 500 }
    );
  }
}

