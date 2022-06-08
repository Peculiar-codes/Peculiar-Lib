import Book from "./Book_";

export const Books = ({ books  }) => {
  return(
    <>
    {books.map((book)=>
    <Book book={book} key={book._id} author={book.userId} />)}
    </>
    )
}