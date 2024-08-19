import { Router } from "express";
import { addAuthor, deleteAuthor, getAuthors, getSpecificAuthor, searchAuthors, updateAuthor } from "./author.controller.js";

const authorRouter = Router()
authorRouter.post('/add-author',addAuthor)
authorRouter.get('/',getAuthors)
authorRouter.get('/search',searchAuthors)
authorRouter.get('/:id',getSpecificAuthor)
authorRouter.patch('/:id',updateAuthor)
authorRouter.delete('/:id',deleteAuthor)

export default authorRouter