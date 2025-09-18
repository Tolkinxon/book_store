import pkg from 'jsonwebtoken';
const  { sign, verify } = pkg;


export const tokenService = {
    createToken: (payload) => sign(payload,  process.env.TOKEN_KEY, {expiresIn: '1d'}),
    verifyToken: (token) => verify(token,process.env.TOKEN_KEY),
}