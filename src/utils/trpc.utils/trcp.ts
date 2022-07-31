import { initTRPC } from '@trpc/server';
import { Context } from './trpc.context';
import superjson from 'superjson';

// interface Context {
//   user?: {
//     id: string;
//     name: string;
//   };
// }

// interface Meta {
//   openapi: {
//     enabled: boolean;
//     method: string;
//     path: string;
//   };
// }

export const t = initTRPC<{ ctx: Context }>()({
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
        }
      };
    },
    transformer: superjson,
  })