//import modules
import express from 'express'
import { connectDB } from './db/connection.js'
import authorRouter from './src/Authors/author.router.js'
import bookRouter from './src/Books/book.router.js'

//create app
const app = express()
const port = process.env.port || 3000
//parsing data
app.use(express.json())
connectDB()
app.use('/author',authorRouter)
app.use('/book',bookRouter)

//listen on server
app.listen(port,()=>{
    console.log('server is running on port',port);
    
})

