const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const dotenv = require("dotenv").config();
const auth = require("./middlewares/auth.js");
const jwt = require("jsonwebtoken")
// Load User model
require("../passport")(passport);
const User = require('../models/usermodel');
const ensureAuthenticated=(req, res, next)=>{
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  }
 const forwardAuthenticated=(req, res, next)=>{
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');      
  }

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.sendFile('login'));

// Register Page
router.get('/signup', (req, res) => res.sendFile('signup'));

// Register
router.post('/signup', (req, res) => {
  const { first_name ,last_name , email, password, password2 , tel ,username } = req.body;
  let errors = [];

  if (!first_name ||!last_name|| !email || !password || !password2, !tel,!username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({errors});
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
       return res.status(400).json({ msg: "Email already in existence"});
      } else {
         User.findOne({username:username})
         .then(user => {
      if (user) {
       return res.status(400).json({ msg:"User ame already in existence"});
      
      } else {
        const newUser = new User({
          first_name,
          last_name,
          email,
          password,
          username,
          tel
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            jwt.sign(
              { id : user._id},
              process.env.jwt,
              (err,token)
              );
            newUser
              .save()
              .then(user => {
                jwt.sign(
                  { id: user.id},
                  process.env.jwt,
                  (err,token)=>{
                    if (err) throw new err;
                    
            
                res.status(200).json({
                  token,
                  user:{
                    name: user.name,
                    id : user._id,
                    email: user.email,
                    tel : user.tel,
                    password : user.password
                  }
                })
                  }
                  )
              })
              .catch(err => res.status(400).json({ msg : err}));
          });
        });
      }
      });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
 const { email , password } = req.body;
 if(!email , ! password){
   return res.status(400).json({ msg: "Please enter all fields" });
 }
 User.findOne( { email: email} )
 .then((user)=>{
   if(!user) return res.staus(400).json({ msg : "User doesn't exist"});
   bcrypt.compare(password, user.password)
   .then(isMatch =>{
     if(!isMatch) return res.staus(400).json({ msg: "Wrong password"})
     jwt.sign(
       { id : user._id},
       process.env.jwt,
       (err,token)=>{
         if (err) throw new err;
         res.staus(200).json({
           token,
           user:{
             id: user._id,
             email: user.email,
             password: user.password,
             tel : user.tel,
           }
         })
       }
       )
   })
 });
});
router.get("/user/:user._id", (req,res)=>{
  User.findById(req.user._id)
  .select("-password")
  .then((user)=> res.json(user));
});
router.get("/users",(req,res)=>{
  User.find()
  .then(users=>res.json(users));
})
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
