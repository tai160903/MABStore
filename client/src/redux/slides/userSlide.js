import { createSlice } from "@reduxjs/toolkit";

export const userSlide = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    accessToken: "",
    fullName: "",
    phone: "",
    address: "",
    avatar: "",
    point: null,
    _id: "",
    isAdmin: false,
  },
  reducers: {
    updateUser: (state, action) => {
      const {
        username = "",
        email = "",
        accessToken = "",
        point = "",
        avatar = "",
        address = "",
        phone = "",
        fullName = "",
        _id = "",
        isAdmin,
      } = action.payload;
      state.username = username;
      state.email = email;
      state.fullName = fullName;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state._id = _id;
      state.point = point;
      state.accessToken = accessToken;
      state.isAdmin = isAdmin;
    },

    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.accessToken = "";
      state.point = null;
      state._id = "";
      state.avatar = "";
      state.address = "";
      state.phone = "";
      state.fullName = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
