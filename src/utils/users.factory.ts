import { faker } from '@faker-js/faker';
import { User } from '../users/entities/user.entity';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { Injectable } from '@nestjs/common';

/**
 * UserFactory
 *
 * A factory for creating user entity instances with fake data for testing.
 */
@Injectable()
export class UsersFactory {
  /**
   * Initializes a new instance of the UsersFactory class.
   * @param encryptionService The encryption service used to hash passwords and encrypt emails.
   */
  constructor(private readonly encryptionService: EncryptionService) {}

  /**
   * Creates a new User instance with the provided properties.
   * @param props The properties used to create the user.
   * @returns A new User instance.
   */
  create(props: User | CreateUserDTO): User {
    const id: number = faker.number.int(100);
    const createdAt = new Date();
    const updatedAt = new Date();
    return new User({
      id,
      email: this.encryptionService.encryptEmail(props.email),
      username: props.username,
      password: this.encryptionService.encryptPassword(props.password),
      createdAt,
      updatedAt,
    });
  }

  /**
   * Generates user parameters based on the provided properties or randomly generates them if not provided.
   * @param props Partial properties to customize user generation (e.g., email, username, password).
   * @returns A CreateUserDTO object containing user parameters.
   */
  generateUserParams(props: Partial<CreateUserDTO> = {}): CreateUserDTO {
    const firstName: string =
      props.username?.split(' ')[0] || faker.person.firstName();
    const lastName: string =
      props.username?.split(' ')[1] || faker.person.lastName();
    const email: string =
      props.email || faker.internet.email({ firstName, lastName });
    const username: string = firstName + ' ' + lastName;
    const password: string = props.password || faker.internet.password();
    return { email, username, password };
  }
}
