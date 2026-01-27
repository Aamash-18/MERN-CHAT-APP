import {createSlice} from "@reduxjs/toolkit"

const userSlice= createSlice({
    name: "user",
    initialState: {
        authUser:null,
        otherUser:null,
        selectedUser:null,
        onlineUser:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUser:(state,action)=>{
            state.otherUser=action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload;
        },
        clearAllUser:(state,action)=>{
            state.authUser = null;
            state.otherUser = null;
            state.selectedUser = null;
        }
    }
});
export const {setAuthUser,setOtherUser,setSelectedUser,clearAllUser,setOnlineUser}= userSlice.actions;
export default userSlice.reducer;