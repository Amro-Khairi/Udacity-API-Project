import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { nextTick } from 'process';

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHead = req.headers.authorization;
        const token = authorizationHead?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        //Takes two arguments, the token itself and the SECRET that has to be the same as the one used to create the token, and it returns true of false    
        next();
    } catch (error) {
        res.status(401);
        res.json(`Invalid token. ${error}`);
    }
}
export default verifyAuthToken;