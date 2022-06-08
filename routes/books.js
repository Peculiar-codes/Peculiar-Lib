var express = require("express");
const app = express();
const classCon = require("../controllers/classCon");
const authorCon = require("../controllers/authorCon");
const genreCon = require("../controllers/genreCon");
const bookCon = require("../controllers/bookCon");
const tagCon = require("../controllers/tagCon");
const auth = require("./middlewares/auth.js");
const router = express.Router();
/*var loggedIn=(req, res, next)=>{
    if (req.user) {
        next();
    } else {
        res.redirect('/users/login');
    }
}*/
router.get("/",bookCon.index)
router.post("/",bookCon.createBook)
router.get("/createBook",auth,(req, res, next) => {
  res.render("createBook");
});
router.get("/book/:id",bookCon.getBook);
router.put("/book/:id",bookCon.book_update_post);
router.delete("/book/:id",bookCon.book_delete_post);
router.get("/authors/:id", auth, authorCon.getAuthor);
router.get("/authors",auth, authorCon.getAuthors)
router.get("/genres/:genre", auth, genreCon.getGenre);
router.get("/genres",auth, genreCon.getGenres)
router.get("/class/:clas", auth, classCon.getClass);
router.get("classes",auth,classCon.getClasses)
router.get("/tags/:tag", auth, tagCon.getTag);
router.get("/tags",auth,tagCon.getTags);
module.exports = router;











