import { t } from '../utils/trpc.utils/trcp';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { BraintreeGQLClient } from '@src/GraphQL/BraintreeGQLClient';
import { NEW_GET_CLIENT_TOKEN } from '@src/GraphQL/BrainTreeQueries';
import { VAULT_PAYMENT_MEHTOD } from '@src/GraphQL/BrainTreeQueries';

const authRouters = t.router({
  register: t.procedure
  .meta({ openapi: { method: 'POST', path: '/register'}})
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let hash = await bcrypt.hash(input.password, 10);
      if (hash === input.password) {
        throw new Error('password did not hash');
      }
      try {
        await ctx.prisma.user.create({
          data: {
            email: input.email,
            username: input.username,
            password: hash,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
      //revise type of any to optimal type
      let user: any = await ctx.prisma.user.findUnique({
        where: { username: input.username },
        select: { id: true, email: true, username: true, password: true },
      });
      ctx.signJWT(user, (error, token) => {
        if (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        } else if (token) {
          return {
            token,
            message: 'Auth Successful',
          };
        }
      });
    }),

  login: t.procedure
    .meta({ openapi: { method: 'POST', path: '/login', protect: true }})
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
        select: { id: true, email: true, username: true, password: true },
      });

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid Login' });
      };

      let match = await bcrypt.compare(input.password, user.password);

      if (!match) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid Login'});
      };

      ctx.signJWT(user, (error, token) => {
        if (error) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        } else if (token) {
          return {
            token,
            message: 'Auth Successful',
          };
        }
      });
    }),
});

const BrainTreeRouter = t.router({
  getBrainTreeToken: t.procedure
  .meta({ openapi: { method: 'POST', path: '/BraintreePaypal'}})
  .mutation(async ({ ctx }) => {
    ctx.extractJWT;

    const data = await BraintreeGQLClient.request(NEW_GET_CLIENT_TOKEN);

    if (data === null || undefined || '') {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'BrainTree not responding' });
    } else {
      console.log(JSON.stringify(data, undefined, 2));
      return data;
    }
  }),
  vaultPaymentMethod: t.procedure.input(
    z.object({
      nonce: z.string()
    }),
  ).mutation(async ({ctx, input}) => {
    ctx.extractJWT;

    const variables = {
      input: {
        paymentMethodID: input.nonce,
      },
    };

    const data = await BraintreeGQLClient.request(VAULT_PAYMENT_MEHTOD, variables);
    
    if (data === null || undefined || '') {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'BrainTree not responding' });
    } else {
      console.log(JSON.stringify(data, undefined, 2));
      return data;
    }
  })
});

const trcpRouter = t.router({
  auth: authRouters,
  braintree: BrainTreeRouter
});

export type TrcpRouter = typeof trcpRouter;
export default trcpRouter;
