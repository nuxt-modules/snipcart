export interface LocalizationQuery {
  query: string
  context: string
}

/**
 * @description https://docs.snipcart.com/v3/sdk/reference#core-api-localization-LocalizationAPI
 */
export interface LocalizationAPI {
  fetchSuggestedAddresses (query: LocalizationQuery): Promise
}
