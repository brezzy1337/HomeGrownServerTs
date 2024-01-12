import * as trpcExpress from '@trpc/server/adapters/express';
//import { inferAsyncReturnType } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import extractJWT from '@src/middleware/extractJWT';
import signJWT from '@src/middleware/signJWT';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

export type Context = {
  extractJWT: typeof extractJWT,
  signJWT: typeof signJWT,
  prisma: PrismaClient,
}

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> => ({extractJWT, signJWT, prisma});
