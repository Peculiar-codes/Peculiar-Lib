import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  me
} from "react-router-dom";
import  Books  from './features/Books/Books';
import  CreateBook  from './features/Books/CreateBook';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <Books />}/>
    <Route path="/books" element={ <Books />}/>
    <Route path="/books/create" element={<CreateBook />}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
