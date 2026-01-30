import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUser } = useSelector(
    (store) => store.user,
  );
  const isOnline = onlineUser?.includes(selectedUser?._id);
  return (
    <>
      {selectedUser !== null ? (
        <div className="w-screen md:min-w-[550px] md:max-w-[550px] h-screen md:h-[80vh] flex flex-col  overflow-hidden">
          <div className="flex gap-4 items-center bg-gray-800 rounded-lg p-2 pl-15 md:pl-6">
            {/* Profile photo  */}
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="userProfile" />
              </div>
            </div>
            {/* Name  */}
            <div>{selectedUser?.fullname}</div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="w-screen md:min-w-[550px] h-screen md:h-[80vh] flex flex-col justify-center items-center text-center px-4  overflow-hidden">
          <h1 className="text-2xl md:text-4xl text-white font-bold">
            Hi, {authUser?.fullname}{" "}
          </h1>
          <h1 className="text-lg md:text-2xl text-white mt-2">
            Let's start conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
