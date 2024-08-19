import { Author } from "../../db/models/author.model.js"
import { Book } from "../../db/models/book.model.js"

//add book
export const addBook = async (req,res,next)=>{
    try {
        const{title,content,author,publishDate} = req.body
          //check existence
          const authorExist = await Author.findById(author)
          if(!authorExist){
            throw Error('author not found',{cause:404})
          }
          //prepare data
        const book = new Book({
            title,
            content,
            author,
            publishDate,
           
        })
        const createBook = await book.save()
        //add books to the author
        authorExist.books.push(createBook._id);
        await authorExist.save();
        return res.status(201).json({message:'book added successfully',success:true,data:createBook})

    } catch (error) {
        return res.status(error.cause || 500).json({message:error.message,success:false})
    }
}

//get all books
export const getBooks = async (req,res,next)=>{
    try {
        const allBooks = await Book.find()
        return res.status(200).json({message:allBooks,success:true})
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}

//get book by Id
export const getSpecificBook = async (req,res,next)=>{
 try {
    const{id}=req.params
    const book = await Book.findById(id)
    if(!book){
        throw Error('book not found',{cause:404})        
    }
    return res.status(200).json({message:book,success:true})

 } catch (error) {
    return res.status(error.cause || 500).json({message:error.message,success:false})
 }
}

//update book by Id
export const updateBook = async (req,res,next)=>{
    try {
        const {id} = req.params
        const{title,content,author,publishDate} = req.body
        const updatedBook = await Book.findByIdAndUpdate(id,{title,content,author,publishDate},{new:true})
        if(!updatedBook){
            throw Error('book not found',{cause:404})
        }
        return res.status(200).json({message:'book updated successfully',success:true,data: updatedBook})
    } catch (error) {
        return res.status(error.cause || 500).json({message:error.message,success:false})
    }
}

//delete book
export const deleteBook = async (req,res,next)=>{
    try {
        const{id} = req.params
        const{title,content,author,publishDate} = req.body
        const bookExist = await Book.findById(id)
        if(!bookExist){
            throw Error('book not found',{cause:404})
        }
        const deletedBook = await Book.deleteOne({title,content,author,publishDate})
        if(!deletedBook){
            throw Error('failed to delete book',{cause:500})
        }
        return res.status(200).json({message:'book deleted successfully',success:true})
    } catch (error) {
        return res.status(error.cause || 500).json({message:error.message,success:false})
    }
}

// Search books by title or author
export const searchBooks = async (req, res, next) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') }
            ]
        }).populate('createdBy', 'name'); // Include author's name

        return res.status(200).json({ books, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}