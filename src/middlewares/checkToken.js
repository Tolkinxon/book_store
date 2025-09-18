import { ClientError, globalError } from "shokhijakhon-error-handler";
import {tokenService} from"../lib/tokenService.js";
import UserModel from "../model/User.model.js";
const { verifyToken } = tokenService;

 async function checkToken(req, res, next){
    try {
        const token = req.headers.token;
        if(!token) throw new ClientError('Unauthorized!', 400);
        const verifiyToken = verifyToken(token);
        if(!(req.headers['user-agent'] == verifiyToken.userAgent)) throw new ClientError('Unauthorized!', 400);

        if(!isValidObjectId(verifiyToken.user_id)) throw new ClientError('User id is invalid', 400);
        const user = await UserModel.findById(verifiyToken.user_id);

        if(!user) throw new ClientError('Unauthorized!', 401);
        if(user.role_id == 1) req.admin = true;
        else {req.admin = false;}
        req.user_id = verifiyToken.user_id;
        return next();
    } catch (error) {
        globalError(error, res);        
    }
}

export default checkToken;