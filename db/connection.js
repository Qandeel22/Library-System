import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1/library').then(()=>{
        console.log('db connected successfully');
        
    }).catch(err=>{
        console.log('failed to connect to db ');
        
    })
}