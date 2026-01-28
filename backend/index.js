import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173"
  ],
  credentials: true,
}));


// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// socket.io
export const io = new Server(server, {
  cors: {
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173"
  ],
  credentials: true,
},

});

const userSocketMap={};

export const getReceiverSocketId=(userId)=>{
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("New Device Connected:", socket.id);
  const userId=socket.handshake.query.userId;
  if(userId!== undefined){
      userSocketMap[userId]=socket.id;
  }

  io.emit('getOnlineUsers',Object.keys(userSocketMap));
  
  socket.on('disconnect',()=>{
    
    console.log(`User Disconected ${socket.id}`);
    if(userId){
      delete userSocketMap[userId];
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  })
});

// ✅ ONLY THIS should listen
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
});

