import MessageAlert from "./MessagAlert";
import MessageBox from "./MessageBox";
import { useQuery, gql, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_MESSAGES_QUERY } from "../graphql/queries";
import {
  ActionType,
  GetMessages,
  GetMessagesVariables,
  GetMessages_room_actions,
  SubscribeToAction,
} from "../types/api";
import { useHistory, useParams } from "react-router";
import { SUBSCRIBE_TO_ACTION } from "../graphql/subscriptions";
import ActionText from "./ActionText";

interface ChatSectionProps {
  onClose: () => void;
  roomCode: string;
  updateUnread: () => void;
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
      return <ActionText action={action} />;
  }
};
const ChatSection: React.VFC<ChatSectionProps> = ({ onClose, roomCode }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    GetMessages,
    GetMessagesVariables
  >(GET_MESSAGES_QUERY, {
    variables: { roomCode },
  });

  const history = useHistory();

  //Do not load the chat if the room does not exist
  if (error) {
    history.push("/");
  }

  const subscribeToMessages = () =>
    subscribeToMore<SubscribeToAction>({
      document: SUBSCRIBE_TO_ACTION,
      variables: { roomCode: roomCode },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (!subscriptionData.data.messages.id) return prev;
        const newMessage = subscriptionData.data;
        console.log(subscriptionData.data);
        return Object.assign({}, prev, {
          room: { actions: [newMessage.messages] },
        });
      },
    });

  useEffect(() => {
    subscribeToMessages();
  }, []);

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
      <div className="overflow-auto flex max-h-96 flex-col-reverse">
        <div className="p-2">
          <ul className="space-y-2 flex flex-col">
            {loading && "loading..."}
            {data?.room?.actions.map(actionMapper)}
          </ul>
        </div>
      </div>
      <MessageBox />
    </div>
  );
};

export default ChatSection;
