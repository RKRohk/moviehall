//@ts-ignore
import { useEffect, useLayoutEffect, useRef } from "react";
// import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";

interface VideoPlayerProps {
  uri: String;
}
const VideoPlayer = () => {
  // return <ShakaPlayer />
  const ref = useRef<HTMLIFrameElement>(null);

  return (
    <iframe
      src="https://drive.google.com/file/d/1_A-GlpwOTSBZIQvNEaFVJm3jbL8nfEgo/preview?enablejsapi=1"
      allow="autoplay"
      className="h-screen w-full py-5"
      ref={ref}
      onPause={(e) => {
        console.log("PAUSED");
      }}
    ></iframe>
  );
};

export default VideoPlayer;
