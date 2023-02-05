import { CartApi } from "./cart"
import { CustomerAPI } from "./customers"
import { LocalizationAPI } from "./localization"
import { OrdersAPI } from "./order"
import { SessionAPI } from "./session"

export interface SnipcartAPI {
    cart: CartApi
    orders: OrdersAPI
    customer: CustomerAPI
    localization: LocalizationAPI
    session: SessionAPI
}

export interface ReadOnlyStore {
    getState () : S
    subscribe (listener: () => void) : () => void
    listener: () => void
}

export interface EventEmitter {
    on ( eventName: string, callback: (payload: T) => void ) : void
    callback: (payload: T) => void
}

export interface SnipcartSDK {
    api: SnipcartAPI
    readonly store: ReadOnlyStore
    version: string
    events: EventEmitter
    ready: Promise<void>
}

