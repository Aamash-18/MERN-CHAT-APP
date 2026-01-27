import { createSlice } from "@reduxjs/toolkit";

const messageSlice= createSlice({
    name:"message",
    initialState:{
        messages:null
    },
    reducers:{
        setMessages(state,action){
            state.messages=action.payload;
        },
        clearAllMessages:(state,action)=>{
            state.messages=null;
        }
    }
})

export const {setMessages,clearAllMessages}=messageSlice.actions;
export default messageSlice.reducer;