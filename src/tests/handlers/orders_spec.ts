import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const req = supertest(app);

describe("Orders Route", () => {
    let token: string = '';
    beforeAll( () => {
            const user = {
                firstname: 'Amr',
                lastname: 'Khairy',
                password: 'password123'
            };
            const result = jwt.sign({ user }, process.env.TOKEN_SECRET as string)
            token = result;
    })

    it('Index endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/orders');
        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Index endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/orders')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Show endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/orders/10');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Show endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/orders/10')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it('Create endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.post('/orders');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Delete endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.delete('/orders');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Delete endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/orders/10')
        .set('Authorization', `Bearer ${token}`)
        .send({"id": "10"})

        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    });

    it('Current Orders endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/orders/2/current_orders');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Current Orders endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/orders/2/current_orders')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Completed Order endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/orders/2/completed_orders');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Completed Order endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/orders/2/completed_orders')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('add product endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.post('/orders/5/products');
        expect(res.status).toBe(401);
        expect(res.body).toContain('Invalid token. JsonWebTokenError: jwt must be provided')
    });
});