/**
 * @description https://docs.snipcart.com/v3/sdk/reference#core-api-session-SessionAPI
 */

export interface SessionAPI {
  setLanguage (lang: string, overrides?: Map[string]): void
  setCurrency (currency: string): void
}
