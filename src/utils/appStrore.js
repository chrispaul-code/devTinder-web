import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userSlice.js";


const appStore=configureStore({
  reducer:{
    user:counterReducer,
  },
})

export default appStore