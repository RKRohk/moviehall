//@ts-ignore
import { useSubscription } from "@apollo/client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import YouTube from "react-youtube";
// import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";

interface VideoPlayerProps {
  uri: String;
}
const VideoPlayer = () => {
  // return <ShakaPlayer />

  return <video src="" />;
};

export default VideoPlayer;
