
import express from "express"
const router=express.Router()
import { Book } from "../models/book.model.js";


//ROute for save a new book
router.post('/', async(request,response)=>{
    try{
           if(!request.body.title || !request.body.author || !request.body.publishYear ){
               return response.status(400).send({
                 message:'send all required field title author PublisYear'
               });
           }
           const newBook={
             title:request.body.title,
             author:request.body.author,
             publishYear:request.body.publishYear
           }
             const book=await Book.create(newBook)
           return response.status(201).send(book);
 
    }catch(error){
     console.log(error.message)
     response.status(500)
    }
 })
 
 
 //Routes for get all books from database 
 
 router.get('/', async(request,response)=>{
         try{
 
                 const books=await Book.find({});
                 return response.status(200).json({
                     count:books.length,
                     data:books
                 });
 
         }catch(error){
             console.log(error.message)
             response.status(500).send({message:error.message})
         }
 })



     //Route for get one book from database using id  
 router.get('/:id', async(request,response)=>{
     try{
             const {id}=request.params
             const book=await Book.findById(id);
             return response.status(200).json(book)
 
     }catch(error){
         console.log(error.message)
         response.status(500).send({message:error.message})
     }
 })
 


 //Route to updata a book in database
 router.put('/:id',async (request,response)=>{
     try{
             if(!request.body.title || !request.body.author ||!request.body.publishYear){
                 return response.status(400).send({
                     message:"send all required fileds:title,author,publisYear",
                 });
             }
 
             const {id}=request.params;
             const result=await Book.findByIdAndUpdate(id,request.body)
 
             if(!result){
                 return response.status(404).json({message:"Book not found"});
             }
             return response.status(200).send({message:"Book update successful"});
 
     }catch(error){
             console.log(error.message)
             response.status(500).send({message:error.message})
     }
 });
 


 //Delete a book
 router.delete('/:id',async (request,response)=>{
     try{
            const {id}=request.params
            const result=await Book.findByIdAndDelete(id);
            if(!result){
             return response.status(400).json({message:"Book not found"});
            }
 
            return response.status(200).send({message:"Book deleted successfully"});
     }catch(error){
         console.log(error.message)
         response.status(500).send({message:error.message})
     }
 })

 export default router
 
 