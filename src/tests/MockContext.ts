import { PrismaClient } from "@prisma/client";
import { TrcpRouter } from "@src/routes/trpcRouter";
// import { t } from '../utils/trpc.utils/trcp';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type PrismaContext = {
  prisma: PrismaClient,
}

export type MockPrimsaContext = {
  prisma: DeepMockProxy<PrismaClient>,
}

export const createMockPrimsaContext = (): MockPrimsaContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

export type trpcContext = {
  trpc: TrcpRouter,
}

export type MockTrcpContext = {
  trcp: DeepMockProxy<TrcpRouter>,
}

export const createMockTrpcContext = (): MockTrcpContext => {
  return {
    trcp: mockDeep<TrcpRouter>()
  }
}