const {Schema,model}=require('mongoose')

const screenSchema=new Schema({
    name:{type:String,required:true},
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theatre',
        required:true
    }
  
})

module.exports=model('screen',screenSchema)