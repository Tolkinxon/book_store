import { Router } from "express";
import authorController from "../controllers/author.controller.js";
import { upload } from "../lib/cloudinary.js";
import avatarValidator from "../middlewares/avatarValidator.js";

export const authorRouter = Router();

authorRouter.get('/all', authorController.GET_AUTHORS);
authorRouter.get('/search', authorController.SEARCH_AUTHOR);
authorRouter.route('/:id')
.get(authorController.GET_AUTHORS)
.put(authorController.UPDATE_AUTHOR)
.delete(authorController.DLETE_AUTHOR);
authorRouter.post('/create', upload.single('avatar'), avatarValidator, authorController.CREATE_AUTHOR)