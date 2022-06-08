var express = require("express");
var router = express.Router();
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('users/login');
    }
}
/* GET home page. */
router.get("/",loggedIn, function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
