"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { postAPI } from "../../services/fetchAPI";
import { useBookStore } from "@/utils/store";

const bookSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  author: z.string().min(1, "Yazar zorunludur"),
  category: z.string().min(1, "Kategori zorunludur"),
  publishYear: z.coerce
    .number()
    .int()
    .min(1000, "Geçerli bir yayın yılı girin"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  currency: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  storeName: z.string().optional(),
  salesUrl: z.string().url().optional().or(z.literal("")),
});

export default function BookForm({ initialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { editingBook, clearEditingBook } = useBookStore();

  const bookData = initialData || editingBook;

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: bookData?.title || "",
      author: bookData?.author || "",
      category: bookData?.category || "",
      publishYear: bookData?.publishYear || new Date().getFullYear(),
      description: bookData?.description || "",
      price: bookData?.price || undefined,
      currency: bookData?.currency || "TRY",
      coverImage: bookData?.coverImage || "",
      storeName: bookData?.storeName || "",
      salesUrl: bookData?.salesUrl || "",
    },
  });

  useEffect(() => {
    return () => {
      clearEditingBook();
    };
  }, [clearEditingBook]);

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      if (bookData?.id) {
        await postAPI(`/api/books/${bookData.id}`, values, "PUT");
      } else {
        // Yeni kitap ekleme
        await postAPI("/api/books", values);
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kitap Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Kitap adını girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yazar</FormLabel>
                <FormControl>
                  <Input placeholder="Yazar adını girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Input placeholder="Kategori girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yayın Yılı</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiyat</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Fiyat girin (opsiyonel)"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number.parseFloat(e.target.value)
                        : undefined;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Para Birimi</FormLabel>
                <FormControl>
                  <Input placeholder="TRY, USD, EUR vb." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Kapak Resmi URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kapak resmi URL'i (opsiyonel)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Kitap kapağının resim URL'ini girin
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satış Noktası</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Satış noktası adı (opsiyonel)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salesUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satış URL</FormLabel>
                <FormControl>
                  <Input placeholder="Satış URL'i (opsiyonel)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Açıklama</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Kitap açıklaması (opsiyonel)"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            className="cursor-pointer"
            variant="outline"
            onClick={() => router.back()}
          >
            İptal
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Kaydediliyor..."
              : bookData?.id
              ? "Güncelle"
              : "Kaydet"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
