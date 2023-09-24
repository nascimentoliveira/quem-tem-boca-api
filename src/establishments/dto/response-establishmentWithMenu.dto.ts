import { ApiProperty } from '@nestjs/swagger';
import { EstablishmentResponseDTO } from './response-establishment.dto';
import { DishResponseDTO } from 'src/dishes/dto/response-dish.dto';
import { DrinkResponseDTO } from 'src/drinks/dto/response-drink.dto';

/**
 * Establishment With Menu Response DTO
 *
 * This DTO represents establishment information when retrieved as a response,
 * including the establishment's ID, name, phone, address, opening, closing,
 * description, minTicket, minServiceTime, maxServiceTime, avatarUrl,
 * bannerUrl, creation date, last update date, as well as the list of dishes
 * and drinks offered by the establishment.
 *
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
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 *   dishes: [
 *     {
 *       id: 1,
 *       name: 'Pizza Margherita',
 *       description: 'Classic Italian pizza',
 *       imageUrl: 'https://example.com/pizza.jpg',
 *       price: 4999,
 *       createdAt: '2023-09-20T12:00:00Z',
 *       updatedAt: '2023-09-20T14:30:00Z',
 *     },
 *     // ... Other dishes
 *   ],
 *   drinks: [
 *     {
 *       id: 1,
 *       name: 'Soda',
 *       description: 'Refreshing beverage',
 *       imageUrl: 'https://example.com/soda.jpg',
 *       price: 250,
 *       createdAt: '2023-09-20T12:00:00Z',
 *       updatedAt: '2023-09-20T14:30:00Z',
 *     },
 *     // ... Other drinks
 *   ],
 * }
 */
export class EstablishmentWithMenuResponseDTO extends EstablishmentResponseDTO {
  /**
   * An array of dishes offered by the establishment.
   * @example
   * [
   *   {
   *     id: 1,
   *     name: 'Pizza Margherita',
   *     description: 'Classic Italian pizza',
   *     imageUrl: 'https://example.com/pizza.jpg',
   *     price: 4999,
   *     createdAt: '2023-09-20T12:00:00Z',
   *     updatedAt: '2023-09-20T14:30:00Z',
   *   },
   *   // ... Other dishes
   * ]
   */
  @ApiProperty({
    type: [DishResponseDTO],
    isArray: true,
    example: [
      {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Classic Italian pizza',
        imageUrl: 'https://example.com/pizza.jpg',
        price: 4999,
        createdAt: '2023-09-20T12:00:00Z',
        updatedAt: '2023-09-20T14:30:00Z',
      },
    ],
    description: 'An array of dishes offered by the establishment.',
  })
  readonly dishes?: DishResponseDTO[];

  /**
   * An array of drinks offered by the establishment.
   * @example
   * [
   *   {
   *     id: 1,
   *     name: 'Soda',
   *     description: 'Refreshing beverage',
   *     imageUrl: 'https://example.com/soda.jpg',
   *     price: 250,
   *     createdAt: '2023-09-20T12:00:00Z',
   *     updatedAt: '2023-09-20T14:30:00Z',
   *   },
   *   // ... Other drinks
   * ]
   */
  @ApiProperty({
    type: [DrinkResponseDTO],
    isArray: true,
    example: [
      {
        id: 1,
        name: 'Soda',
        description: 'Refreshing beverage',
        imageUrl: 'https://example.com/soda.jpg',
        price: 250,
        establishmentId: 1,
        createdAt: '2023-09-20T12:00:00Z',
        updatedAt: '2023-09-20T14:30:00Z',
      },
    ],
    description: 'An array of drinks offered by the establishment.',
  })
  readonly drinks?: DrinkResponseDTO[];
}
