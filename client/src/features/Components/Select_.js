import Options from "./Option_";
const Select = ({options , name, onChange , user}) =>{
  return (
    <select  name={name} onChange={onChange}>
    <Options value="" title="Pick an option"/>
    {options.map((option)=> 
    !user ? 
     ( <Options value={option.value} title={option.title} />) :
     ( <Options value={option._id} title={option.name} />)
    )}
    </select>
    )
}

export default Select;

  