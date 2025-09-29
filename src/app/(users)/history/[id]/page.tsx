import { getQueryClient } from "@/app/get-query-client";
import { fetcherHistoryDetail } from "@/hooks/use-history-queries";
import auth from "@/middleware";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProviderWrapper from "./provider";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const queryClient = getQueryClient();
  const session = await auth();
  const token = session?.tokenId ?? "";

  await queryClient.prefetchQuery({
    queryKey: ["history", "detail", id, token],
    queryFn: async () => fetcherHistoryDetail(parseInt(id), token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProviderWrapper token={token} slugId={id} />
    </HydrationBoundary>
  );
}
