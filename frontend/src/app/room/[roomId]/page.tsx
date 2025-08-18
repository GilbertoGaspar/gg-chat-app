import AuthGuard from "@/components/AuthGuard";
import { ChatRoom } from "./_components/ChatRoom";

export default async function Room({ params }: { params: { roomId: string } }) {
  const { roomId } = await params;

  return (
    <AuthGuard>
      <div className="font-sans grid grid-rows-[5px_1fr_5px] items-start justify-items-center min-h-100 p-8 pb-20 sm:p-20">
        <main className="flex flex-col gap- row-start-2 items-start sm:items-start">
          <div className="flex flex-col items-center mb-2">
            <h1 className="text-3xl font-bold mb-4">Chat Room: {roomId}</h1>
          </div>
          <ChatRoom roomId={roomId} />
        </main>
      </div>
    </AuthGuard>
  );
}
