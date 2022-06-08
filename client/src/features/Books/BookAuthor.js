import { useSelector} from "react-redux";
import { allUsers } from "../Users/UsersSlice";
const BookAuthor = ({ userId }) =>{
  const Users = useSelector(allUsers);
  const author= Users.find(user=>user._id === userId);
  return (
    <span>
    by {author ? author.name : "an Unknown Author"}
    </span>
    )
}


export default BookAuthor;

