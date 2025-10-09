import { getQueryClient } from "@/app/get-query-client";
import { getConversationById } from "@/hooks/use-conversation";
import auth from "@/middleware";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Provider from "./provider";

export default async function ConversationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ label?: string; image?: string }>;
}) {
  const { id } = await params;
  const { label, image } = await searchParams;
  const session = await auth();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["conversationId", id],
    queryFn: () =>
      getConversationById({
        token: session!.tokenId,
        conversationId: id,
      }),
  });

  try {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Provider
          id={id}
          token={session!.tokenId}
          label={label}
          image={image}
        />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error loading conversation:", error);
    // If conversation doesn't exist or there's an error, still load user conversations
    // try {
    //   const conversations = await getUserConversations();
    //   return <ChatPage conversationId={id} initialMessages={[]} conversations={conversations} />;
    // } catch (fallbackError) {
    //   // Final fallback
    //   console.error('Error loading conversations:', fallbackError);
    //   return <ChatPage conversationId={id} initialMessages={[]} conversations={[]} />;
    // }
  }
}
