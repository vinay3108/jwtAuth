const express=require('express');
const User=require('../models/userModel');
const {handleErrors}=require('../utility/handleError');

exports.getSignup=(req,res)=>{
    res.send("signup");
}

exports.postSignup=async(req,res)=>{
    const {email,password}=req.body;
    try{

        const user=await User.create({email,password});
        res.status(201).json(user);
    }
    catch(err){
       const error= handleErrors(err);
        res.status(401).json(error);
    }
}

exports.getLogin=(req,res)=>{
    res.send("login get");
}

exports.postLogin=(req,res)=>{
    console.log(req.body);
    res.send("post Login");
}