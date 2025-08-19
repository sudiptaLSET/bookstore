import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
};

// console.log('huiiiiiii----->',initialState.books);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  
  reducers: {
    add: (state, action) => {
      state.books = [...state.books, ...action.payload];
      // console.log('aaccction.payloadd----->',state.books)
    },

    edit: (state, action) => {
      const index = state.books.findIndex(
        (item) => item.id === action.payload.id
      );

      console.log('found index ----->',index)
      console.log('To change ----->',state.books[index].volumeInfo.title);
      console.log('Changed value ----->',action.payload.volumeInfo.title);




      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    newAdd:(state,action)=>{
      console.log('To add---->',action.payload)
      state.books = [...action.payload,...state.books];
    }
  },
});

export const { add, edit,newAdd } = bookSlice.actions;

export default bookSlice.reducer;
