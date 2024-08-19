import { Router } from "express";
import { addBook, deleteBook, getBooks, getSpecificBook, searchBooks, updateBook } from "./book.controller.js";

const bookRouter = Router()

bookRouter.post('/add-book',addBook)
bookRouter.get('/',getBooks)
bookRouter.get('/search',searchBooks)
bookRouter.get('/:id',getSpecificBook)
bookRouter.patch('/:id',updateBook)
bookRouter.delete('/:id',deleteBook)

export default bookRouter
