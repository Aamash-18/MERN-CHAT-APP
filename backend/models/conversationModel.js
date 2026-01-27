import mongoose from "mongoose";
const conversationModel=new mongoose.Schema({
    participants:[
        //will store id of each participants in conversation
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages:[
        //will store id of each message in current conversation
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
},{timestamps: true})
export const conversation=mongoose.model("Conversation",conversationModel);