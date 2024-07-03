import express, { json } from 'express';
import { router } from './routes';

const server = express();
const port = 5000;

server.use(json())
server.use(router);

server.listen(port, () => console.log('Server running!'))