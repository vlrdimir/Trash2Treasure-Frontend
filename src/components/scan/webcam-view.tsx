"use client";

import type { RefObject } from "react";
import Webcam from "react-webcam";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CaptureControls } from "./capture-controls";
import Image from "next/image";

interface WebcamViewProps {
  imgSrc: string | null;
  webcamRef: RefObject<Webcam | null>;
  onUserMediaError: (error: string | DOMException) => void;
  onRetake: () => void;
  onUseImage: () => void;
  isPending: boolean;
}

export function WebcamView({
  imgSrc,
  webcamRef,
  onUserMediaError,
  onRetake,
  onUseImage,
  isPending,
}: WebcamViewProps) {
  return (
    <div className="bg-background relative flex h-full items-center justify-center overflow-hidden rounded-lg border">
      <Link href="/upload" className="absolute top-4 right-4 z-20">
        <Button variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
      </Link>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="Screenshot"
          fill
          className="mx-auto aspect-[9/16] h-full object-cover sm:aspect-auto sm:w-full"
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="mx-auto aspect-[9/16] h-full object-cover sm:aspect-auto sm:w-full"
          videoConstraints={{
            facingMode: "environment",
          }}
          onUserMediaError={onUserMediaError}
        />
      )}
      {imgSrc && (
        <CaptureControls
          onRetake={onRetake}
          onUseImage={onUseImage}
          isPending={isPending}
        />
      )}
    </div>
  );
}
