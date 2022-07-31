import { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
//import UserRouter from '../routes/user'
import router from '../routes/users';
import geoJsonRouter from '../routes/geoJsondata';
import trcpRouter from "@src/routes/trpcRouter";
import { createContext } from "./trpc.utils/trpc.context";

function routes(app: Express) {

  app.use('/auth', router);
  app.use('/geojsondata', geoJsonRouter);

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trcpRouter,
      createContext,
    })
  );
};

export default routes;