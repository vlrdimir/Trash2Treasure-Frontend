import { getQueryClient } from "@/app/get-query-client";
import { listConversation } from "@/lib/api/conversation";
import auth from "@/middleware";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ChatPageProvider from "./provider";

async function Page() {
  const queryClient = getQueryClient();
  const session = await auth();
  const token = session?.tokenId ?? "";

  await queryClient.prefetchQuery({
    queryKey: ["conversations", "list", { page: 1, limit: 10, token }],
    queryFn: async () => listConversation({ token, page: 1, limit: 10 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatPageProvider token={token} />
    </HydrationBoundary>
  );
}

export default Page;
