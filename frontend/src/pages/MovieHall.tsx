import { useQuery, useSubscription } from "@apollo/client";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ChatSection from "../components/ChatSection";
import MessageAlert from "../components/MessagAlert";
import VideoPlayer from "../components/VideoPlayer";
import { GET_MESSAGES_QUERY, URL_QUERY } from "../graphql/queries";
import { SUBSCRIBE_TO_ACTION } from "../graphql/subscriptions";
import {
  GetMessages,
  GetMessagesVariables,
  MediaUrl,
  MediaUrlVariables,
  SubscribeToAction,
  SubscribeToActionVariables,
} from "../types/api";

const MovieHall = () => {
  const [chatVisibility, setChatVisibility] = useState(false);

  const { roomCode } = useParams<{ roomCode: string }>();

  const toggleVisibility = () => {
    setUnread(0);
    setChatVisibility(!chatVisibility);
  };

  const media = useQuery<MediaUrl, MediaUrlVariables>(URL_QUERY, {
    variables: { roomCode },
  });

  const { data, loading, error, subscribeToMore } = useQuery<
    GetMessages,
    GetMessagesVariables
  >(GET_MESSAGES_QUERY, {
    variables: { roomCode },
  });

  const subscribeToMessages = () =>
    subscribeToMore<SubscribeToAction>({
      document: SUBSCRIBE_TO_ACTION,
      variables: { roomCode: roomCode },

      updateQuery: (prev, { subscriptionData }) => {
        addUnread();
        if (!subscriptionData.data) return prev;
        if (!subscriptionData.data.messages.id) return prev;
        const newMessage = subscriptionData.data;
        console.log(subscriptionData.data);
        return Object.assign({}, prev, {
          room: {
            actions: [newMessage.messages, ...(prev.room?.actions ?? [])],
          },
        });
      },
    });

  useEffect(() => {
    subscribeToMessages();
  }, []);

  const history = useHistory();

  const [unread, setUnread] = useState(0);

  const addUnread = () => {
    setUnread((unread) => unread + 1);
  };

  if (error || media.error) {
    console.error(error, media.error);
    history.push("/");
  }

  return (
    <div className="relative bg-black text-gray-200">
      <div className="w-full h-screen flex">
        <div className="w-full my-auto">
          {data && (
            <VideoPlayer
              uri={media.data?.room?.media.uri ?? ""}
              roomCode={roomCode}
              startTime={media.data?.room?.timestamp ?? 0}
            />
          )}
        </div>
      </div>
      <Transition
        show={chatVisibility}
        enter="transition transform ease-in-out duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition transform ease-in-out duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="absolute z-10 bottom-36 right-10">
          <ChatSection
            onClose={toggleVisibility}
            roomCode={roomCode}
            actions={data?.room?.actions ?? []}
          />
        </div>
      </Transition>

      {/* Button to control chat section visibility */}
      <Transition
        as={Fragment}
        show={!chatVisibility}
        enter="transition transform ease-in-out duration-300"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out transform duration-300"
        leaveFrom="opacity-100 translate-y-0 "
        leaveTo="opacity-0 translate-y-full"
      >
        <button
          className="absolute z-10 right-32 bottom-32 p-4 rounded-full bg-green-700 focus:ring-0"
          onClick={() => {
            setChatVisibility(!chatVisibility);
            setUnread(0);
          }}
        >
          {!!unread && (
            <>
              <span className="animate-ping absolute opacity-75 inline-flex top-0 right-0 bg-purple-500 h-3 w-3 rounded-full"></span>
              <span className="absolute opacity-75 inline-flex top-0 right-0 bg-purple-600 h-3 w-3 rounded-full"></span>
            </>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Transition>
    </div>
  );
};

export default MovieHall;
