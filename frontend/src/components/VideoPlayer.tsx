//@ts-ignore
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';


interface VideoPlayerProps {
    uri: String
}
const VideoPlayer = () => {
    return <ShakaPlayer />
}

export default VideoPlayer