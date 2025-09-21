import { ClientError, globalError } from "shokhijakhon-error-handler"
import { tokenService } from "../lib/tokenService.js";
import { changePasswordSchema, userSchema } from "../utils/validator/auth.validator.js";
import { generateOtp } from "../utils/otp.js";
import User from "../model/User.js";
import  hash  from "./../lib/hash.js";
import emailService from "../lib/nodemailer.js";
import { otpSchema, resendSchema } from "../utils/validator/otp.validator.js";

export default {
    async REGISTER(req, res){
        try{
            const newUser = req.body;
            const validate =  userSchema.validate(newUser, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const checkEmail = await User.findOne({email: newUser.email});
            if(checkEmail) throw new ClientError("This user already exists", 400);
            let hashPassword = await hash.hashPassword(newUser.password); 
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
    async VERIFY(req, res){
        try {
            const data = req.body;
            const validate = otpSchema.validate(data, {abortEarly: false});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const checkUser = await User.findOne({email: data.email});
            if(!checkUser) throw new ClientError("User not found", 404);
            const currentTime = Date.now();
            if(currentTime > checkUser.otpTime) {
                await User.findOneAndUpdate({email: data.email}, {otp: null, otpTime: null});
                throw new ClientError("OTP expired", 400);
            }
            if(checkUser.otp !== data.otp) throw new ClientError('OTP invalid', 400);
            await User.findOneAndUpdate({email: data.email}, {isVerified: true});
            return res.json({message: "OTP successfully verified", status: 200});
        } catch (error) {
            return globalError(error, res);
        }
    },
    async RESEND_OTP(req, res){
        try {
            const data = req.body;
            const validate = resendSchema.validate(data);
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const checkUser = await User.findOne({email: data.email});
            if(!checkUser) throw new ClientError("User not found", 404);
            if(checkUser.isVerified) throw new ClientError("User already verified", 400);
            const {otp, otpTime} = generateOtp();
            await emailService(data.email, otp);
            await User.findOneAndUpdate({email: data.email}, {otp, otpTime});
            return res.json({message: "OTP successfully resend your email", status: 200});
        } catch (error) {
            return globalError(error, res)
        }   
    },
    async FORGOT_PASSWORD(req, res){
        try {
            const data = req.body;
            const validate = resendSchema.validate(data);
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const checkUser = await User.findOne({email: data.email});
            if(!checkUser) throw new ClientError("User not found", 404);
            await User.findOneAndUpdate({email: data.email}, {otp: null, otpTime: null, isVerified: false});
            const {otp, otpTime} = generateOtp();
            await emailService(data.email, otp);
            await User.findOneAndUpdate({email: data.email}, {otp, otpTime});
            return res.json({message: "We send OTP to your email please check your email", status: 200});
        } catch (error) {
            return globalError(error, res);
        }
    },
    async CHANGE_PASSWORD(req, res){
        try {
            const data = req.body;
            const validate = await changePasswordSchema.validate(data);
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const checkUser = await User.findOne({email: data.email});
            if(!checkUser) throw new ClientError("User not found", 404);
            let hashPassword = await hash.hashPassword(data.new_password); 
            await User.findOneAndUpdate({email: data.email}, {password: hashPassword});
            return res.json({message: "Password successfully updated", status: 200});            
        } catch (error) {
            return globalError(error, res);
        }
    }
}