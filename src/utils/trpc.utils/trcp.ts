import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Context } from './trpc.context';
// import superjson from 'superjson';

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

// export const t = initTRPC<{ ctx: Context }>()({
//     errorFormatter({ shape, error }) {
//       return {
//         ...shape,
//         data: {
//           ...shape.data,
//         }
//       };
//     },
//     transformer: superjson,
//   });

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();