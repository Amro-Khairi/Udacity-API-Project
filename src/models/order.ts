import { traceDeprecation } from "process";
import Client from "../database";
//Here we import the connection to the database

export type Order = {
    id?: number;
    //This ? means optional so we don't have to provide it
    status: string;
    user_id: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        //This index method will be async because all calls to database should be promises
        try {
            const conn = await Client.connect();
            //We use the connection to make a connection
            const sql = 'SELECT * FROM orders';
            //Here we pass the sql we wrote to the connection we made as query
            //The query will get run then the resulting rows will be stored in result variable
            const result = await conn.query(sql);
            //.query('text', [values], callback(err))
            conn.release();
            //always close the connection after you open it, so this step to close it
            return result.rows;
        } catch (error) {
            throw new Error(`unable to get orders: ${error}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=$1';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }catch(err) {
            throw new Error(`Could not find order ${id}. ${err}`);
        }
    }
    
    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            //In SQL, inserting will give back a report saying that the insert was successful, it will not return the row that we inserted, so we here add RETURNING * to return the row we added
            //And RETURNING can instead take a sub Query to run like RETURNING ('sql query'), or a specific column to return
            const conn = await Client.connect()
            const result = await conn.query(sql, [o.status, o.user_id])
            //Order here in o.status, o.user_id ...must match the order given in sql variable
            const order = result.rows[0]
            conn.release()
            return order;
        }catch (err) {
          throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
      }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id])
            conn.release();
            return result.rows[0];
        }catch(err) {
            throw new Error(`could not delete order ${id}. Error: ${err}`)
        }
    }

    async completedOrders(user_id: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='complete'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`couldn't find orders for user: ${user_id}. ${e}`);
        }
    }

    async currentOrders(user_id: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='active'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`couldn't find orders for user: ${user_id}. ${e}`);
        }
    }
    //Here we will configure the join table, and we do this in order model because there will be one order and many products
    async addProduct(quantity: number, orderId: number, productId: number): Promise<{id: number, quantity: number, order_id: number, product_id: number}> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();

            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not add new product ${productId} to order ${orderId}: ${error}`);
        }
    }
}