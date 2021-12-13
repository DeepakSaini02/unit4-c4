require('dotenv').config();
const jwt=require('jsonwebtoken')
const User=require('../models/user.model')
const upload=require('../middlewares/upload')

const newToken=(user)=>{
    return jwt.sign({user:user},process.env.JWT_ACCESS_KEY)
}

const register=async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user)
        return res.status(400).json({status:'failed',message:'email exists'})

        user=await User.create(req.body)

        const token =newToken(user)

        res.status(201).json({user,token})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
}

const login=async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})

        if(!user)
        return res.status(400).json({status:'failed',message:'email not exists'})

        const same=await user.passwordCheck(req.body.password)

        if(!same)
        return res.status(400).json({status:'failed',message:'incorrect credentials'})

        const token =newToken(user)

        res.status(201).json({user,token})
    }catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
}

module.exports={register,login}