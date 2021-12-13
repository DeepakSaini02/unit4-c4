const path = require('path')
const User=require('../models/user.model')
const Movie=require('../models/movie.model')
const upload=require('../middlewares/upload')
const Show=require('../models/show.model')
// const User=require('../models/user.model')
const express=require('express')
const router=express.Router()

router.post('/',upload.single("poster_url"),async(req,res)=>{
    try{
        const movie=await Movie.create({
            name:req.body.name,
            actors:req.body.actors,
            languages:req.body.languages,
            directors:req.body.directors,
            poster_url:req.file.path
        })
        return res.status(201).send({movie})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
})





module.exports=router