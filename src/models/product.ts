import Client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`unable to get products: ${error}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }catch(err) {
            throw new Error(`Could not find product ${id}. ${err}`);
        }
    }
    
    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const conn = await Client.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const procuct = result.rows[0]
            conn.release()
            return procuct;
        }catch (err) {
          throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
      }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id])
            conn.release();
            return result.rows[0];
        }catch(err) {
            throw new Error(`could not delete product ${id}. Error: ${err}`)
        }
    }
}