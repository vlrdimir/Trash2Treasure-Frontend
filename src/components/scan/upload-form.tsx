"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UploadScanner } from "./upload-scanner";
import { usePredictMutation } from "@/hooks/use-predict-mutation";
import { ScanLoading } from "./scan-loading";
import { Upload, Trash2 } from "lucide-react";

export function UploadForm({ token }: { token: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const mutation = usePredictMutation();

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (file) {
      mutation.mutate(
        { image: file, token },
        {
          onSuccess: (data) => {
            alert(`Prediksi berhasil: ${data.result.label}`);
            handleRemoveFile(); // Clear file after success
          },
          onError: (error) => {
            alert(`Terjadi kesalahan: ${error.message}`);
          },
        },
      );
    }
  };

  return (
    <>
      {mutation.isPending && <ScanLoading />}
      <div className="flex flex-grow flex-col">
        <UploadScanner onFileSelect={handleFileSelect} previewUrl={preview} />
      </div>
      {file && (
        <div className="absolute inset-x-0 bottom-24 z-10 mx-auto flex w-full max-w-md justify-center gap-4 px-12">
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending || !file}
            size="lg"
            className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" />
            Submit
          </Button>
          <Button
            onClick={handleRemoveFile}
            variant="outline"
            size="lg"
            disabled={mutation.isPending}
            className="flex-1"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Upload Ulang
          </Button>
        </div>
      )}
    </>
  );
}
