/**
 * @description https://docs.snipcart.com/v3/sdk/reference#core-api-cart-CartAPI
 */
export interface OrdersAPI {
    fetch ( token: string ) : Promise
    token: string
}