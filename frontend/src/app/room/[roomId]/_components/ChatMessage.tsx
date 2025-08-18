import { IMessage } from "../_hooks/useSocket";

const ChatMessage = ({
  message,
  currentUserId,
}: {
  message: IMessage;
  currentUserId: string;
}) => {
  if (message.userEmail === "Server") {
    return (
      <li
        className={`text-black bg-gray-300 p-2 rounded-md shadow-sm w-90 self-start`}
      >
        {`[Server]: ${message?.message}`}
      </li>
    );
  }

  return (
    <li
      className={`text-black bg-white p-2 rounded-md shadow-sm w-90 ${
        message.userId === currentUserId ? "self-end" : "self-start"
      }`}
    >
      {`[User] ${message?.userEmail || "User Email"}: ${message?.message}`}
    </li>
  );
};

export default ChatMessage;
