 const jwt=require('jsonwebtoken');
const { blacklist } = require('../blacklist');
 const auth=(req,res,next)=>{
  const token=req.headers.authorization;
  if(token){
    if(blacklist.includes(token)){
      res.send({'msg':'please login again'})
    }
    else{}
    jwt.verify(token,'secretKey',(err,decode)=>{
      if(decode){
          next()
      }
      else{
          res.send(err);
      }
    })
  }
 }



 module.exports={
    auth
 }