import { getAPI } from "@/services/fetchAPI";
import { BookOpen } from "lucide-react";
import BookCard from "./book-card";
import AddBookButton from "./add-book-button";

export const dynamic = "force-dynamic";

export default async function BookList() {
  const books = await getBooks();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">
            Kütüphane Kataloğu
          </h2>
        </div>
        <AddBookButton />
      </div>

      {!books || books.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg border-2 border-dashed">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/60" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Henüz kitap eklenmemiş
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            İlk kitabı eklemek için "Kitap Ekle" butonuna tıklayın
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Toplam{" "}
              <span className="font-medium text-foreground">
                {books.length}
              </span>{" "}
              kitap bulundu
            </p>
            {/* Buraya filtreleme/sıralama eklenebilir */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

async function getBooks() {
  try {
    const data = await getAPI("/api/books");
    return data || [];
  } catch (error) {
    console.error("Kitaplar getirilirken hata oluştu:", error);
    return [];
  }
}
