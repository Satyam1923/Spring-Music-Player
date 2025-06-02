import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer,
  },
});

// Types for use in typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
