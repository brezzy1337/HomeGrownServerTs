import { MockPrimsaContext, PrismaContext, createMockPrimsaContext } from './MockContext';
import { createUser, addLocation, addPaymentMethod } from '../tests/userPrimsaFunctions';


let mockCtx: MockPrimsaContext
let ctx: PrismaContext

beforeEach(() => {
    mockCtx = createMockPrimsaContext()
    ctx = mockCtx as unknown as PrismaContext
});

afterEach(() => {

});
  
  describe('test primsa and db ability to create a user', () => {
      
        const user = {
            id: 1,
            email: "test@test.com",
            username: "brezzy",
            password: "zen121314"
        }

        const location = {
            userId: 1,
            id: 1,
            address: 'a',
            city: 'a',
            state: 'a',
            zip: 1,
            longitude: 0,
            latitude: 0
        }

        const paymentMethod = {
            userId: 1,
            id: 1,
            card: false,
            cash: true,
            Crypto: false
        }
    
      test('should create a new user', async () => {
      mockCtx.prisma.user.create.mockResolvedValue(user);
        
        await expect(createUser(user, ctx)).resolves.toEqual({
            id: 1,
            email: "test@test.com",
            username: "brezzy",
            password: "zen121314"
        })
    });
        
    test('should add a address to a user',async () => {
        mockCtx.prisma.location.create.mockResolvedValue(location);

        await expect(addLocation(location, ctx)).resolves.toEqual({
            userId: 1,
            id: 1,
            address: 'a',
            city: 'a',
            state: 'a',
            zip: 1,
            longitude: 0,
            latitude: 0
            });
    });

    test('should add a payment type to the user',async () => {
        mockCtx.prisma.paymentMethods.create.mockResolvedValue(paymentMethod);

        await expect(addPaymentMethod(paymentMethod, ctx)).resolves.toEqual({
            userId:1,
            id: 1,
            Crypto: false,
            card: false,
            cash: true
        });
    });
  
});




