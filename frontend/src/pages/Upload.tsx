import { useMutation } from "@apollo/client";
import { stringify } from "querystring";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/firebaseContext";
import { UPLOAD_FILE } from "../graphql/mutations";
import { uploadFile, uploadFileVariables } from "../types/api";

const Upload = () => {
  const [uploadFile, { data, loading, error }] = useMutation<
    uploadFile,
    uploadFileVariables
  >(UPLOAD_FILE);
  const [file, setFile] = useState<File>();
  const [success, setSuccess] = useState<boolean>();

  const onSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await uploadFile({ variables: { file: file } });
    setSuccess(response.data?.uploadFile);
  };
  const onClick = async () => {
    const response = await uploadFile({ variables: { file: file } });
    setSuccess(response.data?.uploadFile);
  };
  return (
    <>
      <section className="h-screen  p-5">
        <div className="flex flex-col space-y-5 justify-center items-center my-auto">
          <h1 className="form-label">Upload a file to watch on moviehall</h1>
          <form>
            <input
              className="form-control text-base m-0 p-1 w-full bg-white bg-clip-padding rounded border border-solid text-gray-300
                focus:outline-none"
              type="file"
              multiple
              onChange={({ target: { validity, files } }) => {
                if (validity && files && files[0]) {
                  setFile(files[0]);
                }
                if (!validity) {
                  console.error("file is invalid");
                }
              }}
            />
          </form>
          <button
            type="submit"
            onClick={onClick}
            className="bg-green-300 px-10 py-5 rounded hover:bg-green-400 hover:scale-110 transform transition-all"
            disabled={loading}
          >
            Upload
          </button>
          {error && (
            <p className="text-red-500 text-sm">
              `Error ${JSON.stringify(error)}`
            </p>
          )}
          {loading && <p>Uploading </p>}
        </div>
      </section>
    </>
  );
};

export default Upload;
