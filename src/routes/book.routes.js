import { Router } from "express";
import bookController from "../controllers/book.controller.js";

export const bookRouter = Router();

bookRouter.get('/all', bookController.GET_BOOK);
bookRouter.get('/search', bookController.SEARCH_BOOK);
bookRouter.route('/:id')
.get(bookController.GET_BOOK)
.put(bookController.UPDATE_BOOK)
.delete(bookController.DELETE_BOOK);
bookRouter.post('/create', bookController.CREATE_BOOK);
 