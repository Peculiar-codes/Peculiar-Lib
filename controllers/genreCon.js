var Genre=require("../models/genremodel");

exports.getGenre=(req,res,next)=>{
   Genre.findOne({genre:req.params.genre})
   .exec((err,found)=>{
      if(err){
         return next(err);
      }
      if(found){
         res.send(req.params.genre)
      }
   })
};
exports.getGenres=(req,res,next)=>{
  Genre.find()
  .exec((err,genres)=>{
    if(err){
      console.log(err);
      return next(err);
    }
    else if(genres){
      res.send(genres)
    }
  })
}
