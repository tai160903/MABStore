import { createSlice } from "@reduxjs/toolkit";

export const userSlide = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    accessToken: "",
  },
  reducers: {
    updateUser: (state, action) => {
      const { username, email, accessToken } = action.payload;
      state.username = username || email;
      state.email = email;
      state.accessToken = accessToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
