import { Context } from '../utils/prismaContext'

interface CreateUser {
    id: Number
    email: string
    username: string
    password: string
  }

interface AddLocation {
    id: Number
    address: string
    state: string
    zip: Number
  }

export async function createUser(user: CreateUser, ctx: Context) {
      return await ctx.prisma.user.create({
        data: user,
      })
  };

  export async function addLocation(location: AddLocation, ctx: Context) {
    return await ctx.prisma.location.create({
      data: location,
    })
};

export async function LoginTest(user: CreateUser, ctx: Context) {
    return await ctx.prisma.user.create({
      data:user,
    })
};
