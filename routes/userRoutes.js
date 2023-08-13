const express=require('express');
const userRouter=express.Router();
const {userModel}=require('../model/userModel')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const blacklist=require('../blacklist')

userRouter.post('/register',async(req,res)=>{
    // res.send('page');
   const {username,email,pass,age}=req.body
   try{


  bcrypt.hash(pass,5, async(err,hash)=>{
       if(err) res.send({'msg':err});
       else {
           const user=new userModel({username,email,pass:hash,age});
           await user.save();
           res.status(200).send({'msg':'new user has been registered'})
       }
  });

   }
   catch(err){
    res.status(400).send({'err':err});
   }
})




userRouter.post('/login',async(req,res)=>{
    // res.send('Login page');
   

    const {email,pass}=req.body;
    try{
        const user=await userModel.findOne({email:email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
               if(result){

                   const token=jwt.sign({course:'node'},'secretkey',{expiresIn:10})
                   
                   const refreshToken=jwt.sign({batch:'web24'},'key',{
                       expiresIn:240
                    })
                    res.status(200).send({'msg':'login succesfull',token:token,rToken:refreshToken});
              
                }
               else{
                    res.send({'msg':err});
               }
            })
        }
        else{
            res.status(200).send({'msg':'wrong crendentials'})
        }
    }
    catch(err){
         res.status(400).send({'err':err});
    }
})



userRouter.get('/logout',async(req,res)=>{
    const token=req.headers.authorization;
    try{
     blacklist.push(token);
     res.send({'msg':'the userr has been logged out'})
    }
    catch(err){
        res.send(err);
    }
})


module.exports={
userRouter
}