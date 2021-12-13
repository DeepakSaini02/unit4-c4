const {Schema,model}=require('mongoose')

const theatreSchema=new Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
  
})

module.exports=model('theatre',theatreSchema)