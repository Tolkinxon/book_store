import { globalError } from "shokhijakhon-error-handler";
import Category from "../model/Category.js";
import { categorySchema } from "../utils/validator/category.validator.js";

export default {
    async GET_CATEGORIES(req, res){
        try{
            let categories = await Category.find();
            return res.json(categories);    
        }catch(err){
            return globalError(err, res);
        }
    },
    async CREATE_CATEGORY(req, res){
        try{
            let newCategory = req.body;
            let validate = await categorySchema.validateAsync(newCategory, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            let insertCategory = await Category.create(newCategory);
            return res.json({message: "Category successfully created !", status: 201, id: insertCategory._id});
        }catch(err){
            return globalError(err, res);
        }
    }
}