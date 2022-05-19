import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should create a product', async () => {
        const result = await store.create({
            name: 'Razer mouse',
            price: 50,
            category: 'PC components'
        })
        expect(result).toEqual({
            id: 1,
            name: 'Razer mouse',
            price: 50,
            category: 'PC components'
        });
    });

    it('index method should return an array of all products', async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
            id: 1,
            name: 'Razer mouse',
            price: 50,
            category: 'PC components'
            }
        ]);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
    });

    it('delete method should return the deleted product', async () => {
        const result2 = await store.create({
            name: 'Starbucks Mug',
            price: 10,
            category: 'Drinkware'
        })
        const result = await store.delete(2);
        expect(result).toEqual({
            id: 2,
            name: 'Starbucks Mug',
            price: 10,
            category: 'Drinkware'
        });
    });
});