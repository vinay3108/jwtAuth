const express=require('express');
const mongoose=require('mongoose');
const app=express();
const authRoutes=require('./routes/authRoutes');
const dbUrl='mongodb://localhost:27017/jwtAuth';

app.use(express.json());
app.set('view engine','ejs');


mongoose.connect(dbUrl,{useNewUrlParser:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log("server running on port 3000");
    })

})
.catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("hello"); 
})

app.use(authRoutes);