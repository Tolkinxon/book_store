import { ClientError, globalError } from "shokhijakhon-error-handler"
import { tokenService } from "../lib/tokenService.js";
import { userSchema } from "../utils/validator/auth.validator.js";
import { generateOtp } from "../utils/otp.js";
import User from "../model/User.js";
import  hash  from "bcrypt";
import emailService from "../lib/nodemailer.js";

export default {
    async REGISTER(req, res){
        try{
            const newUser = req.body;
            const validate = await userSchema.validate(newUser, {abortEarly: false});
            if(!validate.error) throw new ClientError(validate.error.message, 400);
            const checkEmail = await User.findOne({email: newUser.email});
            if(checkEmail) throw new ClientError("This user already exists", 400);
            let hashPassword = hash.hashPassword(newUser.password); 
            const {otp, otpTime} = generateOtp();
            await emailService(newUser.email, otp);
            const insertUser = await User.create({ ...newUser, password: hashPassword, otp, otpTime });
            return res.status(201).json({message: 'User successfully registered', status: 201, accessToken: tokenService.createToken({user_id: insertUser._id, userAgent: req.headers['user-agent']})});
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