import { DashboardQueries } from "../../services/dashboard";

const store = new DashboardQueries();

describe("DashBoard Service", () => {
    it('should have an productsInOrder method', () => {
        expect(store.productsInOrder).toBeDefined();
    });

    it('should have a usersWithOrders method', () => {
        expect(store.usersWithOrders).toBeDefined();
    });

    it('should have a fiveMostExpensive method', () => {
        expect(store.fiveMostExpensive).toBeDefined();
    });

    it('should have an fiveMostPopular method', () => {
        expect(store.fiveMostPopular).toBeDefined();
    });

    it('should have an productsByCategory method', () => {
        expect(store.productsByCategory).toBeDefined();
    });
})