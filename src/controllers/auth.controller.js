import { ClientError, globalError } from "shokhijakhon-error-handler"
import User from "../model/User.js";
import { tokenService } from "../lib/tokenService.js";

export default {
    async REGISTER(req, res){
        try{
            const newUser = req.body;
            const inserUser = await User.insertOne(newUser);
            return res.status(200).json({message: 'User successfully registered', status: 200, accessToken: tokenService.createToken({user_id: inserUser._id, userAgent: req.headers['user-agent']})});
        }
        catch(error){
            return globalError(error, res);
        }
    },
    async LOGIN(req, res){
        try{
            const newUser = req.body;
            const findUser = await User.find(newUser);
            if(!findUser.length) throw new ClientError('User not found', 400);
            return res.status(200).json({message: 'User successfully Logged in', status: 201, accessToken: tokenService.createToken({user_id: findUser[0]._id, userAgent: req.headers['user-agent']})});
        }
        catch(error){
            return globalError(error, res);
        }
    },


}