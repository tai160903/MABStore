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
    _id: "",
    isAdmin: false,
    city: "",
  },
  reducers: {
    updateUser: (state, action) => {
      const {
        username = "",
        email = "",
        accessToken = "",
        avatar = "",
        address = "",
        phone = "",
        fullName = "",
        _id = "",
        isAdmin,
        city = "",
      } = action.payload;
      state.username = username;
      state.email = email;
      state.fullName = fullName;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state._id = _id;
      state.accessToken = accessToken;
      state.isAdmin = isAdmin;
      state.city = city;
    },

    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.accessToken = "";
      state._id = "";
      state.avatar = "";
      state.address = "";
      state.phone = "";
      state.fullName = "";
      state.isAdmin = false;
      state.city = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
