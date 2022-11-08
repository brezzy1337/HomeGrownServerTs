// import { t } from '../utils/trpc.utils/trcp';
// import trcpRouter from '@src/routes/trpcRouter';
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
// import { mock, mockReset } from 'jest-mock-extended'
// import { createMockPrimsaContext, createMockTrpcContext, MockPrimsaContext, MockTrcpContext, PrismaContext, trpcContext } from './MockContext'
import { PrismaClient } from '@prisma/client';
import createServer from '../utils/server'
import supertest from "supertest";

const app = createServer();

const prisma = new PrismaClient();

// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// let mockCtx: MockPrimsaContext
// let ctx: PrismaContext
// let mockT: MockTrcpContext

// beforeEach(() => {
//   //This will create a new context before each test is run via the createMockContext function. This (mockCtx) context will be used to make a mock call to Prisma and run a query to test. The ctx context will be used to run a scenario query that is tested against.
//     mockCtx = createMockPrimsaContext();
//     ctx = mockCtx as unknown as PrismaContext
//     mockT = createMockTrpcContext();
    
//   });
  
  afterEach(() => {
    
  });
  
  // const userPayload = {
  //   id: 1,
  //   email: "test@test.com",
  //   username: 'test',
  //   password: 'test'
  // }
  
  describe('Connect to postgreSQL via prisma', () => {
    beforeAll(async () => {
      await prisma.$connect();
    });

    afterAll(async () => {
      await prisma.$disconnect();
    });

    describe('Test trpc routes via requests', async() => {
      describe('Test if user can register',async () => {
        it('should return a 200' , async () => {
          const { body, statusCode } = await supertest(app).post(`/api/trpc/register`)
          expect(statusCode).toBe(200)
          return(body);
        })
      })
    });
  });