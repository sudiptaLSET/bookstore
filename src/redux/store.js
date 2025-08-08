import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../redux/book/bookSlice'
export const store = configureStore({
  reducer: {
    book:bookReducer
  },
})