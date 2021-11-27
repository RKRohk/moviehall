import MessageAlert from "./MessagAlert";
import MessageBox from "./MessageBox";
import React, { useEffect } from "react";
import { ActionType, GetMessages_room_actions } from "../types/api";

import ActionText from "./ActionText";

interface ChatSectionProps {
  onClose: () => void;
  roomCode: string;
  actions: GetMessages_room_actions[];
}

const actionMapper = (action: GetMessages_room_actions) => {
  switch (action.actionType) {
    case ActionType.MESSAGE: {
      return (
        <MessageAlert
          key={
            action.payload + action.createdBy.id + action.id + action.createdAt
          }
          payload={action.payload}
          createdBy={action.createdBy}
          createdAt={action.createdAt}
        />
      );
    }

    case ActionType.PAUSE:
    case ActionType.PLAY:
    case ActionType.SEEK:
    case ActionType.USER_JOIN:
      return <ActionText action={action} />;
  }
};
const ChatSection: React.VFC<ChatSectionProps> = ({
  onClose,
  roomCode,
  actions,
}) => {
  return (
    <div
      /**
       * Captures the escape key (code 27) and closes the popup
       */
      onKeyDown={(e) => {
        if (e.keyCode == 27) {
          onClose();
        }
      }}
      className="h-full w-96 rounded-3xl p-2 pb-4 bg-black border-gray-700 border-4 text-gray-300 shadow-lg"
    >
      <button onClick={onClose} className="float-right pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div>
        <h2 className="text-center text-lg">
          You are watching #MOVIE NAME HERE
        </h2>
        <p>Room Code {roomCode}</p>{" "}
        <button className="inline-block">Copy</button>
      </div>
      <div className="overflow-auto flex 2xl:max-h-96 xl:max-h-80 md:max-h-32 sm:max-h-14 flex-col-reverse">
        <div className="p-2">
          <ul className="space-y-2 flex flex-col">
            {!actions && "loading..."}
            {actions.map(actionMapper)}
          </ul>
        </div>
      </div>
      <MessageBox />
    </div>
  );
};

export default ChatSection;
