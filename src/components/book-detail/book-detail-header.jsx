import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "src/components/ui/button";

export default function BookDetailHeader() {
  return (
    <Button asChild variant="outline" className="mb-6">
      <Link href="/">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kitap Listesine Dön
      </Link>
    </Button>
  );
}
