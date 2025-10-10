import { getDashboard, type DashboardResponse } from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = ({ token }: { token: string }) => {
  const { data, isLoading, error } = useQuery<DashboardResponse, Error>({
    queryKey: ["dashboard", token],
    queryFn: () => getDashboard(token),
    enabled: !!token,
  });

  return { data, isLoading, error };
};
