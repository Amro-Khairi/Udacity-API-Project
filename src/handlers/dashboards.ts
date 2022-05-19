import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();
//Handlers are express handlers/functions or RESTFUL calls handlers
const productsInOrders = async (_req: Request, res: Response) => {
    //This _ means that we don't use that parameter
    try {
        const products = await dashboard.productsInOrder();
        res.json(products);
    } catch (e) {
        throw new Error(`Error getting products. ${e}`)
    }
}

const usersWithOrders = async (_req: Request, res: Response) => {
    try {
        const users = await dashboard.usersWithOrders();
        res.json(users);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting users. ${e}`)
    }
}

const fiveMostExpensive = async (_req:Request, res: Response) => {
    try {
        const products = await dashboard.fiveMostExpensive();
        res.json(products);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting products. ${e}`)
    }
}

const fiveMostPopular= async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.fiveMostPopular();
        res.json(products);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting products. ${e}`)
    }
}

const productsByCategory = async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.productsByCategory(_req.params.category);
        res.json(products);
    } catch (e) {
        res.status(400);
        throw new Error(`Error getting products. ${e}`)
    }

}

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/users_with_orders', usersWithOrders);
    app.get('/five_most_expensive', fiveMostExpensive);
    app.get('/five_most_popular', fiveMostPopular);
    app.get('/category/:category', productsByCategory);
}

export default dashboardRoutes;