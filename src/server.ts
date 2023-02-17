import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import { runSeeder } from './seeders/seeder';

let app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

// Detect any request to the port 3333
app.listen(3333);

/*
  *1 - the colon in :id indicates it is a parâmeter
*/
