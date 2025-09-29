"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <Link href="/profile">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Tentang Aplikasi</h1>
      </div>
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-2xl">Klasifikasi Sampah Cerdas</CardTitle>
          <CardDescription>
            Memanfaatkan Machine Learning untuk Daur Ulang yang Lebih Baik
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Aplikasi ini adalah proyek Ujian Akhir Semester yang
            mengintegrasikan teknologi <em>machine learning</em> untuk
            merevolusi cara kita melihat sampah. Dengan model klasifikasi
            canggih, kami membantu Anda mengidentifikasi dan memilah sampah
            secara otomatis, mengubahnya dari sekadar limbah menjadi sumber daya
            berharga.
          </p>
          <p className="font-semibold">
            Terima kasih telah menjadi bagian dari perjalanan akademis dan
            inovasi kami!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
