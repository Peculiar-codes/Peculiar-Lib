import "../../Stylesheets/App.css";
const Input = ({ type , value , ph ,onChange})=>{
  return(
    <div className={type!=="submit" ? "InputCon":""}>
    <input type={type} placeholder={ph} value={value}  name={ph.toLowerCase()} onChange={onChange}/>
    </div>
    )
}
export default Input;