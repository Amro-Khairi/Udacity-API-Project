import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const req = supertest(app);

describe("Users Route", () => {
    let token: string = '';
    beforeAll( () => {
            const user = {
                firstname: 'Freshta',
                lastname: 'Nazar',
                password: 'password789'
            };
            const result = jwt.sign({ user }, process.env.TOKEN_SECRET as string)
            token = result;
    })

    it('Index endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/users');
        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Index endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/users')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('Create endpoint should respond with status 401 and ask for token if not provided', async () => {
        const res = await req
        .post('/users')
        .send({
            "firstname": "Amro",
            "lastname": "Khairi",
            "password": "password123"
        })

        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided');
    });

    it('create endpoint should respond with status 200 after providing the token', async () => {
        const res = await req
        .post('/users')
        .send({
            "firstname": "Amro",
            "lastname": "Khairi",
            "password": "password123"
        })
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200);
    });

    it('Show endpoint should respond with status 401 and ask for token', async () => {
        const res = await req.get('/users/1');
        expect(res.status).toBe(401);
        expect(res.body).toEqual('Invalid token. JsonWebTokenError: jwt must be provided')
    });

    it('Show endpoint should respond with status 200 after providing a token', async () => {
        const res = await req
        .get('/users/10')
        .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    });

    it('SignIn endpoint should respond with status 200', async () => {
        const res = await req
        .post('/users/authenticate')
        .send({
            "firstname": "Amro",
            "lastname": "Khairi",
            "password": "password123"
        })
        expect(res.status).toBe(200);
    });

});
