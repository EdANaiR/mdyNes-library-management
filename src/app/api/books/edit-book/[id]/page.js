import BookForm from "src/components/book-form";
import { getAPI } from "@/services/fetchAPI";

export const dynamic = "force-dynamic";

export default async function EditBookPage({ params }) {
  const book = await getBook(params.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Kitap Düzenle</h1>
      <div className="max-w-2xl mx-auto">
        <BookForm initialData={book} />
      </div>
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
