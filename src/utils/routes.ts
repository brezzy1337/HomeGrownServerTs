import { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
// import { openApiDocument } from './trpc.utils/OpenAPI'
//import UserRouter from '../routes/user'
// import router from '../routes/users';
import geoJsonRouter from '../routes/geoJsondata';
import trcpRouter from "@src/routes/trpcRouter";
import { createContext } from "./trpc.utils/trpc.context";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

function routes(app: Express) {

  // app.use('/auth', router);
  app.use('/geojsondata', geoJsonRouter);

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: trcpRouter,
      createContext,
    })
  );
  
  app.use(
    '/api',
    createOpenApiExpressMiddleware({
      router: trcpRouter, createContext,
      responseMeta: undefined,
      onError: undefined,
      maxBodySize: undefined
    })
  ) 
};

export default routes;