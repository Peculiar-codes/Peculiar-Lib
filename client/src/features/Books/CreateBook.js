import Input from "../Components/Input_";
import Select from "../Components/Select_";
import { useReducer } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addNewBook}  from "./BooksSlice";
import { allUsers }  from "../Users/UsersSlice";
import Button from "@material-ui/core/Button"
const CreateBook = (e) =>{
  var dispatch= useDispatch();
  const Users = useSelector(allUsers);
  const create = (e) =>{
    e.preventDefault();
      let name= state.name;
      let story= "";
      let sum = state.summary;
      let genre = state.genre;
      let tag = state.tag;
      let classification = state.classes;
      let userId = state.userId;
      dispatch(
        addNewBook({
          name,
          summary:sum,
          authorHis:"",
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
      })
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
     name:"",
     summary:"",
     classes:"",
     tag:"",
     genre:"",
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
     <form className="container bg-blue-400 text-blue-700 shadow-xl">
    <Input type="text" ph="Name" value={state.name} onChange={(e)=>{
      setState({
      type:"setName",
      payload:e.target.value
    })
    }  
    }/>
     <Input type="text" ph="summary" value={state.summary} onChange={(e)=>{
       setState({
         type:"setSummary",
         payload:e.target.value
       })
     }}/>
     <Input type="text" ph="tag" value={state.tag} onChange={(e)=>{
       setState({
         type:"setTags",
         payload:e.target.value
       })
     }}/>
     <Select options={genres} name="genre" value={state.genre} onChange={(e)=>{
       setState({
         type:"setGenre",
         payload:e.target.value
       })
     }}/>
     <Select
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
     <Select 
     options={classes} 
     value={state.classes}
     name="classification" onChange={(e)=>{
       setState({
       type:"setClasses",
       payload:e.target.value
       })
     }}/>
     <input type="submit" value="submit" className="btn" onClick={create}/>
     <Button type="submit" variant="contained" color="primary">
     6h
     </Button>
     </form>
     </>
     );
};

export default CreateBook;