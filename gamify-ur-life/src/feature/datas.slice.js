import { createSlice } from "@reduxjs/toolkit";

export const datasSlice = createSlice({
  name: "datas",
  initialState: {
    data: null,
  },
  reducers: {
    getDatas: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getDatas } = datasSlice.actions;
export default datasSlice.reducer;
