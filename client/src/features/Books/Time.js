import { parseISO, formatDistanceToNow } from "date-fns";


const Time = ({ timestamp }) =>{
  let timeago="";
  if(timestamp){
  let time = parseISO(timestamp);
  let dis = formatDistanceToNow(time);
  timeago = `${dis} ago`;
  }
  return (
    <>
    <span title={timestamp}>
    &nbsp; &nbsp; {timeago} 
    </span>
    </>
    )
}

export default Time;

