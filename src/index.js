const express=require('express')

const app=express()
const connect=require('./configs/db')

app.use(express.json())

const {register,login}=require('./controllers/auth.controller')

app.post("/register",register)
app.listen(3000,async()=>{
    await connect()
    console.log('listening on port 3000');
})