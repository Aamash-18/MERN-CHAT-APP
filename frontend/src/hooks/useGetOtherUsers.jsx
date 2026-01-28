import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOhterUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          "https://mern-chat-app-0neo.onrender.com/api/v1/user/",
        );
        // console.log(res);
        dispatch(setOtherUser(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchOhterUsers();
  }, []);
};

export default useGetOtherUsers;
