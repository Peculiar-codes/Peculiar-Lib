var Class=require("../models/classModel");

exports.getClass=(req,res,next)=>{
   Class.findOne({classification:req.params.clas})
   .exec((err,found)=>{
      if(err){
         return next(err);
      }
      if(found){
         res.send(found)
      }
   })
};
exports.getClasses=(req,res,next)=>{
  Class.find()
  .exec((err, classes)=>{
    if(err){
      return next(err)
    }
    else if(classes){
      res.send(classes)
    }
  })
}