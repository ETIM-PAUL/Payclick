
import { useRef, useEffect } from "react";

function VideoItem({ videoStream, audioStream, muted }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    videoRef.current && videoStream?.attach(videoRef.current);
    audioRef.current && audioStream?.attach(audioRef.current);
  }, [videoStream, audioStream]);

  return (
    <>
      <video
        autoPlay
        ref={videoRef}
        className="w-full"
      ></video>
      <audio
        muted={muted}
        autoPlay
        ref={audioRef}
      ></audio>
    </>
  );
}

export default VideoItem;
