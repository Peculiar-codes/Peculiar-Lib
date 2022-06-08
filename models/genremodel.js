const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Genre=new Schema({
  name:{
    type:String,
    required:true
  },
   books:{
     type:Array
   }
});
module.exports=mongoose.model("Genre",Genre)




