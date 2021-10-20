//The only use of this component is to get a user action so that we can autoplay the media. bas
interface EnterRoomProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const EnterRoom: React.VFC<EnterRoomProps> = ({ onClick }) => {
  return (
    <section className="h-screen">
      <div className=" text-center flex h-full">
        <button
          className="mx-auto my-auto bg-black text-white p-8 rounded-xl transition transform "
          onClick={onClick}
        >
          Click here to enter
        </button>
      </div>
    </section>
  );
};

export default EnterRoom;
