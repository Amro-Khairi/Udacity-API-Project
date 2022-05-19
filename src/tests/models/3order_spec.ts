import { Order, OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order Model", () => {
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

    it('should have a completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    });

    it('should have a currentOrders method', () => {
        expect(store.currentOrders).toBeDefined();
    });

    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('create method should create an order', async () => {
        const result = await store.create({
            status: 'active', 
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: 1
        });
    });

    it('index method should return an array of all orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            status: 'active',
            user_id: 1
        }]);
    });

    it('show method should return the correct order', async () => {
        const result = await store.show(1);
        expect(result.id).toBe(1);
    });

    it('completedOrders method should return an array of all completed orders for provided user\'s id', async () => {
        await store.create({
            status: 'complete', 
            user_id: 1
        });
        const result = await store.completedOrders(1);
        expect(result).toEqual([{
            id: 2,
            status: 'complete',
            user_id: 1
        }]);
    });

    it('currentOrders method should return an array of all current orders for provided user\'s id', async () => {
        const result = await store.currentOrders(1);
        expect(result).toEqual([{
            id: 1,
            status: 'active',
            user_id: 1
        }]);
    });

    it('addProduct method should work as expected', async () => {
        const result = await store.addProduct(20, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 20,
            order_id: 1,
            product_id: 1
        })
    })

    it('delete method should delete the correct order', async () => {
        const result = await store.delete(2);
        expect(result).toEqual({
            id: 2,
            status: 'complete',
            user_id: 1
        });
    });

});