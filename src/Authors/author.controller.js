import { Author } from "../../db/models/author.model.js"

//add author
export const addAuthor = async (req,res,next)=>{
    try {
        const{name,bio,birthDate,books} = req.body
        let parsedBirthDate;
        if (birthDate) {
            const [day, month, year] = birthDate.split('/');
            parsedBirthDate = new Date(`${year}-${month}-${day}`);
        }
        const author =  new Author({
            name,
            bio,
            birthDate: parsedBirthDate || birthDate,
            books
        })
        const createAuthor = await author.save()
        res.status(201).json({message:'author created successfully',success:true,data:createAuthor})
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}

//get all authors with books
export const getAuthors = async (req,res,next)=>{
    try {
        const allAuthors = await Author.find().populate([{path:"books",select:"title publishDate "}])
        return res.status(200).json({message:allAuthors,success:true})
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}

//get author by ID with books
export const getSpecificAuthor = async (req,res,next)=>{
    try {
       const{id}=req.params
       const author = await Author.findById(id).populate([{path:"books",select:"title publishDate"}])
       if(!author){
           throw Error('Author not found',{cause:404})        
       }
       return res.status(200).json({message:author,success:true})
   
    } catch (error) {
       return res.status(error.cause || 500).json({message:error.message,success:false})
    }
}

//update author by Id
export const updateAuthor = async (req,res,next)=>{
    try {
        const{id} = req.params
        let{name,bio,birthDate,books} = req.body
        if (birthDate) {
            const [day, month, year] = birthDate.split('/');
            birthDate = new Date(`${year}-${month}-${day}`);
        }
        const updatedAuthor = await Author.findByIdAndUpdate(id,{name,bio,birthDate,books},{new:true})
        if(!updatedAuthor){
         throw Error('Author not found',{cause:404})   
        }
        const populatedAuthor = await Author.findById(updatedAuthor._id).populate({
            path: 'books',
            select: 'title publishDate',
        });
        return res.status(200).json({message:'Author updated successfully',success:true,data:populatedAuthor})
    } catch (error) {
        return res.status(error.cause || 500).json({message:error.message,success:false})
        
    }
}  

//delete author
export const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the author exists
        const authorExist = await Author.findById(id);
        if (!authorExist) {
            throw Error('Author not found', { cause: 404 });
        }

        // Delete the author by ID
        const deletedAuthor = await Author.deleteOne({ _id: id });
        if (deletedAuthor.deletedCount === 0) {
            throw Error('Failed to delete author', { cause: 500 });
        }

        return res.status(200).json({
            message: 'Author deleted successfully',
            success: true
        });
    } catch (error) {
        return res.status(error.cause || 500).json({
            message: error.message,
            success: false
        });
    }
};

// Search authors by name or bio
export const searchAuthors = async (req, res, next) => {
    try {
        const { query } = req.query;
        const authors = await Author.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { bio: new RegExp(query, 'i') }
            ]
        }).populate([{ path: "books", select: "title publishDate" }]); // Include books' title and publish date

        return res.status(200).json({ authors, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};










