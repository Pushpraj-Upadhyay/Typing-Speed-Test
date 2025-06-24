import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./slices/typingSlice.js";

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});
