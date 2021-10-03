interface MessageAlertProps {
  createdBy: String;
  payload: String;
}
const MessageAlert: React.VFC<MessageAlertProps> = ({ createdBy, payload }) => {
  return (
    <li
      className={`${
        createdBy === "me"
          ? "bg-green-800 self-end rounded-br-none"
          : "bg-gray-500 rounded-bl-none"
      } rounded-lg w-2/3 p-1 `}
    >
      <p className="text-left text-sm">{createdBy}</p>
      <p className="truncate text-lg">{payload}</p>
    </li>
  );
};

export default MessageAlert;
