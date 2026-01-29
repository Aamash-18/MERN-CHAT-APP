import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          "https://mern-chat-app-0neo.onrender.com/api/v1/user/",
          {
            withCredentials: true,
          },
        );

        dispatch(setOtherUser(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
