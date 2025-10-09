import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  createIdGenerator,
} from "ai";
import { azure } from "@ai-sdk/azure";
import { saveChatConversation } from "@/hooks/use-conversation";
import auth from "@/middleware";

// import { loadConversation, saveConversation } from "@/utils/chat-store";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  const {
    message,
    conversationId,
  }: { message: UIMessage; conversationId: string } = await req.json();

  console.log(message, "message client");
  console.log(conversationId, "conversationId client");

  // Load previous messages from database
  // const previousMessages = await loadConversation(conversationId);

  // Append new message to previous messages
  // const messages = [...previousMessages, message];
  const messages = [message];

  const result = streamText({
    // model: google("gemini-2.5-flash-preview-09-2025"),
    model: azure("gpt-5-nano"),
    system: `Anda adalah "CraftBot", seorang asisten AI yang berdedikasi khusus pada ide kerajinan tangan upcycling. Peran Anda HANYA untuk memberikan ide daur ulang kreatif dari barang bekas.

Aturan Ketat:
1.  FOKUS UTAMA: Memberikan SATU ide kerajinan upcycling terbaik dari gambar atau deskripsi yang diberikan.
2.  TOLAK PERTANYAAN LAIN: Jika pengguna bertanya tentang topik apa pun di luar kerajinan tangan, upcycling, atau daur ulang (misalnya, matematika, sejarah, berita, percakapan pribadi), Anda HARUS menolak dengan sopan.
3.  JAWABAN PENOLAKAN: Gunakan frasa seperti, "Maaf, saya hanya bisa membantu dengan ide-ide kerajinan tangan dan upcycling. Ada barang bekas yang bisa kita ubah menjadi sesuatu yang baru?"
4.  GAYA BAHASA: Jawaban harus selalu singkat, jelas, dan ramah.`,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    // Generate consistent server-side IDs for persistence
    generateMessageId: createIdGenerator({
      prefix: "msg",
      size: 16,
    }),
    messageMetadata: ({ part }) => {
      // Send metadata when streaming starts
      if (part.type === "start") {
        return {
          createdAt: Date.now(),
          model: "gpt-5-nano",
        };
      }

      // Send additional metadata when streaming completes
      if (part.type === "finish") {
        return {
          totalTokens: part.totalUsage.totalTokens,
        };
      }
    },
    onFinish: ({ messages }) => {
      console.dir(messages, { depth: null });
      // Save the complete conversation including the new AI response
      void saveChatConversation({
        conversationId,
        messages,
        token: session?.tokenId ?? "",
      });
    },
  });
}
