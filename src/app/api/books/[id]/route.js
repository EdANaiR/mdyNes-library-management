import { NextResponse } from "next/server";
import {
  getDataByUnique,
  updateDataByAny,
  deleteDataByAny,
} from "/services/serviceOperations/index";

export async function GET(request, { params }) {
  try {
    const book = await getDataByUnique("Book", { id: params.id });

    if (!book) {
      return NextResponse.json({ error: "Kitap bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Kitap getirilirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Kitap getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    const book = await updateDataByAny(
      "Book",
      { id: params.id },
      {
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
      }
    );

    return NextResponse.json(book);
  } catch (error) {
    console.error("Kitap güncellenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Kitap güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteDataByAny("Book", { id: params.id });

    return NextResponse.json({ message: "Kitap başarıyla silindi" });
  } catch (error) {
    console.error("Kitap silinirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Kitap silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
