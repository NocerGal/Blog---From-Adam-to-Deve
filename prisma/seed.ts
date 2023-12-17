import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  // Créer des utilisateurs
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        // Créer un profil pour chaque utilisateur
        profile: {
          create: {
            bio: faker.lorem.sentences(2),
          },
        },
      },
    });

    // Créer des posts pour certains utilisateurs
    if (i % 2 === 0) {
      // Par exemple, pour les utilisateurs pairs
      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          published: faker.datatype.boolean(),
          authorId: user.id,
        },
      });
    }
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
