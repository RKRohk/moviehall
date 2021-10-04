import MessageAlert from "./MessagAlert";
import MessageBox from "./MessageBox";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebaseContext";
import { GET_MESSAGES_QUERY } from "../graphql/queries";
import { GetMessages } from "../types/api";
import { useParams } from "react-router";

interface ChatSectionProps {
  onClose: () => void;
}
const ChatSection: React.VFC<ChatSectionProps> = ({ onClose }) => {
  const { auth } = useContext(FirebaseContext);
  const { roomCode } = useParams<{ roomCode: string | undefined }>();

  const { data, loading, error } = useQuery<GetMessages>(GET_MESSAGES_QUERY, {
    variables: { roomcode: roomCode },
    context: { headers: { Auth: `Bearer ${auth.currentUser?.getIdToken}` } },
  });

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
      className="h-full w-96 rounded-2xl p-2 pb-4 bg-gray-800 text-gray-300"
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
      <div className="max-h-full p-2 overflow-scroll">
        <ul className="space-y-2 flex flex-col">{data?.room?.actions}</ul>
      </div>
      <MessageBox />
    </div>
  );
};

export default ChatSection;
