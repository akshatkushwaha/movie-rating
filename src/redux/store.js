import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from "./userData/slice";

export default configureStore({
  reducer: {
    userData: userDataSlice.reducer,
  },
});
