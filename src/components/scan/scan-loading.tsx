"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const texts = ["Menganalisis gambar...", "Mengidentifikasi objek..."];

export function ScanLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Ganti teks setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative h-24 w-24">
        <motion.div
          className="absolute h-full w-full rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-white">Memindai...</p>
      <motion.p
        key={index}
        className="mt-2 text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {texts[index]}
      </motion.p>
    </div>
  );
}
