import { Schema,model } from "mongoose";
//schema
const authorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    bio:String,
    birthDate:Date,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book model
      }],
},{timestamps:true})
//model
export const Author = model('Author',authorSchema)
