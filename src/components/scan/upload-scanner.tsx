"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UploadScannerProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
}

export function UploadScanner({
  onFileSelect,
  previewUrl,
}: UploadScannerProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-muted flex w-full max-w-md flex-grow cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors",
        isDragActive ? "border-primary" : "border-transparent",
      )}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={previewUrl}
            alt="Image preview"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ) : (
        <div className="text-muted-foreground text-center">
          <Upload className="mx-auto h-12 w-12" />
          <p>
            {isDragActive
              ? "Jatuhkan file di sini..."
              : "Seret & jatuhkan gambar, atau klik untuk memilih"}
          </p>
        </div>
      )}
    </div>
  );
}
