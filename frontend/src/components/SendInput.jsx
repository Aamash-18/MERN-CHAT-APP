import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.messages);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} action="#" className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" border border-zinc-500 rounded-lg block w-full bg-white text-gray-900 p-3"
          placeholder="send a message"
        />
        <button
          type="submit"
          className=" flex items-center pr-4 absolute text-black end-0 inset-y-0"
        >
          {" "}
          <IoSend />{" "}
        </button>
      </div>
    </form>
  );
};

export default SendInput;
