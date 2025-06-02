import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import musicPlayerReducer from "./features/musicPlayer/musicPlayer";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    musicPlayer: musicPlayerReducer,
  },
});

// Types for use in typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
