import { Prisma } from '@prisma/client';

/**
 * Establishment Entity
 *
 * This entity represents an establishment in the application. It includes properties
 * such as the establishment's ID, name, phone, address, opening hours, description,
 * minimum ticket amount, minimum service time, maximum service time, avatar URL, banner URL,
 * creation date, and last update date.
 * @example
 * {
 *   id: 1,
 *   name: 'Restaurant XYZ',
 *   phone: '12-34567-8901',
 *   address: '123 Main Street',
 *   opening: '14:00',
 *   closing: '22:00',
 *   description: 'Fast food',
 *   minTicket: 10,
 *   minServiceTime: 60,
 *   maxServiceTime: 80,
 *   avatarUrl: 'https://example.com/avatar.jpg',
 *   bannerUrl: 'https://example.com/banner.jpg',
 *   createdAt: '2023-09-20T10:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class Establishment
  implements Partial<Prisma.EstablishmentUncheckedCreateInput>
{
  /**
   * Unique identifier for the establishment.
   * @example 1
   */
  readonly id?: number;

  /**
   * The name of the establishment.
   * @example 'Restaurant XYZ'
   */
  readonly name: string;

  /**
   * The phone number of the establishment.
   * @example '12-34567-8901'
   */
  readonly phone: string;

  /**
   * The address of the establishment.
   * @example '123 Main Street'
   */
  readonly address: string;

  /**
   * The opening time of the establishment.
   * A string representing the time (e.g., "14:00").
   * @example '14:00'
   */
  readonly opening: string;

  /**
   * The closing time of the establishment.
   * A string representing the time (e.g., "22:00").
   * @example '22:00'
   */
  readonly closing: string;

  /**
   * A description of the establishment.
   * @example 'Fast food'
   */
  readonly description: string;

  /**
   * The minimum ticket amount for the establishment.
   * @example 10
   */
  readonly minTicket: number;

  /**
   * The minimum service time in minutes for the establishment.
   * @example 60
   */
  readonly minServiceTime: number;

  /**
   * The maximum service time in minutes for the establishment.
   * @example 80
   */
  readonly maxServiceTime: number;

  /**
   * The URL of the establishment's avatar image.
   * @example 'https://example.com/avatar.jpg'
   */
  readonly avatarUrl: string;

  /**
   * The URL of the establishment's banner image.
   * @example 'https://example.com/banner.jpg'
   */
  readonly bannerUrl: string;

  /**
   * The date and time when the establishment was created.
   * Can be a string representing the date and time or a Date object.
   * @example '2023-09-20T10:00:00Z'
   */
  readonly createdAt?: string | Date;

  /**
   * The date and time when the establishment was last updated.
   * Can be a string representing the date and time or a Date object.
   * @example '2023-09-20T14:30:00Z'
   */
  readonly updatedAt?: string | Date;

  /**
   * Creates a new instance of the Establishment class.
   * @param data - An object containing establishment data to initialize the instance.
   */
  constructor(data: Establishment) {
    Object.assign(this, data);
  }
}
