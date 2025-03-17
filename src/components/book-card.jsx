"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import BookActions from "./book-actions";

export default function BookCard({ book, size = "normal" }) {
  const router = useRouter();

  // Size değerine göre yükseklik ve diğer stil özelliklerini belirler
  const height = size === "small" ? "h-80" : "h-96";
  const isSmall = size === "small";

  const handleViewDetail = () => {
    router.push(`/books/${book.id}`);
  };

  return (
    <div
      className={`relative group w-full ${height} rounded-2xl overflow-hidden bg-gray-200`}
    >
      <div className="w-full h-full cursor-pointer" onClick={handleViewDetail}>
        <img
          src={book.coverImage || `/placeholder.svg?height=256&width=384`}
          alt={book.title}
          className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-110"
        />
      </div>

      {book.category && (
        <Badge
          className={`absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white ${
            isSmall ? "text-xs" : ""
          }`}
        >
          {book.category}
        </Badge>
      )}

      {/* Eğer small değilse BookActions'ı gösterir */}
      {!isSmall && (
        <div className="absolute bottom-0 left-0 w-full bg-opacity-50 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
          <BookActions book={book} />
        </div>
      )}
    </div>
  );
}
