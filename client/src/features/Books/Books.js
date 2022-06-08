
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {Books as BookS} from "../Components/Books_";
import { Books as allbooks ,errors, fetchBooks} from "./BooksSlice";

const Books =  () => {
    const dispatch = useDispatch();
    const books =  useSelector(allbooks);
    const status = useSelector(state=>state.books.status);
    const error = useSelector(errors);
     
    useEffect(() => {
      const getBooks = async () =>{
        if (status === 'idle') {
     
     await dispatch(fetchBooks());
     
        }
      }
      getBooks();
    }, [status, dispatch]);
    let content;
    if (status === 'loading') {
        content = <p>Loading...</p>;
    } else if (status === 'succeeded') {
        const orderedBooks =  books.slice().sort((a, b) => b.name.localeCompare(a.name))
        content = <BookS books={orderedBooks} /> 
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <section>
           <h2> Books</h2>
            {content}
            
        </section>
    )
}
export default Books


