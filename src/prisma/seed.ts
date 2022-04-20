import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    
    const Devin = await prisma.user.upsert({
        where: { email: 'devin@homegrown.com'},
        update: {},
        create: {
            email: 'devin@prisma.io',
            username: 'brezzy1337',
            password: '121314',
            location: {
                create: {
                    address: '5531 128th St. W.',
                    state: 'MN',
                    zip: 55124
                }
            }
        },
    })
    console.log(Devin);
};

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
});