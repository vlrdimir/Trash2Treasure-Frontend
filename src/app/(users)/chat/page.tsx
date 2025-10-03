import ChatLayout from "@/components/chat/chat-layout";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="fixed inset-0 h-full w-full p-4">
        <ChatLayout />
      </div>
    </div>
  );
}
