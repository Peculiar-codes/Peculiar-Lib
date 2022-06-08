const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Classification=new Schema({
   classification:{
      type:Array,
      required:true
   },
   books:{
     type: Array
   }
});
module.exports=mongoose.model("Classification",Classification)




