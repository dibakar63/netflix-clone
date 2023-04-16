import express from'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
import path from 'path';
//import authRoutes from './routes/authRoute.js'
//configure env
dotenv.config()

//database config
connectDB()
//rest object
const app=express()
//middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth',authRoutes)
//static files
app.use(express.static(path.join(__dirname,'../client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
//restapi
app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to ecommerce app'
    })
})
//port
const PORT=process.env.PORT || 8080;
//const MODE=process.env.DEV_MODE || 'develpement';

//run
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);
})

//mongodb+srv://dibakardey63:<password>@recipes.rglhoml.mongodb.net/?retryWrites=true&w=majority
//abcdefgh1234