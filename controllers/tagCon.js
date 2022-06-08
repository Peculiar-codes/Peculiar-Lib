var Tag=require("../models/tagModel");

exports.getTag=(req,res,next)=>{
   Tag.findOne({tags:req.params.tag})
   .exec((err,found)=>{
      if(err){
         return next(err);
      }
      if(found){
         res.send(found)
      }
   })
};
exports.getTags=(req,res,next)=>{
  Tag.find()
  .exec((err,tags)=>{
    if(err){
      return next(err)
    }
    else{
      if(tags){
        res.send(tags)
      }
    }
  });
}