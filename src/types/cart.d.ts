export interface ValidationErrorItem {
  validation: string
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attemptedValue?: any
}

export interface ValidationError {
  form: object
  fields: { [key: string]: ValidationErrorItem[] }
}

export interface Address {
  name: string
  company?: string
  address1: string
  address2?: string
  city: string
  country: string
  postalCode: string
  province?: string
  phone?: string
  vatNumber?: string
  errors?: ValidationError
}

export interface UpdateCartPayload {
  billingAddress?: Address
  shippingAddress?: Address
  shipToBillingAddress?: boolean
  email?: string
  customFields: string
}

/**
 * @description https://docs.snipcart.com/v3/sdk/reference#core-api-cart-CartAPI
 */
export interface CartApi {
  items: Array
  update(payload: UpdateCartPayload): Promise
}
