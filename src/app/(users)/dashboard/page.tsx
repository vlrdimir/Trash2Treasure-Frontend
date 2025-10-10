import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScanLine, Recycle, Bot, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import NewsCarousel from "@/components/blog/NewsCarousel";
import { FooterNav } from "@/components/footer-nav";
import auth from "@/middleware";
import Image from "next/image";

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

      <main className="space-y-6 p-4">
        <Card className="bg-card border-border overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary mb-4 rounded-full p-3">
                <ScanLine className="text-primary-foreground h-8 w-8" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">
                Siap untuk Berkreasi?
              </h2>
              <p className="text-muted-foreground mb-4">
                Pindai sampah di sekitar Anda dan temukan potensi kerajinan di
                dalamnya.
              </p>
              <Button className="bg-foreground text-background hover:bg-foreground/90 w-full">
                Pindai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

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
