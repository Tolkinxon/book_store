import { Router } from "express";
import commentController from "../controllers/comment.controller.js";

export const commentRouter = Router();

commentRouter.get('/all', commentController.GET_COMMENT);
commentRouter.route('/:id')
.get(commentController.GET_COMMENT)
.put(commentController.UPDATE_COMMENT)
.delete(commentController.DELETE_COMMENT);
commentRouter.post('/create', commentController.CREATE_COMMENT);
 