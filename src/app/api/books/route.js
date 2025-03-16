import { NextResponse } from "next/server";

import { getAllData, createNewData } from "@/services/serviceOperations/index";

export async function GET() {
  try {
    const books = await getAllData("Book");
    return NextResponse.json(books);
  } catch (error) {
    console.error("Kitaplar getirilirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Kitaplar getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const book = await createNewData("Book", {
      title: body.title,
      author: body.author,
      category: body.category,
      publishYear: body.publishYear,
      description: body.description,
      price: body.price,
      currency: body.currency,
      coverImage: body.coverImage,
      storeName: body.storeName,
      salesUrl: body.salesUrl,
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Kitap eklenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Kitap eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
