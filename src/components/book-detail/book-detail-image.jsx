export default function BookDetailImage({ book }) {
  return (
    <div className="relative h-[450px] w-full md:col-span-1 rounded-lg overflow-hidden shadow-md">
      <img
        src={book.coverImage || `/placeholder.svg?height=400&width=300`}
        alt={book.title}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
