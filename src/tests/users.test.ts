import { MockContext, Context, createMockContext } from '../utils/prismaContext';
import { createUser, addLocation } from '../tests/userPrimsaFunctions';


let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
});

afterEach(() => {

  });

test('should create a new user', async () => {
    const user = {
        id: 1,
        email: "devin@gmail.com",
        username: "brezzy",
        password: "zen121314"
    }
    mockCtx.prisma.user.create.mockResolvedValue(user)

    await expect(createUser(user, ctx)).resolves.toEqual({
        id: 1,
        email: "devin@gmail.com",
        username: "brezzy",
        password: "zen121314"
    })
});

test('should add a location to the user', async () => {
    const location = {
        id: 1,
        address: "5513 241 St. W.",
        state: "MN",
        zip: 41221
    }    
   // mockCtx.prisma.location.create.mockResolvedValue(location)

    await expect(addLocation(location, ctx)).resolves.toEqual({
        id: 1,
        address: "5513 241 St. W.",
        state: "MN",
        zip: 41221
    })
});

test('should attempt to create a user and fail because duplicate username, and password', async () => {
    const user1 = {
        id: 1,
        email: "devin@gmail.com",
        username: "brezzy",
        password: "zen121314"
    }
    await mockCtx.prisma.user.create.mockResolvedValue(user1)

    const user2 = {
        id: 2,
        email: "devin@gmail.com",
        username: "brezzy",
        password: "zen121314"
    }
    
    //expect(await mockCtx.prisma.user.create.mockResolvedValue(user2).rejects);
    const user3 = {
        id: 3,
        email: "devin@gmail.com",
        username: "bre",
        password: "zen121314"
    }
    //expect(await mockCtx.prisma.user.create.mockResolvedValue(user3).rejects);

    const user4 = {
        id: 4,
        email: "d@gmail.com",
        username: "brezzy",
        password: "zen121314"
    }
    //expect(await mockCtx.prisma.user.create.mockResolvedValue(user4).rejects);
});





