import Input_ from "../Components/Input_";
import Select_ from "../Components/Select_";
import { useReducer, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { EditBook as updateBook, getBook ,DelBook as delBook }  from "./BooksSlice";
import { BookAuthor }  from "./BookAuthor";
import { allUsers }  from "../Users/UsersSlice";
import { useParams ,useNavigate } from "react-router-dom";
const EditBook = () =>{
  const { id} = useParams();
  const navigate = useNavigate();
  const book = useSelector((state)=> getBook(state,Number(id)))
  var dispatch= useDispatch();
  const Users = useSelector(allUsers);
  const create = (e) =>{
    e.preventDefault();
      let name= state.name;
      let story= state.story;
      let sum = state.summary;
      let genre = state.genre;
      let tag = state.tag;
      let classification = state.classes;
      let authorHis= state.authorHis;
      let userId = state.userId;
      dispatch(
        updateBook({
          name,
          summary:sum,
          authorHis:authorHis,
          authorImg:"",
          date:new Date(),
          image:"",
          genre,
          classification,
          tag,
          userId,
          story
        })
      ).unwrap();
      setState({
        type:"reset"
      });
      navigate(`/books/${id}`);
    }
  const del = (e) =>{
    e.preventDefault();
      let userId = state.userId;
      dispatch(
        delBook({

          userId
        })
      ).unwrap();
      setState({
        type:"reset"
      });
      navigate(`/books`);
    }
 const reducer = (state,action) => {
    switch (action.type) {
      case 'setName':
        return{
          ...state,
          name:action.payload
        }
        break;
      case 'setSummary':
        return{
          ...state,
          summary:action.payload
        }
        break;
      case 'setTags':
        return {
          ...state,
          tag:action.payload
        }
        break;
      case 'setGenre':
        return {
          ...state,
          genre:action.payload
        }
        break;
      case 'setClasses':
        
        return {
          ...state,
          classes:action.payload
        }
        break;
     case 'setUser':
       return {
         ...state,
         userId: action.payload
       }
       break;
      
      case 'reset':
        return initialState
        break;
      
      default:
        return state
    }
  };
  const initialState={
     name: book.name,
     summary:book.summary,
     classes:book.classification,
     tag:book.tag,
     genre:book.genre,
     story:book.story,
     authorHis:book.authorHis,
     userId:""
  }
  const [state , setState] = useReducer(reducer, initialState);
const genres=[
    {value:"poetry",title:"Poetry"},
    {value:"drama",title:"Drama"},
    {value:"prose",title:"Prose"}
    ];
const classes=[
  {value:"myth", title:"Myth"},
  {value:"crime", title:"Crime"},
  {value:"mystery", title:"Mystery"},
  {value:"misery", title:"Misery"},
  {value:"comedy", title:"Comedy"},
  {value:"tragedy", title:"Tragedy"},
  {value:"action", title:"Action"},
  {value:"thriller", title:"Thriller"},
  {value:"romance", title:"Romance"},
  {value:"ancient", title:"Ancient"},
  ];
   return (
     <>
     <form>
    <Input_ type="text" ph="Name" value={state.name} onChange={(e)=>{
      setState({
      type:"setName",
      payload:e.target.value
    })
    }  
    }/>
     <Input_ type="text" ph="summary" value={state.summary} onChange={(e)=>{
       setState({
         type:"setSummary",
         payload:e.target.value
       })
     }}/>
     <Input_ type="text" ph="tag" value={state.tag} onChange={(e)=>{
       setState({
         type:"setTags",
         payload:e.target.value
       })
     }}/>
     <Select_ options={genres} name="genre" value={state.genre} onChange={(e)=>{
       setState({
         type:"setGenre",
         payload:e.target.value
       })
     }}/>
     <Select_
     options={Users} 
     name="user"
     value={state.userId}
     user = {true}
     onChange={(e)=>{
       setState({
         type:"setUser",
         payload:e.target.value
       })
     }}
     />
     <Select_ 
     options={classes} 
     value={state.classes}
     name="classification" onChange={(e)=>{
       setState({
       type:"setClasses",
       payload:e.target.value
       })
     }}/>
     <input type="submit" value="submit" onClick={create}/>
     <button onClick={del}>Delete Book</button>
     </form>
     </>
     );
};

export default EditBook;