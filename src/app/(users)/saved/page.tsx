import { getQueryClient } from "@/app/get-query-client";
import { fetcherListSaved } from "@/hooks/use-saved-queries";
import auth from "@/middleware";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SavedPageProvider from "./provider";

async function Page() {
  const queryClient = getQueryClient();
  const session = await auth();
  const token = session?.tokenId ?? "";

  await queryClient.prefetchQuery({
    queryKey: ["saved", "list", { page: 1, limit: 10, token }],
    queryFn: async () => fetcherListSaved(1, 10, token),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SavedPageProvider token={token} />
    </HydrationBoundary>
  );
}

export default Page;
