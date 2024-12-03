import { useDoubleClick } from "@/core/hooks/useDoubleClick";
import { IUserConnected } from "@/core/models/IWSConnectionData";
import React, { useEffect, useRef, useState } from "react";
import "./video-participant.scss";

interface IVideoParticipantProps {
  peer?: any;
  stream?: any;
  user: IUserConnected;
  isLocalUser: any;
  className?: string;
  onClick: () => void;
  onDoubleClick: () => void;
}

const VideoParticipant: React.FC<IVideoParticipantProps> = ({
  peer,
  user,
  isLocalUser,
  className,
  onClick,
  onDoubleClick,
  stream,
}) => {
  const [isMouseHovering, setMouseHovering] = useState(false);
  const videoRef = useRef(null);

  // These Hover methods are just for style purposes
  const mouseHoverIn = () => {
    setMouseHovering(true);
  };

  const mouseHoverOut = () => {
    setMouseHovering(false);
  };

  useEffect(() => {
    // remote stream is added to video tags
    if (peer && user && !isLocalUser) {
      peer.on("stream", (stream: any) => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [peer, user, isLocalUser]);

  // if (isLocalUser) {
  //   videoDivClass = classes.localVideoDiv;
  // } else {
  //   videoDivClass = classes.remoteVideoDiv;

  //   if (isMouseHovering) {
  //     style = { opacity: 1 };
  //   } else {
  //     style = { opacity: 0 };
  //   }
  // }

  const handleMainDoubleClick = useDoubleClick(
    () => {
      onDoubleClick();
    },
    () => {
      onClick();
    }
  );

  useEffect(() => {
    if (isLocalUser && stream != null) {
      videoRef.current.srcObject = stream;
    }
  }, [isLocalUser, stream]);

  return (
    <div
      className={`video-participant ${className ? className : ""}`}
      onMouseOver={mouseHoverIn}
      onMouseOut={mouseHoverOut}
      onClick={handleMainDoubleClick}
    >
      <a href="#" className="video-participant__username">
        {user ? user.user_full_name : "Anonymous"}
      </a>
      <video ref={videoRef} autoPlay={true} muted={isLocalUser}></video>
    </div>
  );
};

export default VideoParticipant;
