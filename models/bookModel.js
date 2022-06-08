const mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Book=new Schema({
   name:{
      type:String,
      required:true,
      minLength:1,
      maxLength:50
   },
   author:{
      type:Object,
      required:true
   },
   genre:{
      type: Object,
      required:true
   },
   classification:{
      type:Object,
      required:true
   },
   summary:{
     type:String,
     required:true,
     maxLength:400,
   },
   story:{
     type:String
   },
   tags:{
     type: Object
   },
   date:{
     type:Date,
     default: Date.now
   }
});
Book
.virtual("bookName")
.get(()=>{
   return this.name
});
Book
.virtual("publishingDate")
.get(()=>{
  let date= Book.date;
   let months=["Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec"];
   let mon=date.getMonth();
   let month=months[mon];
   let year=date.getFullYear();
   let day=date.getDay();
   let dat=date.getDate();
   let hr=date.getHours();
   let min=date.getMinutes();
   if(min<10){
     min="0"+min;
   }
   let days=[
     "Sun",
     "Mon",
     "Tues",
     "Wed",
     "Thurs",
     "Fri",
     "Sat"
     ]
   let formattedDate=`${days[day]} ${dat} ${month}, ${year}   at ${hr}:${min}`;
   return formattedDate;
});
Book
.virtual("url")
.get(()=>{
   return "/books/book/"+this._id;
});
module.exports=mongoose.model("Book",Book)





