"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";
import { postAPI } from "@/services/fetchAPI";
import { useBookStore } from "@/utils/store";

export default function BookActions({ book }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { setEditingBook } = useBookStore();

  const handleEdit = () => {
    setEditingBook(book);
    router.push(`/api/books/edit-book/${book.id}`);
  };

  const handleView = () => {
    router.push(`/books/${book.id}`);
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
    <div className="flex space-x-2 w-full">
      <Button
        size="sm"
        className="bg-black text-white hover:bg-gray-700 cursor-pointer flex-1 dark:bg-white dark:hover:bg-gray-200 dark:text-black"
        onClick={handleView}
      >
        <Eye className="h-4 w-4 mr-1" />
        Detay
      </Button>

      <Button
        size="sm"
        className="bg-black text-white hover:bg-gray-700 cursor-pointer flex-1 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={handleEdit}
      >
        <Pencil className="h-4 w-4 mr-1" />
        Düzenle
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="cursor-pointer flex-1 bg-red-500 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Sil
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
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Siliniyor..." : "Evet, sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
