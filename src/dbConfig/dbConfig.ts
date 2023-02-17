import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    port: 3350,
    user: 'fernando',
    password: 'nlw',
    database: 'nlw'
});

client.connect((err: any) => {
    if (err) {
        console.log("Connection error:",err.stack);
    } else {
        console.log("Connected!");
    }
})

export default client;