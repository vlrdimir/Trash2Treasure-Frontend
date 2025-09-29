import { getQueryClient } from "@/app/get-query-client";
import { fetcherHistoryList } from "@/hooks/use-history-queries";
import auth from "@/middleware";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import HistoryPage from "./provider";

export default async function Page() {
  const queryClient = getQueryClient();
  const session = await auth();
  const token = session?.tokenId ?? "";

  await queryClient.prefetchQuery({
    queryKey: ["history", "list", { page: 1, limit: 10, token }],
    queryFn: async () => fetcherHistoryList(1, 10, token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HistoryPage token={token} />
    </HydrationBoundary>
  );
}
