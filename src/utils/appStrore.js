import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userSlice.js";
import feedReducer  from "./feedSlice.js"


const appStore=configureStore({
  reducer:{
    user:counterReducer,
    feed:feedReducer,
  },
})

export default appStore