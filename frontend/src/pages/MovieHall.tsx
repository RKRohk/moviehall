import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useParams } from "react-router";
import ChatSection from "../components/ChatSection";
import MessageAlert from "../components/MessagAlert";
import VideoPlayer from "../components/VideoPlayer";

const MovieHall = () => {
  const [chatVisibility, setChatVisibility] = useState(false);

  const { roomCode } = useParams<{ roomCode: string }>();

  const toggleVisibility = () => setChatVisibility(!chatVisibility);

  return (
    <div className="relative text-gray-200">
      <div className="w-full h-screen flex">
        <div className="w-full my-auto">
          <VideoPlayer uri="" roomCode={roomCode} />
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
          <ChatSection onClose={toggleVisibility} roomCode={roomCode} />
        </div>
      </Transition>
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
          }}
        >
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
