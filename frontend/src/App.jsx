import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing component
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setOnlineUser } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";

// creating router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// creating App componenet
function App() {
  const dispatch = useDispatch();
  const { authUser, onlineUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers));
      });
      return () => socket.close();
    }
  }, [authUser]);
  return (
    <>
      <div className="h-screen p-4 flex items-center justify-center ">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
