import { useContext } from "react";
import { FirebaseContext } from "../context/firebaseContext";
import {
  GetMessages_room_actions,
  GetMessages_room_actions_createdBy,
} from "../types/api";

interface MessageAlertProps {
  createdBy: GetMessages_room_actions_createdBy;
  payload: String;
  createdAt: any;
}
const MessageAlert: React.VFC<MessageAlertProps> = ({
  createdBy,
  payload,
  createdAt,
}) => {
  const { auth } = useContext(FirebaseContext);
  const myUserId = auth.currentUser?.uid;

  const createdAtTime = new Date(createdAt);

  return (
    <li
      className={`${
        createdBy.id === myUserId
          ? "bg-gradient-to-bl from-green-400 to-blue-500 self-end rounded-br-none"
          : "bg-gray-700 rounded-bl-none self-start"
      } rounded-2xl  p-1 tracking-tight`}
    >
      {createdBy.id != myUserId && (
        <p className="text-left text-sm text-green-500 font-bold ">
          {createdBy.name}
        </p>
      )}
      <div className="flex flex-row justify-around space-x-2">
        <div className="text-lg p-1 h-full">{payload}</div>
        <div className="text-xs pt-3 italic">
          {createdAtTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </li>
  );
};

export default MessageAlert;
