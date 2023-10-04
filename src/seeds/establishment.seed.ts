import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

/**
 * Seed Establishments
 *
 * This function seeds the database with dummy establishment data.
 *
 * @param prisma - The PrismaService instance for interacting with the database.
 */
export async function seedEstablishments(prisma: PrismaService) {
  const generateEstablishmentData = () => {
    const phone = faker.phone.number('##-9####-####');
    const address =
      faker.location.street() + ', ' + faker.location.buildingNumber();
    const opening = faker.number.int({ min: 10, max: 18 }) + ':00';
    const closing = faker.number.int({ min: 19, max: 23 }) + ':00';
    const minTicket = faker.number.int({ min: 500, max: 2500 });
    const minServiceTime = faker.number.int({ min: 40, max: 80 });
    const maxServiceTime =
      minServiceTime + faker.number.int({ min: 10, max: 60 });

    return {
      phone,
      address,
      opening,
      closing,
      minTicket,
      minServiceTime,
      maxServiceTime,
    };
  };

  const establishmentsData = [
    {
      name: 'Alho e Óleo',
      description: 'Comida Brasileira',
      avatarUrl:
        'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2020%2F06%2F28%2F19%2FLogo-268745_141343_195610032_635995249.jpg',
      bannerUrl:
        'https://blog.decorlumen.com.br/wp-content/uploads/2020/09/restaurante_4.jpg',
    },
    {
      name: 'Bendita Comida',
      description: 'Comida Brasileira',
      avatarUrl:
        'https://i.pinimg.com/1200x/cf/dc/35/cfdc35f516f249f7f52cfa61123ebe37.jpg',
      bannerUrl:
        'https://f.i.uol.com.br/fotografia/2021/11/17/163717032261953c9245429_1637170322_5x2_lg.jpg',
    },
    {
      name: "Author's Cuisine",
      description: 'Italian cuisine',
      avatarUrl:
        'https://static.vecteezy.com/ti/vetor-gratis/p3/10411845-restaurante-logo-design-modelo-gratis-vetor.jpg',
      bannerUrl:
        'https://www.melhoresdestinos.com.br/wp-content/uploads/2023/06/melhores-restaurantes-do-mundo-2023-capa.jpg',
    },
    {
      name: 'Restaurant',
      description: 'Comida Vegana',
      avatarUrl:
        'https://static.vecteezy.com/ti/vetor-gratis/p3/10411845-restaurante-logo-design-modelo-gratis-vetor.jpg',
      bannerUrl:
        'https://assets.architecturaldigest.in/photos/6385cf3311f0276636badfb6/16:9/w_2560%2Cc_limit/DSC_8367-Edit-W.png',
    },
    {
      name: 'The Grill',
      description: 'Comida Grelhada',
      avatarUrl:
        'https://i.pinimg.com/originals/39/a9/62/39a962d2dd225d24c62cb97112ff8523.jpg',
      bannerUrl:
        'https://static.wixstatic.com/media/6ed6ef_be16c4edaf764fc3bc794a92b9feddb0~mv2.jpg/v1/fill/w_640,h_346,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6ed6ef_be16c4edaf764fc3bc794a92b9feddb0~mv2.jpg',
    },
    {
      name: 'Food Restaurant',
      description: 'Fast Food',
      avatarUrl:
        'https://i0.wp.com/gostart.biz/wp-content/uploads/2023/04/Restaurant-logo-design-free-template-scaled.jpg?fit=2560%2C1440&ssl=1',
      bannerUrl:
        'https://receitasrapidasefaceis.com/wp-content/uploads/2023/04/Comida-Mineira.jpg',
    },
    {
      name: 'The Grill',
      description: 'Comida Grelhada',
      avatarUrl:
        'https://www.seoclerk.com/pics/001/068/127/44b7b7e806aca49d1fe0a226feb75868.jpg',
      bannerUrl:
        'https://img.band.uol.com.br/image/2023/04/24/churrasco-12750_800x450.webp',
    },
  ];

  for (const establishmentData of establishmentsData) {
    await prisma.establishment.create({
      data: { ...establishmentData, ...generateEstablishmentData() },
    });
  }
  for (const establishmentData of establishmentsData) {
    await prisma.establishment.create({
      data: { ...establishmentData, ...generateEstablishmentData() },
    });
  }
}
