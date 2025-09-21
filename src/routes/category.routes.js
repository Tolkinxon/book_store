import { Router } from 'express';
import categoryController from '../controllers/category.controller.js';


export const categoryRouter = Router();

categoryRouter.get('/all', categoryController.GET_CATEGORIES);
categoryRouter.get('/search', categoryController.SEARCH_CATEGORY);
categoryRouter.post('/create', categoryController.CREATE_CATEGORY);