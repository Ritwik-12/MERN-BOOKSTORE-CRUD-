import express from "express";
import {PORT} from "./config.js "
import {mongodbURL} from './config.js'
import mongoose from "mongoose"
import {Book} from './models/book.model.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app=express() 

//middle ware to parsing request body

app.use(express.json());

//Middleware to handle cors policy
//option1:Allow all origins with default of cors(*)

app.use(cors());
//Option 2:Allow custom origin

// app.use(
//     cors({
//     origin:'http://localhost/3000',
//     method:['GET','POST','PUT','DELETE'],
//     allowedHeader:['Content-Type'],
//     })
// );


app.get('/',(req,res)=>{
    
    // console.log(req)
    return res.status(234).send("welcome to mern stack tutorial")
})

app.use('/books',booksRoute)

//database connection
mongoose.connect(mongodbURL)
.then(()=>{
    console.log("App connected to database ")
    app.listen(PORT,()=>{
        console.log(`The app is listing at port ${PORT}`)
    });
})
.catch((error)=>{
   console.log(error)
})
