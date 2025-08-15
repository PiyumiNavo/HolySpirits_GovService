/**
 * Standard API Response interface for consistent response structure
 * @export
 * @interface ApiResponse
 * @template T - Type of data contained in the response
 */
export interface ApiResponse<T> {
  /**
   * HTTP status code
   * @type {number}
   */
  status: number;

  /**
   * Response message
   * @type {string}
   */
  message: string;

  /**
   * Response data payload
   * @type {T}
   */
  data?: T;
}
