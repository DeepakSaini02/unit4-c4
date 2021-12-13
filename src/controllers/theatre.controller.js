const path = require('path')
const User=require('../models/user.model')
const Movie=require('../models/movie.model')
const upload=require('../middlewares/upload')
const Show=require('../models/show.model')
const Screen=require('../models/screen.model')
const Theatre=require('../models/theatre.model')
const express=require('express')
const router=express.Router()

router.post('/',async(req,res)=>{
    try{
        const theatre=await Theatre.create(req.body)
        return res.status(201).send({theatre})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
})





module.exports=router