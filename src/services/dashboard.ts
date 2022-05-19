import Client from "../database";

export class DashboardQueries {
    //Gets all products that have been included in orders
    async productsInOrder(): Promise<{name: string, price: number, order_id: string}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.product_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch (e) {
            throw new Error(`unable to get products and orders: ${e}`);
        }
    }

    async usersWithOrders(): Promise<{firstname: string, lastname: string}[]> {
        //Gets all users that made orders
        try {
            const conn = await Client.connect();
            const sql = 'SELECT DISTINCT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.user_id';
            //Here we add the DISTICT to remove the repeated rows/users
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Unable to get users with orders: ${e}`);
        }
    }

    async fiveMostExpensive(): Promise<{name: string, price: number}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`unable to get products: ${e}`)
        }
    }

    async fiveMostPopular(): Promise<{product_id: string, total: number}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT name, SUM(quantity) as total FROM products INNER JOIN orders_products ON products.id = orders_products.product_id GROUP BY name ORDER BY total DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch (e) {
            throw new Error(`unable to get products: ${e}`)
        }
    }
    
    async productsByCategory(category: string): Promise<{id: number, name: string, price: number, category: string}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=$1';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`couldn't find product with category: ${category}. ${e}`);
        }
    }
}