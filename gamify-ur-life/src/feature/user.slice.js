import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authToken: null,
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.authToken = payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
