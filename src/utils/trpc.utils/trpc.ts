import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Context } from './trpc.context';

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();