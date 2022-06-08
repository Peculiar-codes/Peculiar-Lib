import { createSlice , nanoid } from "@reduxjs/toolkit";


const initialState =[
  {
    _id:"special",
    name:"Lorem"
  }
  ]
const UsersSlice = createSlice({
   name:"users",
   initialState,
   reducers:{
     createUser:{
       reducer(state,action){
       state.push(action.payload)
     },
     prepare(name){
       return{
         payload:{
           _id:nanoid(),
           name
         }
       }
     }
     }
   }
});

export const allUsers = (state) => state.users;
export const { createUser } = UsersSlice.actions;

export default UsersSlice.reducer;
