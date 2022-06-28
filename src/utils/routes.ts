import { Express } from "express";
//import UserRouter from '../routes/user'
import router from '../routes/users';
import geoJsonRouter from '../routes/geoJsondata';

function routes(app: Express) {
    app.use('/auth', router);
    app.use('/geojsondata', geoJsonRouter);
}

export default routes;