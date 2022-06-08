import { Link } from "react-router-dom";


import BookAuthor from "../Books/BookAuthor";
import Time from "../Books/Time";

const Book = ({ book , author }) =>{
  const url=`/books/book/${book._id}`;
  return (
    <>
    <h3 className="bg-red">{book.name}</h3>
  
    <BookAuthor userId={author} />
    
    <Time timestamp={book.date} />
    <Link to={url}>Read </Link>
    </>
    );
}

export default Book;