import { Schema,model } from "mongoose";
//schema
const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date,
        default:Date.now // Default to the current date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Author', // Reference to the Author model
        required: true // Assuming every book must have a creator
    }
    
},{timestamps:true})

//model
export const Book = model('Book',bookSchema)