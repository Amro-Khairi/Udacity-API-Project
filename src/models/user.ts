import Client from "../database";
import bcrypt from 'bcrypt';

const {
    BCRYPT_PASSWORD : pepper,
    SALT_ROUND : saltRounds,
} = process.env


export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds as string)
            );

            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            const user = result.rows[0];
            
            conn.release();
            return user;
        } catch (error) {
            throw new Error(`unable to create user ${u.firstname}: ${error}`);
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (e) {
            throw new Error(`Error in showing users ${e}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not find user ${id}. ${e}`);
        }
    } 

    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password FROM users WHERE firstname=($1) AND lastname=($2)';
            const result = await conn.query(sql, [firstname, lastname]);
            if (result.rows.length) {
                const object = result.rows[0];
                //This returns an object that has password property only
                if (bcrypt.compareSync(password+pepper, object.password)) {
                    return object;
                }
            }
            return null;    
        } catch (e) {
            throw new Error(`couldn't authenticate user. ${e}`);
        }
    }
}
