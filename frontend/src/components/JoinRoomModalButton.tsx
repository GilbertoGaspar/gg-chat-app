import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JoinRoomModalButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [inputRoomId, setInputRoomId] = useState("");

  const onToggleOpen = () => {
    setIsOpen((curr) => !curr);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onJoinRoom = () => {
    const roomId = inputRoomId.trim();
    if (!roomId) return;
    router.push(`/room/${roomId}`);
    onClose();
  };

  return (
    <>
      <button
        className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        type="button"
        onClick={onToggleOpen}
      >
        <ChatBubbleBottomCenterIcon width={20} height={20} />
        Join a room
      </button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Which room would you like to join?
              </DialogTitle>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="room"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Room ID
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="room"
                    type="string"
                    required
                    autoComplete="room"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  className="cursor-pointer disabled:cursor-auto disabled:bg-gray-400 inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={onJoinRoom}
                  disabled={!inputRoomId.trim()}
                >
                  Join
                </Button>
                <Button
                  className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default JoinRoomModalButton;
