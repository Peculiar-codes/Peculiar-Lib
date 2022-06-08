const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Author= new Schema({
   name:{
      type:String,
      required:true,
      maxLength:28
   },
   books:{
     type:Array
   },
   history:{
     type:String
   }
})

module.exports=mongoose.model("Author",Author)



