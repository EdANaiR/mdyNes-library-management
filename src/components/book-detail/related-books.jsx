import Link from "next/link";
import BookCard from "src/components/book-card";

export default function RelatedBooks({ books }) {
  if (books.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Benzer Kitaplar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard book={book} size="small" />
          </Link>
        ))}
      </div>
    </div>
  );
}
