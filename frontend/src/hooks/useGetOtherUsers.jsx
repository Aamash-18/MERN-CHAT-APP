import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser) return;

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
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;
