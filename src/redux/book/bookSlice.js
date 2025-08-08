import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  books: {},
}

console.log('huiiiiiii----->',initialState.books);

export const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers:{
        add:(state,action)=>{
            state.books=action.payload;
            // console.log('aaccction.payloadd----->',state.books)
        }
    }
})

export const {add} =bookSlice.actions

export default bookSlice.reducer;


