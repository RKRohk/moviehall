import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../components/NavBar";
import { CREATE_ROOM_MUTATION } from "../graphql/mutations";
import { createRoom, createRoomVariables } from "../types/api";

const Home: React.FC = () => {
  const [url, setUrl] = useState("");
  const [createRoom] = useMutation<createRoom, createRoomVariables>(
    CREATE_ROOM_MUTATION
  );

  const history = useHistory();
  const onClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, errors } = await createRoom({ variables: { uri: url } });
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
        <form className="mx-auto flex flex-col w-60 gap-y-5" onSubmit={onClick}>
          <input
            placeholder={"url"}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="focus:outline-none rounded-lg p-1 border-black border"
          />
          {url && (
            <button
              className="border border-black rounded-md p-2 hover:text-white hover:bg-black"
              type="submit"
            >
              Create Room
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default Home;
