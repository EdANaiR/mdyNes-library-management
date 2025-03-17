"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, Menu, X, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-amber-500" />
            <span className="font-bold text-lg">KitapYuva</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Kategoriler
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Yazarlar
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Hakkımızda
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Ara"
            >
              <Search className=" h-5 w-5" />
            </button>

            <button
              className=" cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
              onClick={toggleTheme}
              suppressHydrationWarning
              aria-label={
                mounted && theme === "dark" ? "Açık tema" : "Koyu tema"
              }
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <span className="h-5 w-5" />
              )}
            </button>

            <button
              className="p-2 md:hidden rounded-full hover:bg-muted transition-colors"
              onClick={toggleMenu}
              aria-label="Menü"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="px-2 py-1 rounded hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/categories"
                className="px-2 py-1 rounded hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kategoriler
              </Link>
              <Link
                href="/authors"
                className="px-2 py-1 rounded hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Yazarlar
              </Link>
              <Link
                href="/about"
                className="px-2 py-1 rounded hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
