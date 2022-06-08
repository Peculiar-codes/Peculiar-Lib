const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
function auth(req,res,next){
  const token= req.headers("token");
  if (!token) return res.status(401).json({ msg : " Not Authorized"});
  try{
    const decoded =  jwt.verify(token, process.env.jwt);
    req.user = decoded;
    next();
  }
  catch(e){
    return res.status(400).json({ msg : "Error: Token  not valid"});
  }
}

module.exports = auth;








