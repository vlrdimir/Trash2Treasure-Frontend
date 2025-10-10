import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Recycle, Bot, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import NewsCarousel from "@/components/blog/NewsCarousel";
import { FooterNav } from "@/components/footer-nav";
import auth from "@/middleware";
import Image from "next/image";
import CardScan from "./components/card-scan";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for waste classification project",
};

export default async function Page() {
  const session = await auth();

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const latestPosts = posts.slice(0, 5);

  return (
    <>
      <header className="border-border bg-background/80 sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur-lg">
        <div>
          <p className="text-muted-foreground">Selamat Datang,</p>
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
        </div>
        <div className="bg-muted h-12 w-12 rounded-full">
          <Image
            src={session?.user?.image ?? ""}
            alt="User"
            width={48}
            height={48}
          />
        </div>
      </header>

      <main className="mb-20 space-y-6 p-4">
        <CardScan />

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Newspaper className="h-6 w-6" />
              Berita & Inspirasi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NewsCarousel posts={latestPosts} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Bot className="h-6 w-6" />
              Riwayat Pindai Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Recycle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Botol Plastik</p>
                  <p className="text-muted-foreground text-sm">
                    Hari ini, 09:12
                  </p>
                </div>
              </div>
              <ArrowRight className="text-muted-foreground h-5 w-5" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Recycle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Kaleng Aluminium</p>
                  <p className="text-muted-foreground text-sm">
                    Kemarin, 15:30
                  </p>
                </div>
              </div>
              <ArrowRight className="text-muted-foreground h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Recycle className="h-6 w-6" />
              Kontribusi Lingkungan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Total Sampah Dipindai</p>
              <p className="text-lg font-bold">142 Item</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Jenis Paling Umum</p>
              <p className="text-lg font-bold">Plastik</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Potensi Daur Ulang</p>
              <p className="text-lg font-bold text-green-500">Tinggi</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        <FooterNav />
      </div>
    </>
  );
}
