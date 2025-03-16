"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AddBookButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/add-book")}
      className=" cursor-pointer bg-primary hover:bg-primary/90"
    >
      <Plus className="h-4 w-4 mr-2" />
      Kitap Ekle
    </Button>
  );
}
