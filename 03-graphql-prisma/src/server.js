import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const foundUser = await prisma.user.findUnique({
    where: {
      email: "xyz@test.com",
    },
  });

  console.log(foundUser);

  //   await prisma.user.deleteMany();
  //   const createdUser = await prisma.user.create({
  //     data: {
  //       name: "Monica Geller",
  //       email: "monica@test.com",
  //       password: "monica123",
  //       age: 23,
  //       role: "ANALYST",
  //     },
  //   });

  //   console.log("NEW ITEM : ", createdUser);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
