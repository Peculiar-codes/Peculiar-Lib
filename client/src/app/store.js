import { configureStore } from '@reduxjs/toolkit';
import  thunk  from "redux-thunk";
import counterReducer from '../features/counter/counterSlice';
import BooksReducer from '../features/Books/BooksSlice';
import GenreReducer from '../features/Genres/GenresSlice';
import TagsReducer from '../features/Tags/TagsSlice';
import ClassesReducer from '../features/Classes/ClassesSlice';
import AuthorsReducer from '../features/Authors/AuthorsSlice';
import UsersReducer from '../features/Users/UsersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: BooksReducer,
    authors: AuthorsReducer,
    genres: GenreReducer,
    tags: TagsReducer,
    users: UsersReducer,
    classes: ClassesReducer
  },
  middleware:[thunk]
});
