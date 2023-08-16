import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '../src/schema/auth/auth.utils'
const prisma = new PrismaClient()

const password = 'password123'
const userData: Prisma.UserCreateInput[] = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    password,
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          body: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    password,
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          body: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    username: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password,
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          body: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          body: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    u.password = await hashPassword(u.password)

    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
