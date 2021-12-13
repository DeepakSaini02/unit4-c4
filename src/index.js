const express=require('express')

const app=express()
const connect=require('./configs/db')

app.use(express.json())

const {register,login}=require('./controllers/auth.controller')
const userController=require('./controllers/user.controller')

app.use("/movies",userController)

app.post("/register",register)
app.post("/login",login)
app.listen(3000,async()=>{
    await connect()
    console.log('listening on port 3000');
})