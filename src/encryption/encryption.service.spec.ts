import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { faker } from '@faker-js/faker';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptEmail', () => {
    it(`should encrypt a user's email correctly`, () => {
      const email = faker.internet.email();
      const encryptedEmail = service.encryptEmail(email);
      const isValidHex = /^[0-9A-Fa-f]+$/g.test(encryptedEmail);

      expect(encryptedEmail).not.toBe(email);
      expect(encryptedEmail).toBeTruthy();
      expect(isValidHex).toBe(true);
      expect(encryptedEmail).toBe(service.encryptEmail(email));
    });
  });

  describe('encryptPassword', () => {
    it(`should encrypt a user's password correctly`, () => {
      const password = faker.internet.password();
      const encryptedPassword = service.encryptPassword(password);

      expect(encryptedPassword).not.toBe(password);
      expect(encryptedPassword).toBeTruthy();
      expect(encryptedPassword.length).toBeGreaterThan(0);
      expect(typeof encryptedPassword).toBe('string');
    });
  });

  describe('verifyPassword', () => {
    it(`should check a user's password is correct`, () => {
      const password = faker.internet.password();
      const encryptedPassword = service.encryptPassword(password);
      const isPasswordValid = service.verifyPassword(
        password,
        encryptedPassword,
      );

      expect(isPasswordValid).toBe(true);
    });

    it(`should check a user's password is incorrect`, () => {
      const password = faker.internet.password();
      const encryptedPassword = service.encryptPassword(password);
      const incorrectPassword = faker.internet.password();
      const isIncorrectPasswordValid = service.verifyPassword(
        incorrectPassword,
        encryptedPassword,
      );

      expect(password).not.toBe(incorrectPassword);
      expect(isIncorrectPasswordValid).toBe(false);
    });
  });
});
