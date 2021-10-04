import { useMutation } from "@apollo/client";
import { Transition } from "@headlessui/react";
import { ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FirebaseContext } from "../context/firebaseContext";
import { SEND_MESSAGE_MUTATION } from "../graphql/mutations";
import { sendMessage, sendMessageVariables } from "../types/api";

const MessageBox = () => {
  const {
    auth: { currentUser },
  } = useContext(FirebaseContext);
  const [message, setMessage] = useState("");
  const { roomCode } = useParams<{ roomCode: string }>();

  const [addMessage] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE_MUTATION,
    {
      variables: { roomCode, message },

      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idToken = await currentUser?.getIdToken();
    console.log({ roomCode, message, idToken: idToken });
    addMessage({
      onError: (error) => {
        console.error(error.message);
      },
    });
    setMessage("");
  };

  return (
    <form className="mx-auto group flex space-x-2" onSubmit={onSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="form-input w-full rounded-2xl transition transform border-green-900  bg-gray-500 duration-150 focus:outline-none focus:ring-green-800 focus:border-green-900"
        type="text"
      />
      <Transition
        as={Fragment}
        show={!!message}
        enter="transition transform bounce duration-150"
        enterFrom="opacity-0 translate-x-3"
        enterTo="opacity-100 translate-x-0"
        leave="transition transform bounce duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-3"
      >
        <button className="w-1/4 bg-green-800 rounded-2xl">
          <Transition
            appear={!!message}
            enter="transform duration-300 ease-in-out"
            enterFrom="-rotate-90"
            enterTo="rotate-0"
            leave="transform duration-300 ease-in-out"
            leaveFrom="rotate-90"
            leaveTo="-rotate-90"
          >
            <PaperAirplaneIcon className="mx-auto transform rotate-90 h-4" />
          </Transition>
        </button>
      </Transition>
    </form>
  );
};

export default MessageBox;
