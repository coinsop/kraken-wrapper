import request from './helpers/request';

/**
 * Kraken encapsulates the methods for varios API wrapper objects
 */
class Kraken {
  /**
   * Create a new Kraken
   * @param {string} [apiKey] - The API key to authenticate to Kraken. If the API
   *                                                key is not provided request will be made to the
   *                                                public endpoints only.
   * @param {string} [apiBase=api.kraken.com] - The base Kraken API URL
   */
  constructor(apiKey, apiBase = 'api.kraken.com') {
    this.__apiKey = apiKey || {};
    this.__apiBase = apiBase;
  }

  /**
   * Returns a json object with the unix and rfc 1123 time
   * of the Kraken servers
   * This is to aid in approximating the skew time between the server and client.
   * @param  {Function} cb - callback]
   * @return {Object}  - JSON Object { unixtime: 1497805936,
   *                                                         rfc1123: 'Sun, 18 Jun 17 17:12:16 +0000' }
   */
  getTime(cb) {
    const options = {
      hostname: this.__apiBase,
      port: 443,
      path: '/0/public/Time',
      method: 'GET',
    }
    request(options).then((response) => {
      return cb(null, response.result);
    }).catch((error) => cb(error));
  }

}

module.exports = Kraken;
