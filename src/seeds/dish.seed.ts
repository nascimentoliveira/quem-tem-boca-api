import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

/**
 * Seed Dishes
 *
 * This function seeds the database with dummy dish data.
 *
 * @param prisma - The PrismaService instance for interacting with the database.
 */
export async function seedDishes(prisma: PrismaService) {
  const generateDishData = () => {
    const price = faker.number.int({ min: 1000, max: 10000 });
    return {
      price,
    };
  };

  const dishesData = [
    {
      name: 'Strogonoff',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://www.sabornamesa.com.br/media/k2/items/cache/c910db2cadeb7dd44121f01e6d7b155d_XL.jpg',
    },
    {
      name: 'Bife à Parmediana',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://www.estadao.com.br/resizer/fOA6pWPuQg9h0Ep7WtiXgDr6PFE=/720x503/filters:format(jpg):quality(80):focal(775x1125:785x1135)/cloudfront-us-east-1.images.arcpublishing.com/estadao/WSWGR3VNIVEMZEDCZ3DPAQD3BQ.jpg',
    },
    {
      name: 'Bife à Cavalo',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2023/06/06/568823943-bife-a-cavalo-1.jpg',
    },
    {
      name: 'Macarronada',
      description: 'Espaguete, molho à bolonhesa',
      imageUrl:
        'https://www.sabornamesa.com.br/media/k2/items/cache/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
    },
    {
      name: 'Frango Assado',
      description: 'Arroz, legumes',
      imageUrl:
        'https://www.hojetemfrango.com.br/wp-content/uploads/2018/12/coxa-de-frango-assada-com-legumes-e-azeite-de-ervas-e-arroz-com-cogumelos.jpg',
    },
    {
      name: 'Feijoada',
      description: 'Arroz, couve, farofa, torresmo',
      imageUrl: 'https://img.cybercook.com.br/receitas/776/feijoada.jpeg',
    },
    {
      name: 'Strogonoff',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://www.sabornamesa.com.br/media/k2/items/cache/c910db2cadeb7dd44121f01e6d7b155d_XL.jpg',
    },
    {
      name: 'Bife à Parmediana',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://www.estadao.com.br/resizer/fOA6pWPuQg9h0Ep7WtiXgDr6PFE=/720x503/filters:format(jpg):quality(80):focal(775x1125:785x1135)/cloudfront-us-east-1.images.arcpublishing.com/estadao/WSWGR3VNIVEMZEDCZ3DPAQD3BQ.jpg',
    },
    {
      name: 'Bife à Cavalo',
      description: 'Carne, arroz, batata frita',
      imageUrl:
        'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2023/06/06/568823943-bife-a-cavalo-1.jpg',
    },
    {
      name: 'Macarronada',
      description: 'Espaguete, molho à bolonhesa',
      imageUrl:
        'https://www.sabornamesa.com.br/media/k2/items/cache/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg',
    },
    {
      name: 'Frango Assado',
      description: 'Arroz, legumes',
      imageUrl:
        'https://www.hojetemfrango.com.br/wp-content/uploads/2018/12/coxa-de-frango-assada-com-legumes-e-azeite-de-ervas-e-arroz-com-cogumelos.jpg',
    },
    {
      name: 'Feijoada',
      description: 'Arroz, couve, farofa, torresmo',
      imageUrl: 'https://img.cybercook.com.br/receitas/776/feijoada.jpeg',
    },
  ];

  const establishments = await prisma.establishment.findMany();
  for (const establishment of establishments) {
    for (const dishData of dishesData) {
      await prisma.dish.create({
        data: {
          ...dishData,
          ...generateDishData(),
          establishmentId: establishment.id,
        },
      });
    }
  }
}
