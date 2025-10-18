import { getConversationById } from "@/lib/api/conversation";
import auth from "@/middleware";
import { azure } from "@ai-sdk/azure";
import { generateObject } from "ai";
import { z } from "zod";

const titleSchema = z.object({
  title: z
    .string()
    .max(60)
    .describe(
      "A concise, descriptive title for the conversation (maximum 60 characters)",
    ),
});

interface MessagePart {
  type: "text" | "image" | "step-start";
  text?: string;
  image?: string;
  state?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  parts?: MessagePart[];
  metadata?: {
    createdAt?: number;
    model?: string;
    totalTokens?: number;
  };
}

const extractTextFromMessage = (message: Message): string => {
  if (!message.parts || message.parts.length === 0) {
    return "";
  }

  return message.parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join(" ")
    .trim();
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    const token = session?.tokenId ?? "";

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, conversationId } = (await req.json()) as {
      messages: Message[];
      conversationId: string;
    };

    const conversation = await getConversationById({
      conversationId,
      token,
    });

    const tokenUsage = conversation?.result.tokenUsage ?? 0;
    const tokenMax = tokenUsage > 4500;
    if (tokenMax) {
      return new Response("Anda telah mencapai batas maksimum percakapan.", {
        status: 400,
      });
    }

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 });
    }

    const conversationContext = messages
      .map((msg) => {
        const text = extractTextFromMessage(msg);
        const hasImage = msg.parts?.some((part) => part.type === "image");
        const imageNote = hasImage ? " [includes image]" : "";
        return `${msg.role}: ${text}${imageNote}`;
      })
      .filter((text) => text.length > 0)
      .join("\n");

    if (!conversationContext) {
      return Response.json(
        { error: "No valid text content found in messages" },
        { status: 400 },
      );
    }

    const { object, usage } = await generateObject({
      model: azure("gpt-5-nano"),
      schema: titleSchema,
      prompt: `Based on the following conversation, generate a concise and descriptive title that captures the main topic or question. The title should be clear, engaging, and no more than 60 characters.

Conversation:
${conversationContext}

Generate a title that accurately represents this conversation.`,
    });

    console.log(object, "ini object generate title");

    return Response.json({
      title: object.title,
      tokenUsage: usage.totalTokens,
    });
  } catch (error) {
    console.error("Error generating title:", error);
    return Response.json(
      { error: "Failed to generate title" },
      { status: 500 },
    );
  }
}
