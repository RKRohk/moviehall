import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../components/Navbar/Navbar";
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

      <section className="mx-auto text-center pt-4">
        <div className="flex flex-wrap items-center align-middle justify-center">
          <div className="md:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
                Create a <span className="text-indigo-500">Room</span>
              </h1>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Watch the best of{" "}
                <span className="font-medium text-indigo-500">your</span>{" "}
                favorites
              </p>

              <div className="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                <form
                  className="mx-auto flex flex-col w-60 gap-y-5"
                  onSubmit={onClick}
                >
                  {/* <input
                    placeholder={"Enter the URL"}
                    className="focus:outline-none rounded-lg p-1 border-black border"
                  /> */}
                  <input
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="Enter the URL"
                  />
                  {url && (
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-lg lg:w-auto lg:mx-4 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400"
                    >
                      Create Room
                    </button>
                  )}
                </form>
              </div>
              {/* <p className="font-bold">Create a room ??</p> */}
            </div>
          </div>
          <div className="md:w-1/2 lg:px-8 px-2 md:pt-0 pt-6">
            <img
              src="/assets/images/movie3.jpg"
              alt="Movie Hall"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
