import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < 10; i++) {
    // Créer des utilisateurs
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        image: faker.internet.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });

    // Créer des posts pour certains utilisateurs
    if (i % 2 === 0) {
      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          postDescription: faker.lorem.sentence(2),
          published: faker.datatype.boolean(),
          authorId: user.id,
        },
      });
    }
    // Créer des comptes pour chaque utilisateur
    await prisma.account.create({
      data: {
        userId: user.id,
        type: faker.person.jobTitle(),
        provider: 'provider_' + faker.random.word(),
        providerAccountId: faker.finance.account(),
      },
    });

    // Créer des sessions pour chaque utilisateur
    await prisma.session.create({
      data: {
        sessionToken: faker.random.alphaNumeric(20),
        userId: user.id,
        expires: faker.date.future(),
      },
    });

    // Créer des jetons de vérification pour chaque utilisateur
    await prisma.verificationToken.create({
      data: {
        identifier: faker.internet.email(),
        token: faker.string.uuid(),
        expires: faker.date.future(),
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
