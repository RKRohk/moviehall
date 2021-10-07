import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import NavBar from "../components/NavBar";
import { CREATE_ROOM_MUTATION } from "../graphql/mutations";
import { createRoom, createRoomVariables } from "../types/api";

const Home: React.FC = () => {
  const [createRoom] = useMutation<createRoom, createRoomVariables>(
    CREATE_ROOM_MUTATION,
    { variables: { uri: "meh" } }
  );

  const history = useHistory();
  const onClick = async () => {
    try {
      const { data, errors } = await createRoom();
      const code = data?.createRoom.code;
      console.log(code);
      history.push(`/room/${code}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <NavBar />

      <section className="mx-auto text-center">
        <p>Create a room ??</p>
        <button
          className="border border-black rounded-md p-2 hover:text-white hover:bg-black"
          onClick={onClick}
        >
          Create Room
        </button>
      </section>
    </div>
  );
};

export default Home;
