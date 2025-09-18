import { ClientError, globalError } from "shokhijakhon-error-handler"
import { isValidObjectId } from 'mongoose';
import Book from "../model/Book.js";
import { bookSchema, createBookSchema } from "../utils/validator/book.validator.js";

export default {
    async GET_BOOK(req, res){
        try{
            const id  = req.params.id;
            if(id){
                if(!isValidObjectId(id)) throw new ClientError('Book id is invalid', 400);
                const findBook = await Book.findById(id).populate('author', {full_name: 1, _id: 0});
                if(!findBook) throw new ClientError('Book not found', 404);
                return  res.json(findBook);
            }
            const books = await Book.find().populate('author', {full_name: 1, _id: 0});
            return res.json(books);
        }
        catch(error){
            return globalError(error, res);
        }
    },
    async CREATE_BOOK(req, res){
        try{
            const newBook = req.body;
            const validate = await bookSchema.validateAsync(newBook, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const inserBook = await Book.create(newBook);
            return res.status(201).json({message: 'Book successfully created', status: 201, book_id: inserBook._id});
        }
        catch(error){
            return globalError(error, res);
        }
    },
    async UPDATE_BOOK(req, res){
        try{
            const id = req.params.id;
            if(!isValidObjectId(id)) throw new ClientError('Book id is invalid', 400);
            const findBook = await Book.findById(id);
            if(!findBook) throw new ClientError('Book not found', 404);
            const bookNewData = req.body;
            const validator = createBookSchema(bookNewData);
            const validate = validator.validateAsync(bookNewData, {abortEarly: false}); 
            if(validate.error) throw new ClientError(validate.error.message, 400);
            await Book.findByIdAndUpdate(id, bookNewData, {new: true});
            return res.json({message: "Book successfully updated", status: 200});
        }
        catch(error){
            return globalError(error, res);
        }
    },
    async DELETE_BOOK(req, res){
        try{
            const id = req.params.id;
            if(!isValidObjectId(id)) throw new ClientError('Book id is invalid', 400);
            const findBook = await Book.findById(id);
            if(!findBook) throw new ClientError('Book not found', 404);
            await Book.findByIdAndDelete(id);
            return res.json({message: "Book successfully deleted", status: 200});
        }
        catch(error){
            return globalError(error, res);
        }
    },

    async SEARCH_BOOK(req, res){
        try {
            const searchValue = req.query?.title?.trim();
            if(!searchValue) throw new ClientError("Search value is empty", 400);
            // const books = await Book.find({title: {$regex: searchValue, $options: 'i'}});
            const books = await Book.find({$text: {$search: searchValue}});
            return res.json(books);            
        } catch (error) {
            return globalError(error, res);
        }
    }
}