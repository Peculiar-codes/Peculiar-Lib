
var Book = require("../models/bookModel");
var Author= require("../models/authorModel");
var Genre= require("../models/genremodel");
var Classification=require("../models/classModel");
var Tags=require ("../models/tagModel");
const { body, validationResult } = require("express-validator");

exports.getAuthors=[
body("author")
.isLength({min:1})
.withMessage("Too short"),
(req,res,next)=>{
   Author.find({})
   .exec((err,authorList)=>{
      if(err){
         return next(err);
      }
      if(author.List){
        /* res.render("authors",{
            authors:authorList
         })*/
         res.send(authorList)
      }
   })
}
];
exports.getAuthor=(req,res,next)=>{
   Author.findById(req.params.id)
   .exec((err, author)=>{
      if(err){
         return next(err);
      }
      if(author){
         /*res.render("author",{*/
         res.send({
           author:author,
           url:`/books/author/${authod._id}`
         });
         }
      });
};







