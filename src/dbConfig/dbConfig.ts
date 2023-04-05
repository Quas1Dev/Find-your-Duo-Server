import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.PGPASSWORD,
    database: 'findyourduo'
});

client.connect((err: any) => {
    if (err) {
        console.log("Connection error:",err.stack);
    } else {
        console.log("Connected!");
    }
})

export default client;