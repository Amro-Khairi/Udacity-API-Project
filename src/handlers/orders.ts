import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from './verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try{
        const orders = await store.index()
        res.json(orders);
    }catch(err) {
        res.status(400);
        throw new Error(`Error in Orders ${err}`);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        res.json(order);
    } catch (err) {
        res.status(400);
        throw new Error(`Error showing order ${req.body.id}. ${err}`);
    }
};

const completedOrders = async (req: Request, res: Response) => {
    try {
        const completedOrders = await store.completedOrders(parseInt(req.params.user_id));
        res.json(completedOrders);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting completed orders. ${e}`)
    }
}

const currentOrders = async (req: Request, res: Response) => {
    try {
        const currentOrders = await store.currentOrders(parseInt(req.params.user_id))
        res.json(currentOrders);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting current orders. ${e}`)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id
        };
    
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        throw new Error(`Error creating order. ${error}`);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const order = await store.delete(req.body.id);
        res.json(order);
    } catch (error) {
        res.status(400);
        throw new Error(`couldn't delete order ${req.body.id}. ${error}`);
    }
};

const addProduct = async (_req: Request, res: Response) => {
    try {
        const orderId: number = parseInt(_req.params.id);
        const productId: number = parseInt(_req.body.productId);
        const quantity: number = parseInt(_req.body.quantity);    
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.get('/orders/:user_id/current_orders', verifyAuthToken, currentOrders);
    app.get('/orders/:user_id/completed_orders', verifyAuthToken, completedOrders);
    app.post('/orders', verifyAuthToken, create);
    app.delete('/orders', verifyAuthToken, destroy);
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
};

export default order_routes;