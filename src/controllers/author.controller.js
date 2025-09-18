import { ClientError, globalError } from "shokhijakhon-error-handler"
import { isValidObjectId } from 'mongoose';
import Author from "../model/Author.js"
import { authorSchema, createAuthorSchema } from "../utils/validator/author.validator.js";


export default {
    async GET_AUTHORS(req, res){
        try {
            const id = req.params.id;
            if(id) {
                if(!isValidObjectId(id)) throw new ClientError('Author id is invalid', 400);
                const author = await Author.findById(id); 
                if(!author) throw new ClientError("Author not found", 404);
                return res.json(author)
            }
            const authors = await Author.find();
            return res.json(authors);
        } catch (error) {
            return globalError(error, res)

        }
    },

    async CREATE_AUTHOR(req, res){
        try {
            const newAuthor = req.body;
            const validate  = await authorSchema.validateAsync(newAuthor, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const inserAuthor = await Author.create(newAuthor);
            return res.status(201).json({message: 'Author successfully created!', status: 201, id: inserAuthor._id});
        } catch (error) {
            return globalError(error, res);
        }
    },

    async UPDATE_AUTHOR(req, res){
        try {
            const id = req.params.id;
            if(!isValidObjectId(id)) throw new ClientError('Author id is invalid', 400);
            const author = await Author.findById(id);
            if(!author) throw new ClientError('AUthor not found', 404);
            const updateAuthor = req.body;
            const validator = createAuthorSchema(updateAuthor);
            const validate = validator.validateAsync(updateAuthor, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const updatedAuthor = await Author.findByIdAndUpdate(id, updateAuthor); 
            return res.status(200).json({message: "Author successfully updated", status: 200})
        } catch (error) {
            return globalError(error, res);
        }
    },

    async DLETE_AUTHOR(req, res){
        try {
            const id = req.params.id;
            if(!isValidObjectId(id)) throw new ClientError('Author id is invalid', 400);
            const author = await Author.findById(id);
            if(!author) throw new ClientError('AUthor not found', 404);
            await Author.findByIdAndDelete(id);
            return res.status(200).json({message: "Author successfully deleted", status: 200});            
        } catch (error) {
           return globalError(error, res);
        }

    },

    async SEARCH_AUTHOR(req, res){
        try {
            let searchValue = req.query?.name.trim();
            if(!searchValue) throw new ClientError('Search value is empty', 400);
            // let  authors = await Author.find({full_name: {$regex: searchValue, $options: 'i'}});
            let authors = await Author.find({$text: {$search: searchValue}}); 
            return res.json(authors);
        } catch (error) {
            return globalError(error, res);
        }
    }
}