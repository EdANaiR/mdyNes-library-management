import { Suspense } from "react";
import BookList from "../components/book-list";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Suspense
          fallback={<div className="text-center">Kitaplar yükleniyor...</div>}
        >
          <BookList />
        </Suspense>
      </div>
    </main>
  );
}
