"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Recycle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/hooks/useDashboard";

function HistoryItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-5 w-5" />
    </div>
  );
}

function ContributionItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 p-4 text-center">
      <Bot className="h-10 w-10" />
      <p className="font-semibold">Belum Ada Riwayat</p>
      <p className="text-sm">
        Mulai pindai sampah untuk melihat riwayat Anda di sini.
      </p>
    </div>
  );
}

interface HistoryItemProps {
  title: string;
  createdAt: string;
}

function HistoryItem({ title, createdAt }: HistoryItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-muted rounded-full p-2">
          <Recycle className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold capitalize">{title}</p>
          <p className="text-muted-foreground text-sm">
            {new Date(createdAt).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
      <ArrowRight className="text-muted-foreground h-5 w-5" />
    </div>
  );
}

function Provider({ token }: { token: string }) {
  const { data, isLoading, error } = useDashboard({ token });

  if (error) {
    return (
      <div className="col-span-full text-center text-red-500">
        Gagal memuat data dashboard.
      </div>
    );
  }

  return (
    <>
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="h-6 w-6" />
            Riwayat Pindai Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <HistoryItemSkeleton />
              <HistoryItemSkeleton />
            </div>
          ) : data?.result.riwayatPindaiTerbaru &&
            data.result.riwayatPindaiTerbaru.length > 0 ? (
            <div className="space-y-4">
              {data.result.riwayatPindaiTerbaru.map((item) => (
                <HistoryItem
                  key={item.id}
                  title={item.title}
                  createdAt={item.created_at}
                />
              ))}
            </div>
          ) : (
            <EmptyHistory />
          )}
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
          {isLoading ? (
            <>
              <ContributionItemSkeleton />
              <ContributionItemSkeleton />
              <ContributionItemSkeleton />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Sampah Dipindai</p>
                <p className="text-lg font-bold">
                  {data?.result.kontribusiLingkungan.totalSampahDipindai}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Jenis Paling Umum</p>
                <p className="text-lg font-bold capitalize">
                  {data?.result.kontribusiLingkungan.jenisPalingUmum}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Potensi Daur Ulang</p>
                <p className="text-lg font-bold text-green-500">
                  {data?.result.kontribusiLingkungan.potensiDaurUlang}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Provider;
