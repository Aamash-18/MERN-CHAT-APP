import { getReceiverSocketId } from "../index.js";
import { conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import {io} from "../index.js"
export const sendMessage=async(req,res)=>{
    try{
        //we will need sender and reciever id
        const senderId=req.id;
        const recieverId=req.params.id;
        const {message}=req.body;
        let getConversation=await conversation.findOne({
            participants:{$all : [senderId,recieverId]}
        });
        if(!getConversation){
            getConversation=await conversation.create({
                participants:[senderId, recieverId]
            })
        }
        const newMessage=await Message.create({
            senderId,
            recieverId,
            message,
        })
        if(newMessage){
            getConversation.messages.push(newMessage._id);
        }
        await getConversation.save(); 

        //will use socket io here..
       
        const receiverSocketId = getReceiverSocketId(recieverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({newMessage});
        //Socket IO Logic
    }catch(err){
        console.log(err);
    }
}

export const getMessage=async (req,res)=>{
    try{
        const senderId=req.id;
        const recieverId= req.params.id;
        const getConversation=await conversation.findOne({
            participants: {$all : [senderId, recieverId]}
        }).populate("messages");
        return res.status(200).json(getConversation?.messages);
    }catch(err){
        console.log(err);
    }
}