import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const BOOKS_URL = 'http://localhost:5000/books/';

const initialState = {
    books: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get(BOOKS_URL);
    return response.data;
});

export const addNewBook = createAsyncThunk('books/addNewBook', async (initialBooks) => {
    const response = await axios.post(BOOKS_URL, initialBooks)
    return response.data
})


const BooksSlice = createSlice({
   name:"books",
   initialState,
   reducers:{
     createBook:{
       reducer(state,action){
       state.push(action.payload)
     },
     prepare(name,genre,tags,classes,summary,userId){
       return{
         payload:{
           _id:nanoid(),
           name,
           genre,
           tags,
           classes,
           summary,
           userId,
           date:sub(new Date().toISOString()),
         }
       }
     }
     }},
     extraReducers(builder) {
        builder
            .addCase(fetchBooks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched books to the array
                state.books = state.books.concat(action.payload)
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewBook.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    eyes: 0
                }
                alert(action.payload)
                state.posts.push(action.payload)
            })
   }
});

export const Books = (state) => state.books.books;
export const errors = (state) => state.books.error;
export const stats = (state) => state.books.status;
export const { createBook } = BooksSlice.actions;

export default BooksSlice.reducer;
