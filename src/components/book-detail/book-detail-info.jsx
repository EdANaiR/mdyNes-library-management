"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Separator } from "src/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/alert-dialog";
import { postAPI } from "@/services/fetchAPI";
import { useBookStore } from "@/utils/store";

function CompactBookActions({ book }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { setEditingBook } = useBookStore();

  const handleEdit = () => {
    setEditingBook(book);
    router.push(`/api/books/edit-book/${book.id}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await postAPI(`/api/books/${book.id}`, {}, "DELETE");
      router.refresh();
    } catch (error) {
      console.error("Kitap silinirken hata oluştu:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex space-x-1">
      <Button
        size="icon"
        variant="ghost"
        className=" cursor-pointer h-10 w-10"
        onClick={handleEdit}
      >
        <Pencil className=" h-6 w-6" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-100"
          >
            <Trash2 className="h-6 w-6" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Kitabı silmek istediğinize emin misiniz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Bu kitap kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              İptal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-700 cursor-pointer"
            >
              {isDeleting ? "Siliniyor..." : "Evet, sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function BookDetailInfo({ book }) {
  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <h2 className="text-xl text-muted-foreground">{book.author}</h2>
        </div>

        <CompactBookActions book={book} />
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Kategori
          </h3>
          <p>{book.category}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Yayın Yılı
          </h3>
          <p>{book.publishYear}</p>
        </div>
        {book.price && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Fiyat</h3>
            <p>
              {book.price} {book.currency || "TRY"}
            </p>
          </div>
        )}
        {book.storeName && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Satış Noktası
            </h3>
            <p>{book.storeName}</p>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Açıklama</h3>
        <p className="text-muted-foreground">
          {book.description || "Bu kitap için açıklama bulunmamaktadır."}
        </p>
      </div>

      {book.salesUrl && (
        <div className="pt-4">
          <Button asChild>
            <a href={book.salesUrl} target="_blank" rel="noopener noreferrer">
              Satın Al
              <ExternalLink className=" text-blue-700 h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
