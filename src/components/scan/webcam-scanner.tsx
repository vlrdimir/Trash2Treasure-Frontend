"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type Webcam from "react-webcam";
import { useWebcamStore } from "@/hooks/store/use-webcam-store";
import { usePredictMutation } from "@/hooks/usePredict";
import { ScanLoading } from "./scan-loading";
import dataURLtoFile from "@/lib/dataUrlToFile";
import { PermissionBlockedWarning } from "./permission-blocked-warning";
import { WebcamView } from "./webcam-view";
import { useRouter } from "next/navigation";

export function WebcamScanner({ token }: { token: string }) {
  const router = useRouter();
  const { imgSrc, setImgSrc, captureTrigger, retake } = useWebcamStore();
  const webcamRef = useRef<Webcam>(null);
  const mutation = usePredictMutation();
  const [permissionBlocked, setPermissionBlocked] = useState(false);

  const handleUserMediaError = (error: string | DOMException) => {
    console.error("Webcam error:", error);
    if (error instanceof DOMException) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        setPermissionBlocked(true);
      }
    }
  };

  const capture = useCallback(() => {
    const video = webcamRef.current?.video;
    if (video) {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const targetAspectRatio = 9 / 16;
      const targetWidth = videoHeight * targetAspectRatio;

      if (videoWidth < targetWidth) {
        console.error(
          "Video stream is not wide enough for a 9:16 crop. Capturing as-is.",
        );
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
          setImgSrc(imageSrc);
        }
        return;
      }

      const sourceX = (videoWidth - targetWidth) / 2;
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          video,
          sourceX,
          0,
          targetWidth,
          videoHeight,
          0,
          0,
          targetWidth,
          videoHeight,
        );
        const imageSrc = canvas.toDataURL("image/jpeg");
        setImgSrc(imageSrc);
      }
    }
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    if (captureTrigger > 0) {
      capture();
    }
  }, [capture, captureTrigger]);

  const handleUseImage = () => {
    if (imgSrc) {
      const file = dataURLtoFile(imgSrc, "webcam-capture.jpg");
      mutation.mutate(
        {
          image: file,
          token,
        },
        {
          onSuccess: (data) => {
            console.log(data, "resp predict");
            router.push(`/history/${data.result.id}`);
            retake();
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
      <div className="fixed inset-0 z-0">
        <div className="relative mx-auto h-full max-w-md">
          {permissionBlocked ? (
            <PermissionBlockedWarning />
          ) : (
            <WebcamView
              imgSrc={imgSrc}
              webcamRef={webcamRef}
              onUserMediaError={handleUserMediaError}
              onRetake={retake}
              onUseImage={handleUseImage}
              isPending={mutation.isPending}
            />
          )}
        </div>
      </div>
    </>
  );
}
