import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import auth from "@/middleware";
import { UploadForm } from "@/components/scan/upload-form";
import { FooterNav } from "@/components/footer-nav";

export default async function Page() {
  const sessions = await auth();
  const tokenId = sessions!.tokenId;
  return (
    <div className="bg-background fixed inset-0 z-10 overflow-hidden">
      <div className="relative mx-auto flex h-full max-w-md flex-col p-4">
        <div className="mb-4 flex items-center gap-4">
          <Link href="/scan">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Unggah Gambar</h1>
        </div>
        <UploadForm token={tokenId} />
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        <FooterNav />
      </div>
    </div>
  );
}
