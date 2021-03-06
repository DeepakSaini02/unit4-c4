const bcrypt = require('bcryptjs/dist/bcrypt')
const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    // profile_photo_url:{type:String,required:true},
    roles:{type:String,required:true},
})

userSchema.pre('save',function(next){
    if(!this.isModified('password')) return next()

    bcrypt.hash(this.password,10,(err,hash)=>{
        this.password=hash
        return next();
    })
})

userSchema.methods.passwordCheck=function (password){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, this.password, function(err, match) {
            if(err) return reject(err)
            return resolve(match)
        });
    })
}


module.exports=model('user',userSchema)