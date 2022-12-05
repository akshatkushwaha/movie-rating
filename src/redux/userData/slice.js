import { createSlice } from "@reduxjs/toolkit";

import { setLoginStatus, setLogoutStatus } from "./reducers";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    age: "",
    contact: "",
    createdAt: "",
    dob: "",
    email: "",
    email_verified_at: "",
    google_id: "",
    id: "",
    name: "",
    profile_photo_url: "",
    profile_photo_path: "",
    updatedAt: "",
  },
  reducers: {
    setLoginStatus,
    setLogoutStatus,
  },
});

// export const { setLoginStatus } = userDataSlice.actions;

// export default userDataSlice.reducer;
