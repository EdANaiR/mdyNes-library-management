import BookForm from "../../components/book-form";

export default function AddBookPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Yeni Kitap Ekle</h1>
      <div className="max-w-2xl mx-auto">
        <BookForm />
      </div>
    </div>
  );
}
