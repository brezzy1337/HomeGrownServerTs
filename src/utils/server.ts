import express from "express";
import cors = require('cors');
import bodyParser = require('body-parser');
import routes from './routes';

function createServer() {
    const app = express();

    app.use(express.json());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors()); 

    routes(app);

    return app;
}

export default createServer;