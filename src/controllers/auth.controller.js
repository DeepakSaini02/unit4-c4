require('dotenv').config();
const jwt=require('jsonwebtoken')
const User=require('../models/user.model')
const path=require('path')
const upload=require('../middlewares/upload')

const newToken=(user)=>{
    return jwt.sign({user:user},process.env.JWT_ACCESS_KEY)
}
const register=("/",upload.single("profile_photo_url"),async(req,res)=>{
    try{
                let user=await User.findOne({email:req.body.email}).lean().exec()
                if(user)
                return res.status(400).json({status:'failed',message:'email exists'})
                // upload.single("profile_photo_url")
        
            //    user = await User.create(req.body)
                 user=await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    // profile_photo_url:req.file.path,
                    roles:req.body.roles,
                })
        
                const token =newToken(user)
        
                res.status(201).json({user,token})
            }catch(e){
                return res.status(500).json({status:"failed",message:e.message})
            }
})



// const register=async(req,res)=>{
//     try{
//         let user=await User.findOne({email:req.body.email}).lean().exec()
//         if(user)
//         return res.status(400).json({status:'failed',message:'email exists'})
//         upload.single("profile_photo_url")

       
//          user=await User.create({
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password,
//             profile_photo_url:req.file.path,
//             roles:req.body.roles,
//         })

//         const token =newToken(user)

//         res.status(201).json({user,token})
//     }catch(e){
//         return res.status(500).json({status:"failed",message:e.message})
//     }
// }

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