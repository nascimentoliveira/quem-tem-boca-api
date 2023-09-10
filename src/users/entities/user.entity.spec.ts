import { faker } from '@faker-js/faker';
import { User } from './user.entity';

describe('User', () => {
  it('should create an instance of User', () => {
    const fakeUserData = {
      id: faker.number.int(100),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    const user = new User(fakeUserData);

    expect(user).toEqual(fakeUserData);
  });
});
