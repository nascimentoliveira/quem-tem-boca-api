import { Prisma } from '@prisma/client';

/**
 * Dish Entity
 *
 * This entity represents a dish in the database. It includes properties such as
 * the dish's unique identifier (ID), name, optional description, image URL, price,
 * establishment identifier, creation date, and last update date.
 *
 * @example
 * {
 *   id: 1,
 *   name: 'Pizza Margherita',
 *   description: 'Classic Italian pizza',
 *   imageUrl: 'https://example.com/pizza.jpg',
 *   price: 4999,
 *   establishmentId: 1,
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class Dish implements Partial<Prisma.DishUncheckedCreateInput> {
  /**
   * The unique identifier for the dish.
   * @example 1
   */
  id?: number;

  /**
   * The name of the dish.
   * @example 'Pizza Margherita'
   */
  name: string;

  /**
   * A description of the dish (optional).
   * @example 'Classic Italian pizza'
   */
  description?: string;

  /**
   * The URL of the dish's image.
   * @example 'https://example.com/pizza.jpg'
   */
  imageUrl: string;

  /**
   * The price of the dish (in cents).
   * @example 4999
   */
  price: number;

  /**
   * The identifier of the establishment to which the dish belongs.
   * @example 1
   */
  establishmentId: number;

  /**
   * The date and time when the dish was created.
   * @example '2023-09-20T12:00:00Z'
   */
  createdAt?: string | Date;

  /**
   * The date and time when the dish was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  updatedAt?: string | Date;

  /**
   * Creates a new instance of the Dish class.
   * @param data - The data to initialize the dish with.
   */
  constructor(data: Dish) {
    Object.assign(this, data);
  }
}
