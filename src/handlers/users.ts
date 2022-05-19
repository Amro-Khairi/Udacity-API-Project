import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (e) {
        res.status(400);
        throw new Error(`Error in users ${e}`);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        res.json(user);
    } catch (e) {
        res.status(400);
        throw new Error(`Error showing user ${req.body.id}. ${e}`);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };    
        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET as string)
        //Sign method is used to create the token/jwt, and it takes 2 arguments, an object of the info we want to store in the token and a string to sign the token with which is the SECRET 
        res.json(token);
    } catch (error) {
        res.status(400);
        throw new Error(`Error creating a user. ${error}`);
    }
};

const signIn = async (req: Request, res: Response) => {
    try {
        const result = await store.authenticate(req.body.firstname, req.body.lastname, req.body.password);
        res.json(result);
    } catch (error) {
        res.status(400);
        throw new Error(`Error signing in. ${error}`);
    }
};

const user_routes = (app: express.Application) => {
    app.post('/users', verifyAuthToken, create);
    app.post('/users/authenticate', signIn);
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
}; 

export default user_routes;