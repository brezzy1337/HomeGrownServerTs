import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
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

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({extractJWT, signJWT, prisma}); // no context

export type Context = inferAsyncReturnType<typeof createContext>;
