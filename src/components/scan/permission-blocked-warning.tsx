import { VideoOff } from "lucide-react";

export function PermissionBlockedWarning() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black p-4 text-center text-white">
      <VideoOff className="mb-4 h-16 w-16 text-red-500" />
      <h2 className="text-xl font-semibold">Akses Kamera Diperlukan</h2>
      <p className="mt-2 text-gray-400">
        Untuk melanjutkan, izinkan akses kamera di pengaturan browser Anda.
      </p>
    </div>
  );
}
