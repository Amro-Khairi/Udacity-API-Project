import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should return a user', async () => {
        const result = await store.create({
            firstname: 'Khaled',
            lastname: 'Khairi',
            password: 'password123'
        });
        expect(result.id).toEqual(2);
        expect(result.firstname).toEqual('Khaled');
        expect(result.lastname).toEqual('Khairi');
        expect(result.password).toBeDefined();
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1)
    });

    it('index method should return an array of all users', async () => {
        const result = await store.index();
        expect(result[0].firstname).toEqual('Amro');
    });

    it('authenticate method should return the correct user', async () => {
        const result = await store.authenticate('Amro', 'Khairi', 'password123');
        expect(result).not.toBe(null);
    });
});
