const express=require('express')

const app=express()
const connect=require('./configs/db')

app.use(express.json())

const {register,login}=require('./controllers/auth.controller')
const userController=require('./controllers/user.controller')
const showController=require('./controllers/show.controller')
const screenController=require('./controllers/screen.controller')
const seatController=require('./controllers/seat.controller')
const theatreController=require('./controllers/theatre.controller')

app.use("/movies",userController)
app.use("/shows",showController)
app.use("/theatre",theatreController)
app.use("/screens",screenController)
app.use("/seats",seatController)



app.post("/register",register)
app.post("/login",login)
app.listen(3000,async()=>{
    await connect()
    console.log('listening on port 3000');
})