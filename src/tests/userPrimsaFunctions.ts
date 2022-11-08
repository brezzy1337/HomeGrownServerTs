//Tests if Prisma is create data on the database

import { PrismaContext } from './MockContext'

interface CreateUser {
    email: string
    username: string
    password: string
  }

interface AddLocation {
    userId: number
    id: number
    address: string
    city: string
    state: string
    zip: number
    longitude: number
    latitude: number
  }

  interface AddPaymentMethod {
    userId: number
    id: number
    card: boolean
    cash: boolean
    Crypto: boolean
  }

export async function createUser(user: CreateUser, ctx: PrismaContext) {
      return await ctx.prisma.user.create({
        data: user,
      })
  };

  
  export async function addLocation(location: AddLocation, ctx: PrismaContext) {
    return await ctx.prisma.location.create({
      data: location,
    })
};

export async function addPaymentMethod(paymentMethod: AddPaymentMethod, ctx: PrismaContext) {
  return await ctx.prisma.paymentMethods.create({
    data: paymentMethod
  })
}

export async function LoginTest(user: CreateUser, ctx: PrismaContext) {
    return await ctx.prisma.user.create({
      data: user,
    })
};
