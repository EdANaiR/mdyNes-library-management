import { create } from "zustand";

export const useBookStore = create((set) => ({
  editingBook: null,
  setEditingBook: (book) => set({ editingBook: book }),
  clearEditingBook: () => set({ editingBook: null }),
}));
