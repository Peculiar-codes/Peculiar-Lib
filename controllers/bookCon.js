var Book = require("../models/bookModel");
var User = require("../models/usermodel");
var Author= require("../models/authorModel");
var Genre= require("../models/genremodel");
var Classification=require("../models/classModel");
var Tags=require ("../models/tagModel");
const { body, validationResult } = require("express-validator");
/*var flash = require​(​'​connect-flash​'​)​;
var app = express();
 
app.configure(function(){
  app.use(express.cookieParser(('keyboard cat'));
  app.use(express.session({cookie:{maxAge:60000}}));
  app.use(flash());
});*/
exports.index=(req,res,next)=>{
  var user=req.user;
  Book.find()
  .sort({ name:1})
  .populate('author')
  .exec((err,tbook)=>{
    if(err){
      return next(err)
    }
    console.log(tbook);
    let author=Author.findOne({"name":tbook.author});
    let genre=Genre.findOne({"name":tbook.genre});
    let classification=Classification.findOne({"name":tbook.classification})
    if(user){
      var username=user.username;
    }
   /* res.render("index",*/
   res.send(tbook)
  });
}
exports.createBook = [
  // Validate and sanitize the name field.
  body("name", "Book's name is Required")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    var tags=new Tags({
       tag:req.body.tag,
       books:book
    });
    Tags.findOne({
       tag:req.body.tag
    })
    .exec((err,found_tag)=>{
       if(err){
          return  next(err);
       }
       if(found_tag){
          book.tags.id=found_tag._id;
          found_tag.books.push(book);
       }
       else{
          book.tags.id=tag._id;
    tags.save((err)=>{
       if(err){
          return next(err);
       }
       tags.books.push(book)
    });
    }
   });
    var author= new Author({
       name:req.body.userId,
       image:req.body.authorImg,
       history:req.body.authorHis,
       books:book
    });
    var genre= new Genre({
       name:req.body.genre,
       books:book
    });
    var classification= new Classification({
        classification:req.body.classification,
        books:book

    })
      
    Genre.findOne({
       "name":req.body.genre
    })
    .exec( function(err, found_genre) {
           if (err) { return next(err); }

           if (found_genre) {
             book.genre.id= found_genre._id;
              found_genre.books.push(book);
              }
              else{
                book.genre.id=genre._id;
    
    genre.save(function (err) {
               if (err) { return next(err);
               genre.books.push(book)}
             
    })
              }
    })
    Classification.findOne({
       "name":req.body.classification
    })
      .exec( function(err, found_class) {
           if (err) { return next(err); }

           if (found_class) {
             book.classification.id=found_class._id;
              found_class.books.push(book);
              }
              else{
    book.classification.id=classification._id;
    classification.save(function (err) {
               if (err) { return next(err); }
             classification.books.push(book);
    })
              }
      })
   /* Author.find({"name":req.body.userId})
        .exec( function(err, found_author) {
           if (err) {
             console.log("author orobs" +err);
             return next(err); }

           if (found_author) {
              found_author.books.push(book);
              }
              else{
    author.save(function (err) {
      
               if (err) { 
                 console.log("Saving"+err);
                 return next(err); }
              author.books.push(book)
    })
              }});*/
    var book=new Book({
       name:req.body.name,
       author:author,
       tags:tags,
       classification:classification,
       summary:req.body.summary,
       story:req.body.story,
       genre:genre,
       image:req.body.image,
       date:req.body.date,
       reactions:{
         like:0,
         likedby:[],
         comments:0,
         commentsBy:[],
         wow:0,
         wowBy:[],
         read:0,
         readBy:[]
       }
    })
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      console.log(errors);
      res.status(400).json({ message: errors});
      return;
    } else {   
      console.log("Book ",book);
      console.log("Author: ",author);
      console.log("tags: ",tags);
      console.log(classification);
      console.log("genre:",genre)
      book.save((err,b)=>{
        if(err){
          return next(err);
        }
        console.log("saved");
      })
          /*  res.render("books",{
               books:book
            });*/
       //     req.flash("book",book);
       res.status(200).json({msg:"Saved"});
            /*res.redirect("/books/book/"+book._id);*/
    }
  },
];
exports.getBook =[
  body("bookName", "No books name").trim().isLength({ min: 1 }).escape(),
    (req,res,next) =>{
      console.log("Params:"+req.params.id);
      console.log('Body:'+req.body);
    Book.findById(req.params.id)
    .exec(function (
        err,
        found_book
      ) {
        if (err) {
          console.log("Couldn't Find the book")
          return next(err);
        }

        if (found_book) {
           console.log(found_book);
            //  res.redirect(found_user.url)
              /*res.render("book",{
                 book:*/
                res.send(found_book)
           
        } else {
            return next(err);
              }
});
}
];
exports.book_delete_post=[
body("bookName", "Book's name is Required")
  .trim()
  .isLength({ min: 1 })
  .escape()

,(req,res,next)=>{
   const errors = validationResult(req);
Book.findById(req.params.id).exec(function (
        err,
        found_book
      ) {
        if (err) {
          return next(err);
        }

        if (found_book) {
           console.log(found_book);
              //res.redirect(found_user.url);
Book.findByIdAndRemove(found_book.id,(err)=>{
   if(!err){
               res.status(200).json({msg:"Deleted"});
          } 
         else {
            res.status(400).json({msg:"Couldn't delete book"});
              }
        }); 
        }    
});
}];
exports.book_update_post=(req,res,next)=>{
   var book=new Book(
     { name: req.body.bookName,
        author: req.body.author,
        genre: req.body.genre,
        classification: req.body.classification,
        tags:req.body.tags,
        _id:req.body.id })
   Book.findById(req.params.id).exec((err,book)=>{
      if(err){
         return next(err);
      }
      if(book){
         Book.findByIdAndUpdate(req.params.id,book,{},(err,thebook)=>{
            if(err){
               return next(err)
               }
               res.redirect(`/books/book/${thebook._id}`)
            })
         }
      });
   }











































