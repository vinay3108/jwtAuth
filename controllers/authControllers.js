const express=require('express');
const User=require('../models/userModel');
const {handleErrors}=require('../utility/handleError');

const jwt=require('jsonwebtoken');
const maxAge=24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},"hello my name is vinay",{
        expiresIn:maxAge,

    })
}
exports.getSignup=(req,res)=>{
    // res.send("signup");
    res.render('signup');
}

exports.postSignup=async(req,res)=>{
    const {email,password}=req.body;
    try{

        const user=await User.create({email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err){
       const errors= handleErrors(err);
        res.status(401).json({errors});
    }
}

exports.getLogin=(req,res)=>{
    // res.send("login get");
    res.render('login')
}

exports.postLogin=async(req,res)=>{
  const {email,password}=req.body;
  try{
      //static method login 
      const user=await User.login(email,password);
      const token=createToken(user._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(201).json({user:user._id});

  }catch(err)
  {
      const errors=handleErrors(err);
      res.status(400).json({errors});
  }
}

exports.logout=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/hello');
}