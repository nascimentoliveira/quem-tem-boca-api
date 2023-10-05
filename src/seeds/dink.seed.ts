import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

/**
 * Seed Drinks
 *
 * This function seeds the database with dummy drink data.
 *
 * @param prisma - The PrismaService instance for interacting with the database.
 */
export async function seedDrinks(prisma: PrismaService) {
  const generateDrinkData = () => {
    const price = faker.number.int({ min: 300, max: 2000 });
    return {
      price,
    };
  };

  const drinksData = [
    {
      name: 'Água',
      description: 'Sem gás - 500ml',
      imageUrl:
        'https://static23.minhalojanouol.com.br/clgatacado/produto/20201016113738_8310991690_D.jpg',
    },
    {
      name: 'Refrigerante',
      description: 'Lata - 350ml',
      imageUrl:
        'https://emsters.com.br/pub/wp-content/uploads/2023/02/download.jpg',
    },
    {
      name: 'Suco Natural ',
      description: '500ml',
      imageUrl:
        'https://s2-ge.glbimg.com/64QeEkjeZkr4WG0cQY0gFzTCAC4=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/3/3/92w4EYREyRINApxl77eQ/suco-frutas.jpg',
    },
    {
      name: 'Refrigerante ',
      description: '2 litros',
      imageUrl:
        'https://loja.barracadoze.com.br/wp-content/uploads/sites/5/2020/10/refrigerante-de-2-litros-min-min.png',
    },
    {
      name: 'Água',
      description: 'Sem gás - 500ml',
      imageUrl:
        'https://static23.minhalojanouol.com.br/clgatacado/produto/20201016113738_8310991690_D.jpg',
    },
    {
      name: 'Refrigerante',
      description: 'Lata - 350ml',
      imageUrl:
        'https://emsters.com.br/pub/wp-content/uploads/2023/02/download.jpg',
    },
    {
      name: 'Suco Natural ',
      description: '500ml',
      imageUrl:
        'https://s2-ge.glbimg.com/64QeEkjeZkr4WG0cQY0gFzTCAC4=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/3/3/92w4EYREyRINApxl77eQ/suco-frutas.jpg',
    },
    {
      name: 'Refrigerante ',
      description: '2 litros',
      imageUrl:
        'https://loja.barracadoze.com.br/wp-content/uploads/sites/5/2020/10/refrigerante-de-2-litros-min-min.png',
    },
    {
      name: 'Água',
      description: 'Sem gás - 500ml',
      imageUrl:
        'https://static23.minhalojanouol.com.br/clgatacado/produto/20201016113738_8310991690_D.jpg',
    },
    {
      name: 'Refrigerante',
      description: 'Lata - 350ml',
      imageUrl:
        'https://emsters.com.br/pub/wp-content/uploads/2023/02/download.jpg',
    },
    {
      name: 'Suco Natural ',
      description: '500ml',
      imageUrl:
        'https://s2-ge.glbimg.com/64QeEkjeZkr4WG0cQY0gFzTCAC4=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/3/3/92w4EYREyRINApxl77eQ/suco-frutas.jpg',
    },
    {
      name: 'Refrigerante ',
      description: '2 litros',
      imageUrl:
        'https://loja.barracadoze.com.br/wp-content/uploads/sites/5/2020/10/refrigerante-de-2-litros-min-min.png',
    },
  ];

  const establishments = await prisma.establishment.findMany();
  for (const establishment of establishments) {
    for (const drinkData of drinksData) {
      await prisma.drink.create({
        data: {
          ...drinkData,
          ...generateDrinkData(),
          establishmentId: establishment.id,
        },
      });
    }
  }
}
