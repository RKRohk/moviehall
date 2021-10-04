import { Transition } from "@headlessui/react";
import { ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";

const MessageBox = () => {
  const [message, setMessage] = useState("");

  return (
    <form className="mx-auto group flex space-x-2">
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
