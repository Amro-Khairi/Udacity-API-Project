import supertest from "supertest";
import app from "../../server";
import jwt from 'jsonwebtoken';

const req = supertest(app);

describe("Products Route", () => {
    let token: string = '';
    beforeAll( () => {
            const user = {
                firstname: 'Khaled',
                lastname: 'Khairy',
                password: 'password456'
            };
            const result = jwt.sign({ user }, process.env.TOKEN_SECRET as string)
            token = result;
    })

    it('Index endpoint should respond with status 200', async () => {
        const res = await req
        .get('/products')

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Show endpoint should respond with status 200', async () => {
        const res = await req
        .get('/products/2')

        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    });

    it('Create endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.post('/products');
        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Delete endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.delete('/products');
        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Delete endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .delete('/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({"id": "20"})

        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    });

});