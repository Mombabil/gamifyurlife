import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice";
import datasReducer from "../feature/datas.slice";

export default configureStore({
  reducer: {
    user: userReducer,
    datas: datasReducer,
  },
});
