/**
 * @description https://docs.snipcart.com/v3/sdk/reference#core-api-customer-CustomerAPI
 */
export interface CustomerAPI {
  signin (email: string, password: string): Promise
  signout (): Promise
  register (email: string, password: string, passwordConfirm: string): Promise
  fetchOrders (limit: number, offset: number): Promise
}
