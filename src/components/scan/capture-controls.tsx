"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface CaptureControlsProps {
  onRetake: () => void;
  onUseImage: () => void;
  isPending: boolean;
}

export function CaptureControls({
  onRetake,
  onUseImage,
  isPending,
}: CaptureControlsProps) {
  return (
    <div className="absolute bottom-24 left-1/2 z-20 flex w-full -translate-x-1/2 justify-center gap-4 px-4">
      <Button onClick={onRetake} variant="outline" size="lg">
        <RefreshCcw className="mr-2 h-4 w-4" /> Ulangi
      </Button>
      <Button size="lg" onClick={onUseImage} disabled={isPending}>
        Gunakan Gambar
      </Button>
    </div>
  );
}
