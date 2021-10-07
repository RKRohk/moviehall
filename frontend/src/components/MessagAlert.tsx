import { Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { FirebaseContext } from "../context/firebaseContext";
import { GetMessages_room_actions_createdBy } from "../types/api";

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

  const amIAuthor = createdBy.id === myUserId;

  const createdAtTime = new Date(createdAt);

  return (
    <Transition
      as={Fragment}
      appear={true}
      enter="translate transform duration-500 z-50 ease-in-out"
      enterFrom={
        amIAuthor
          ? "-translate-x-full translate-y-full bg-gray-500"
          : "translate-y-full"
      }
      enterTo="translate-x-0 translate-y-0 "
    >
      <li
        className={`${
          amIAuthor
            ? "bg-gradient-to-bl from-green-400 to-blue-500 self-end rounded-br-none"
            : "bg-gray-700 rounded-bl-none self-start"
        } rounded-2xl  p-1 tracking-tight`}
      >
        {!amIAuthor && (
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
    </Transition>
  );
};

export default MessageAlert;
