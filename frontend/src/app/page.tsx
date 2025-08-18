"use client";
import AuthGuard from "@/components/AuthGuard";

import JoinRoomModalButton from "@/components/JoinRoomModalButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const onCreateRoom = () => {
    router.push(`/room/${uuidv4()}`);
  };

  return (
    <AuthGuard>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-5xl font-extrabold tracking-tight text-center sm:text-left">
            Ready to chat?
          </h1>
          <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              Get started by joining a chatroom or creating one.
            </li>
            <li className="tracking-[-.01em]">Have fun!</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <JoinRoomModalButton />
            <button
              className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              type="button"
              onClick={onCreateRoom}
            >
              <PlusIcon width={20} height={20} />
              Create a room
            </button>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
