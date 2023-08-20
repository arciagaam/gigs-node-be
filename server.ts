import express, {json, Request, Response} from "express";
import dotenv from "dotenv";
import config from './config/config.json';
import {routes} from './src/routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(json());
app.use('/', routes());

(() => {
    app.listen(port, () => {
        console.log('Listening on port:', port);
    });
})();