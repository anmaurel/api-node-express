import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { user: User } = prisma

async function main() {
    await User.create({
        data: {
            name: 'kevin',
            posts: {
                create: [
                    {
                        title: 'js destrcuturation',
                        content: '...',
                    },
                    {
                        title: 'es6',
                        content: '...',
                    },
                ],
            },
        },
    })
}

main()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
