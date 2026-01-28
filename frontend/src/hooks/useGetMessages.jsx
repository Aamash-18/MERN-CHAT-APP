import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://mern-chat-app-0neo.onrender.com/api/v1/message/${selectedUser?._id}`,
        );
        dispatch(setMessages(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessage();
  }, [selectedUser]);
};

export default useGetMessages;
