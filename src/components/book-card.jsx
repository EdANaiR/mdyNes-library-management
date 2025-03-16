import { Badge } from "./ui/badge";
import BookActions from "./book-actions";

export default function BookCard({ book }) {
  return (
    <div className="relative group w-full h-96 rounded-2xl overflow-hidden bg-gray-200">
      <img
        src={book.coverImage || `/placeholder.svg?height=256&width=384`}
        alt={book.title}
        className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-110"
      />

      {book.category && (
        <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white">
          {book.category}
        </Badge>
      )}

      <div className="absolute bottom-0 left-0 w-full bg-opacity-50 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
        <BookActions book={book} />
      </div>
    </div>
  );
}
