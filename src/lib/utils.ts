import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// General fetcher for GET requests
export const fetcher = async <T>(
  url: string,
  token: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok: ${errorBody}`);
  }

  const data: { status: boolean; message?: string } = await response.json();
  if (!data.status) {
    throw new Error(data.message ?? "API returned an error");
  }

  return data as T;
};

// General fetcher for FormData requests
export const posterWithFormData = async <T>(
  url: string,
  token: string,
  formData: FormData,
  method: "POST" | "PUT" | "PATCH" = "POST",
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok: ${errorBody}`);
  }

  const data: { status: boolean; message?: string } = await response.json();
  if (!data.status) {
    throw new Error(data.message ?? "API returned an error");
  }

  return data as T;
};

// General fetcher for POST/PUT/PATCH requests
export const poster = async <T, U>(
  url: string,
  token: string,
  { arg }: { arg: U },
  method: "POST" | "PUT" | "PATCH" = "POST",
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok: ${errorBody}`);
  }

  const data: { status: boolean; message?: string } = await response.json();
  if (!data.status) {
    throw new Error(data.message ?? "API returned an error");
  }

  return data as T;
};

export const deleter = async <T>(
  url: string,
  token: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    method: "DELETE",
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok: ${errorBody}`);
  }

  const data: { status: boolean; message?: string } = await response.json();
  if (!data.status) {
    throw new Error(data.message ?? "API returned an error");
  }

  return data as T;
};

export const craftSuggestions: Record<
  string,
  { title: string; description: string }
> = {
  plastic: {
    title: "Rekomendasi Kerajinan Plastik",
    description:
      "Botol atau wadah plastik bekas dapat diubah menjadi pot bunga, tempat pensil, atau bahkan lampu hias yang unik. Jadikan sampah plastik sebagai karya seni yang bermanfaat!",
  },
  metal: {
    title: "Rekomendasi Kerajinan Logam",
    description:
      "Kaleng bekas bisa disulap menjadi tempat lilin, miniatur, atau hiasan dinding industrial yang artistik.",
  },
  paper: {
    title: "Rekomendasi Kerajinan Kertas",
    description:
      "Koran, majalah, atau kertas bekas lainnya dapat diolah menjadi bubur kertas untuk patung, kartu ucapan daur ulang, atau perhiasan unik.",
  },
  shoes: {
    title: "Rekomendasi Kerajinan Sepatu Bekas",
    description:
      "Sepatu boots atau sneakers bekas bisa menjadi pot sukulen yang unik, atau bagian solnya dapat digunakan untuk proyek seni mozaik.",
  },
  trash: {
    title: "Rekomendasi Kerajinan dari Sampah",
    description:
      "Banyak sampah anorganik yang bisa diubah menjadi karya seni kolase, instalasi, atau produk fungsional lainnya. Biarkan kreativitasmu berjalan liar!",
  },
  battery: {
    title: "Rekomendasi Kerajinan Baterai Bekas",
    description:
      "Baterai bekas (yang sudah tidak aktif) bisa digunakan dalam proyek seni seperti miniatur robot, pemberat kertas resin, atau sebagai bagian dari instalasi seni elektronik.",
  },
  clothes: {
    title: "Rekomendasi Kerajinan Kain Perca",
    description:
      "Kain dari pakaian bekas dapat dijahit menjadi tas patchwork, sarung bantal, atau bahkan selimut yang penuh warna dan cerita.",
  },
  cardboard: {
    title: "Rekomendasi Kerajinan Kardus",
    description:
      "Kardus bekas adalah bahan serbaguna untuk membuat rak mini, rumah boneka, atau bahkan kursi gulung yang kuat dan fungsional.",
  },
  biological: {
    title: "Rekomendasi Kerajinan Organik",
    description:
      "Sisa bahan organik seperti ampas kopi bisa menjadi scrub tubuh, kulit buah menjadi eco-enzyme, atau sisa sayuran untuk kompos padat.",
  },
  "brown-glass": {
    title: "Rekomendasi Kerajinan Kaca Cokelat",
    description:
      "Botol kaca cokelat bisa di-etching menjadi vas bunga yang elegan, dipotong menjadi tatakan lilin, atau dilebur untuk mozaik.",
  },
  "green-glass": {
    title: "Rekomendasi Kerajinan Kaca Hijau",
    description:
      "Pecahan botol kaca hijau bisa dirangkai menjadi lonceng angin yang merdu atau digunakan untuk lampu taman bertenaga surya.",
  },
  "white-glass": {
    title: "Rekomendasi Kerajinan Kaca Bening",
    description:
      "Botol atau stoples kaca bening bisa diukir menjadi vas minimalis atau diisi dengan serpihan kaca untuk perhiasan resin yang indah.",
  },
  default: {
    title: "Temukan Ide Kerajinan",
    description:
      "Jelajahi berbagai ide kreatif untuk mendaur ulang sampah di sekitar Anda menjadi barang yang berguna dan bernilai.",
  },
};
