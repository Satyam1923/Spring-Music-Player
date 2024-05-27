import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{
        username:"",
        isAuth:false,
        email:"",
    }
}

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:()=>{
            return initialState
        },
        logIn:(state,action)=>{
            return {
                value : {
                    isAuth:true,
                    email:action.payload.email
                }
            }
        },
        setUsername:(state,action) => {
            return {
                value : {
                    isAuth:true,
                    username:action.payload.username
                }
            }
        }
    }
})

export const {logIn,logOut,setUsername} = auth.actions;
export default auth.reducer;