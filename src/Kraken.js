import request from './helpers/request';

/**
 * Kraken encapsulates the methods for varios API wrapper objects
 */
class Kraken {
  /**
   * Create a new Kraken
   * @param {string} [apiKey] - The API key to authenticate to Kraken. If the API
   *                                                key is not provided request will be made to the public endpoints only
   * @param {string} [apiBase=https://api.kraken.com] - The base Kraken API URL
   */
  constructor(apiKey, apiBase = 'https://api.kraken.com ') {
    this.__apiKey = apiKey || {};
    this.__apiBase = apiBase;

  }
}

export default Kraken;
