const {Schema,model}=require('mongoose')

const seatSchema=new Schema({
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'show',
        required:true
    },
})

module.exports=model('seat',seatSchema)