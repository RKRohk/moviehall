//@ts-ignore
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";

//@ts-ignore
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import { FirebaseContext } from "../context/firebaseContext";
import {
  PAUSE_MUTATION,
  PLAY_MUTATION,
  SEEK_MUTATION,
  UPDATE_TIMESTAMP,
} from "../graphql/mutations";
import { GET_OWNER_QUERY } from "../graphql/queries";
import { SUBSCRIBE_TO_ACTION } from "../graphql/subscriptions";
import {
  ActionType,
  GetOwner,
  GetOwnerVariables,
  pause,
  pauseVariables,
  play,
  playVariables,
  seek,
  seekVariables,
  SubscribeToAction,
  SubscribeToActionVariables,
  update,
  updateVariables,
} from "../types/api";

const isVideoElement = (element: unknown): element is HTMLVideoElement => {
  return !!element;
};

interface VideoPlayerProps {
  uri: string;
  roomCode: string;
  startTime: number;
}
const VideoPlayer: React.VFC<VideoPlayerProps> = ({
  uri,
  roomCode,
  startTime,
}) => {
  const { auth } = useContext(FirebaseContext);

  const myUserId = auth.currentUser?.uid;

  const userName =
    auth.currentUser?.displayName ?? auth.currentUser?.email ?? "Not Logged In";

  const ref = useRef<any>(null);

  const { data, error, loading } = useQuery<GetOwner, GetOwnerVariables>(
    GET_OWNER_QUERY,
    { variables: { roomCode: roomCode } }
  );

  const [pause] = useMutation<pause, pauseVariables>(PAUSE_MUTATION, {
    variables: { roomCode },
  });

  const [play] = useMutation<play, playVariables>(PLAY_MUTATION, {
    variables: { roomCode },
  });

  const [seek] = useMutation<seek, seekVariables>(SEEK_MUTATION);

  const [update] = useMutation<update, updateVariables>(UPDATE_TIMESTAMP);

  const amIOwner = myUserId === data?.room?.owner.id;

  useSubscription<SubscribeToAction, SubscribeToActionVariables>(
    SUBSCRIBE_TO_ACTION,
    {
      variables: { roomCode, userName },
      skip: amIOwner,
      onSubscriptionData: (data) => {
        const videoElement = ref.current?.videoElement;
        if (isVideoElement(videoElement)) {
          if (!amIOwner) {
            const newData = data.subscriptionData.data?.messages;
            if (newData) {
              if (newData.actionType === ActionType.PAUSE) {
                videoElement.pause();
              }
              if (newData.actionType === ActionType.PLAY) {
                videoElement.play();
              }
              if (newData.actionType === ActionType.SEEK) {
                videoElement.currentTime = newData.actionTimeStamp ?? 0;
              }
            }
          }
        }
      },
    }
  );

  useLayoutEffect(() => {
    let interval: NodeJS.Timeout;
    const { player, ui, videoElement } = ref.current as any;
    if (isVideoElement(videoElement)) {
      const element = videoElement;

      //set start time
      console.log(startTime);
      element.currentTime = startTime;

      if (element.currentTime) {
        element.play();
      }

      //Add event listeners if owner
      if (myUserId === data?.room?.owner.id) {
        element.addEventListener("pause", (e) => {
          pause();
        });
        element.addEventListener("play", (e) => {
          play();
        });
        element.addEventListener("seeked", (e) => {
          seek({
            variables: {
              roomCode,
              timeStamp: Math.floor(videoElement.currentTime),
            },
          });
        });
        interval = setInterval(async () => {
          try {
            await update({
              variables: {
                roomCode,
                timeStamp: Math.floor(videoElement.currentTime),
              },
            });
          } catch (e) {
            console.error(e);
          }
        }, 1000);
      } else {
        element.addEventListener("pause", (e) => {
          e.preventDefault();
        });
        element.addEventListener("play", (e) => {
          e.preventDefault();
        });
        const config = {
          addSeekBar: false,
          addBigPlayButton: false,
          controlPanelElements: ["time_and_duration", "overflow_menu"],
          overflowMenuButtons: ["captions", "quality"],
        };
        if (ui) {
          ui.configure(config);
        }

        videoElement.controls = false;
      }
      return () => {
        return clearTimeout(interval);
      };
    }
  }, [ref.current, amIOwner]);

  return <ShakaPlayer ref={ref} src={uri} />;
};

export default VideoPlayer;
