import auth from "@/middleware";
import { createConversationNew } from "@/hooks/use-conversation";
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ label?: string; image?: string }>;
}) {
  const { label, image } = await searchParams;

  const session = await auth();
  const newConversation = await createConversationNew({
    data: {
      label,
      imageUrl: image,
    },
    token: session!.tokenId,
  });

  let queryParams = "";
  if (label && image) {
    queryParams += `?label=${label}&image=${image}`;
  }

  redirect(`/chat/${newConversation.result}${queryParams}`);
}

export default Page;
