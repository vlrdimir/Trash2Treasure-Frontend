import { fetcher } from "../utils";

interface RiwayatPindai {
  id: number;
  title: string;
  created_at: string;
}

interface KontribusiLingkungan {
  totalSampahDipindai: string;
  jenisPalingUmum: string;
  potensiDaurUlang: string;
}

export interface DashboardResponse {
  status: boolean;
  result: {
    riwayatPindaiTerbaru: RiwayatPindai[];
    kontribusiLingkungan: KontribusiLingkungan;
  };
}

export const getDashboard = async (
  token: string,
): Promise<DashboardResponse> => {
  const response = await fetcher<DashboardResponse>("/dashboard", token);
  return response;
};
