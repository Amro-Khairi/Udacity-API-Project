import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from './verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try{
        const products = await store.index()
        res.json(products);
    }catch(err) {
        res.status(400);
        throw new Error(`Error in Products ${err}`);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    } catch (err) {
        res.status(400);
        throw new Error(`Error showing product ${req.body.id}. ${err}`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: parseInt(req.body.price),
            category: req.body.category
        };

        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        throw new Error(`Error creating product. ${error}`);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const product = await store.delete(req.body.id);
        res.json(product);
    } catch (error) {
        res.status(400);
        throw new Error(`couldn't delete product ${req.body.id}. ${error}`);
    }
};

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products', verifyAuthToken, destroy);
};

export default product_routes;