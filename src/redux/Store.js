import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice"
import studentReducer from "./reducers/studentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student:studentReducer
  },
});

export const RootState = {
  auth: { user: null, loading: false, error: null },
};
