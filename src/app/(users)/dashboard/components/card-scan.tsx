"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <Card className="bg-card border-border overflow-hidden shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary mb-4 rounded-full p-3">
            <ScanLine className="text-primary-foreground h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Siap untuk Berkreasi?</h2>
          <p className="text-muted-foreground mb-4">
            Pindai sampah di sekitar Anda dan temukan potensi kerajinan di
            dalamnya.
          </p>
          <Button
            onClick={() => router.push("/scan")}
            className="bg-foreground text-background hover:bg-foreground/90 w-full"
          >
            Pindai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Page;
