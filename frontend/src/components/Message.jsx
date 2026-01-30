import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { authUser } = useSelector((store) => store.user);
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  const formatIST = (utcDate) => {
    return new Date(utcDate).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div ref={scroll}>
      <div
        className={`chat ${
          authUser?._id === props.message.senderId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-header">
          <time className="text-xs opacity-50">
            {formatIST(props.message.createdAt)}
          </time>
        </div>
        <div className="chat-bubble break-words max-w-full">
          {props.message.message}
        </div>
        {/* <div className="chat-footer opacity-50">Seen</div> */}
      </div>
    </div>
  );
};

export default Message;
