import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
