import { t } from '../utils/trpc.utils/trcp';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const usersRouters = t.router({
  register: t.procedure
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
      let user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
        select: { id: true, email: true, username: true, password: true },
      });
      ctx.signJWT(user, (error, token) => {
        if (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        }
        return { token };
      });
    }),

  login: t.procedure
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

const trcpRouter = t.router({
  users: usersRouters,
});

export type TrcpRouter = typeof trcpRouter;
export default trcpRouter;
