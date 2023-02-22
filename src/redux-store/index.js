import { configureStore } from "@reduxjs/toolkit";
import {commentReducer} from "./commentSlicer";

const store = configureStore({
    reducer:{
        comments : commentReducer,
    }
})

export default store;