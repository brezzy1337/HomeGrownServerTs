import {Request, Response} from 'express';
import createServer from "./utils/server";
import config from './config/config';


const app = createServer();

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome HomeGrown Admin!')
});

app.listen(config.server.port, () => {
    console.log(`Server is running ${config.server.hostname}:${config.server.port}`);
});