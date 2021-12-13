const express=require('express')

const app=express()
const connect=require('./configs/db')

app.use(express.json())

app.listen(3000,async()=>{
    await connect()
    console.log('listening on port 3000');
})