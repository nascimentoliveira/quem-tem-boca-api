import { Prisma } from '@prisma/client';

/**
 * Drink Entity
 *
 * This entity represents a drink in the system.
 * It includes the drink's ID, name, description (optional),
 * image URL, price, establishment ID, creation date, and last update date.
 *
 * @example
 * {
 *   id: 1,
 *   name: 'Soda',
 *   description: 'Refreshing beverage',
 *   imageUrl: 'https://example.com/drink.jpg',
 *   price: 250,
 *   establishmentId: 1,
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class Drink implements Partial<Prisma.DrinkUncheckedCreateInput> {
  /**
   * The unique identifier for the drink.
   * @example 1
   */
  id?: number;

  /**
   * The name of the drink.
   * @example 'Soda'
   */
  name: string;

  /**
   * A description of the drink (optional).
   * @example 'Refreshing beverage'
   */
  description?: string;

  /**
   * The URL of the drink's image.
   * @example 'https://example.com/drink.jpg'
   */
  imageUrl: string;

  /**
   * The price of the drink (in cents).
   * @example 250
   */
  price: number;

  /**
   * The identifier of the establishment to which the drink belongs.
   * @example 1
   */
  establishmentId: number;

  /**
   * The date and time when the drink was created.
   * @example '2023-09-20T12:00:00Z'
   */
  createdAt?: string | Date;

  /**
   * The date and time when the drink was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  updatedAt?: string | Date;

  /**
   * Constructor for the Drink entity.
   * @param data - Data to initialize the entity with.
   */
  constructor(data: Drink) {
    Object.assign(this, data);
  }
}
