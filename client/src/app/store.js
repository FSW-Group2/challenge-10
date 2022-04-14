import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import leadReducer from "../feature/leaderboard/leadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
  },
});
