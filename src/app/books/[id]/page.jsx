import Image from "next/image";
import Link from "next/link";

import { getAPI } from "@/services/fetchAPI";
import { Button } from "src/components/ui/button";
import BookDetailHeader from "src/components/book-detail/book-detail-header";
import BookDetailImage from "src/components/book-detail/book-detail-image";
import BookDetailInfo from "src/components/book-detail/book-detail-info";
import RelatedBooks from "src/components/book-detail/related-books";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }) {
  const book = await getBook(params.id);
  const relatedBooks = await getRelatedBooks(book?.category, book?.id);

  if (!book) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Kitap bulunamadı</h1>
        <Button asChild>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BookDetailHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <BookDetailImage book={book} />
        <BookDetailInfo book={book} />
      </div>

      <RelatedBooks books={relatedBooks} />
    </div>
  );
}

async function getBook(id) {
  try {
    return await getAPI(`/api/books/${id}`);
  } catch (error) {
    console.error("Kitap getirilirken hata oluştu:", error);
    return null;
  }
}

async function getRelatedBooks(category, currentBookId) {
  try {
    if (!category) return [];

    const allBooks = await getAPI("/api/books");

    // Aynı kategorideki diğer kitapları filtreler
    return allBooks
      .filter((book) => book.category === category && book.id !== currentBookId)
      .slice(0, 6);
  } catch (error) {
    console.error("Benzer kitaplar getirilirken hata oluştu:", error);
    return [];
  }
}
