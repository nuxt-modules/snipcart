import type { CartApi } from './cart'
import type { CustomerAPI } from './customers'
import type { LocalizationAPI } from './localization'
import type { OrdersAPI } from './order'
import type { SessionAPI } from './session'

export interface SnipcartAPI {
  cart: CartApi
  orders: OrdersAPI
  customer: CustomerAPI
  localization: LocalizationAPI
  session: SessionAPI
}

export interface ReadOnlyStore {
  getState (): S
  subscribe (listener: () => void): () => void
  listener: () => void
}

export interface EventEmitter {
  on (eventName: string, callback: (payload: T) => void): void
  callback: (payload: T) => void
}

export interface SnipcartSDK {
  api: SnipcartAPI
  readonly store: ReadOnlyStore
  version: string
  events: EventEmitter
  ready: Promise<void>
}
