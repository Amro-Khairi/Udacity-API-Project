import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

describe("Dashboard Route", () => {
    it('productsInOrder endpoint should respond with status 200', async () => {
        const productsInOrder = await request.get('/products_in_orders');
        expect(productsInOrder.status).toBe(200);
    });

    it('usersWithOrders endpoint should respond with status 200', async () => {
        const usersWithOrders = await request.get('/users_with_orders');
        expect(usersWithOrders.status).toBe(200);
    });

    it('fiveMostExpensive endpoint should respond with status 200', async () => {
        const fiveMostExpensive = await request.get('/five_most_expensive');
        expect(fiveMostExpensive.status).toBe(200);
    });

    it('fiveMostPopular endpoint should respond with status 200', async () => {
        const fiveMostPopular = await request.get('/five_most_popular');
        expect(fiveMostPopular.status).toBe(200);
    });

    it('productsByCategory endpoint should respond with status 200 and empty array', async () => {
        const productsByCategory = await request.get('/category/cats');
        expect(productsByCategory.status).toBe(200);
        expect(productsByCategory.body).toEqual([]);
    });
});
