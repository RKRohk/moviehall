import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GetMessages_room_actions } from "../types/api";

const ActionText: React.VFC<{ action: GetMessages_room_actions }> = ({
  action,
}) => {
  return (
    <Transition
      as={Fragment}
      appear={true}
      enter="translate transform duration-500 z-50 ease-in-out"
      enterFrom={"translate-y-full"}
      enterTo="translate-x-0 translate-y-0 "
    >
      <p className="text-center">{action.payload}</p>
    </Transition>
  );
};

export default ActionText;
