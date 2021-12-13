const path = require('path')
const User=require('../models/user.model')
const Movie=require('../models/movie.model')
const upload=require('../middlewares/upload')
const Show=require('../models/show.model')

// const User=require('../models/user.model')
const express=require('express')
const router=express.Router()

router.post('/',async(req,res)=>{
    try{
        const show=await Show.create(req.body)
        return res.status(201).send({show})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
})

router.get("/:movie",async(req,res)=>{
    try{
        const show=await Show.find({movie:req.params.movie}).populate("movie").lean().exec()
        return res.status(201).send({show})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
})





module.exports=router