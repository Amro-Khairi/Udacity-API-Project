import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
//This library will add the variables I add in .env file to the process.env, And I can access that process.env anywhere on the application without the need to reconfiguring nor importing dotenv because it already added it

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
    ENV,
} = process.env

let Client: any;
console.log('ENV value: ', ENV);

if(ENV === 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

if(ENV === 'dev') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}


export default Client;