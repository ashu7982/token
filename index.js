const express=require('express');
const {connection}=require('./db');
const app=express();
const auth=require('./middleware/auth.middleware')
const {userRouter}=require('./routes/userRoutes')
app.use(express.json());
app.use('/users',userRouter);
app.get('/',(req,res)=>{
    res.setHeader('Content-type','text/html');
    res.send('<h1>welcome to homePage</h1>');
})

app.get('/about',(req,res)=>{
    res.status(200).send('about page')
})


app.get('/movies',auth,(req,res)=>{
    
    res.send('movie data');
   

})


//regenerate primary token
app.get('/regeneratetoken',(req,res)=>{
    const rToken=req.headers.authorization;
    const decoded=jwt.verify(rToken,'key');
    if(decoded){
        const token=jwt.sign({course:'backend'},'secretKey',{
            expiresIn:30
        })
        res.send({'regenrated token':token})
    }
    else{
        res.send({'msg':'err'})
    }
})



app.listen(8000,async()=>{
    try{
        await connection;
        console.log('connected to db');
        console.log('running on port 8000');
    }
    catch(err){
        console.log(err);
    }
})