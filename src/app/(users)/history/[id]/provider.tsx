"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CalendarDays, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useHistoryDetailQuery } from "@/hooks/use-history-queries";
import { craftSuggestions } from "@/lib/utils";

export default function ProviderWrapper({
  token,
  slugId,
}: {
  token: string;
  slugId: string;
}) {
  const {
    data: historyDetail,
    isLoading,
    isError,
  } = useHistoryDetailQuery(parseInt(slugId, 10), token);

  if (isLoading) {
    return (
      <div className="h-full w-full animate-pulse">
        {/* Image Section Skeleton */}
        <div className="relative h-64 w-full bg-gray-300">
          <div className="absolute top-4 left-4 z-10">
            <div className="h-10 w-10 rounded-md bg-gray-400"></div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="h-9 w-32 rounded bg-gray-400"></div>
            <div className="mt-2 h-7 w-48 rounded bg-gray-400"></div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-400"></div>
              <div className="h-4 w-24 rounded bg-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Probabilities Card Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-48 rounded bg-gray-300"></div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-5 w-24 rounded bg-gray-300"></div>
                  <div className="h-5 w-16 rounded bg-gray-300"></div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Craft Suggestion Card Skeleton */}
          <Card className="mt-4">
            <CardHeader>
              <div className="h-6 w-56 rounded bg-gray-300"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-5/6 rounded bg-gray-300"></div>
              </div>
              <div className="mt-4 h-10 w-full rounded-md bg-gray-300"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !historyDetail?.result) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">
          Gagal memuat detail riwayat.
        </p>
        <Link href="/history">
          <Button variant="outline">Kembali ke Riwayat</Button>
        </Link>
      </div>
    );
  }

  const { result } = historyDetail;

  // Format tanggal agar lebih mudah dibaca
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(result.createdAt));

  const imageUrl = `${process.env.NEXT_PUBLIC_R2_URL}/${result.imageUrl}`;
  // Urutkan probabilitas dari yang tertinggi
  const sortedProbs = Object.entries(result.probabilities).sort(
    ([, a], [, b]) => b - a,
  );

  const suggestion = craftSuggestions[result.label] ?? craftSuggestions.default;

  return (
    <div className="h-full w-full">
      {/* Bagian Gambar Utama */}
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={`Gambar ${result.label}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Link href="/history" className="absolute top-4 left-4 z-10">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold capitalize">{result.label}</h1>
          <p className="text-lg">{result.percentage}% Terdeteksi</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Kartu Probabilitas */}
        <Card>
          <CardHeader>
            <CardTitle>Tingkat Probabilitas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sortedProbs.map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {label.replace("-", " ")}
                </span>
                <span className="font-medium">{value.toFixed(2)}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Kartu Rekomendasi Kerajinan */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{suggestion?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              {suggestion?.description}
            </p>
            <Link
              href={`/chat/new?label=${result.label}&image=${encodeURIComponent(
                result.imageUrlRemoveBg,
              )}`}
              passHref
            >
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Lihat Ide Kerajinan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
