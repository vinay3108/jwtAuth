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
        res.status(201).json(user._id);
    }
    catch(err){
       const error= handleErrors(err);
        res.status(401).json(error);
    }
}

exports.getLogin=(req,res)=>{
    // res.send("login get");
    res.render('login')
}

exports.postLogin=(req,res)=>{
    console.log(req.body);
    res.send("post Login");
}