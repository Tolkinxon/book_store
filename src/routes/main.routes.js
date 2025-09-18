import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { authRouter } from "./auth.routes.js";
import { bookRouter } from "./book.routes.js";
import { authorRouter } from "./author.routes.js";
import { commentRouter } from "./comment.routes.js";
import { categoryRouter } from "./category.routes.js";

export const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/author', authorRouter);
mainRouter.use('/book', bookRouter);
mainRouter.use('/comment', commentRouter);
mainRouter.use('/category', categoryRouter)