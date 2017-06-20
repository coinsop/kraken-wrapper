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

  /**
   * Returns a json object with a list of the assets available on kraken
   *
   * @param {string} [assets] - comma delimited list of assets to get
   *                                              info on for given asset class (optional).
   *                                              default = null
   * @param  {Function} cb - callback]
   * @return {Object}  - JSON Object - { XETH: { aclass: 'currency', altname: 'ETH', decimals: 10,  display_decimals: 5 } }
   *
   */
  getAssetInfo(assets=null, cb) {
    let path = '/0/public/Assets';

    if (assets && assets !== 'all' ) {
      if (typeof assets !== 'string') {
        return cb('Assets option must be a string, could be all for all assets or a comma separated values such as ETH,XRP');
      }
      // Remove any whitespace
      assets = assets.replace(/\s/g,'')
      path = `${path}?asset=${assets}`;
    }

    const options = {
      hostname: this.__apiBase,
      port: 443,
      path: path,
      method: 'GET',
    }
    request(options).then((response) => {
      return cb(null, response.result);
    }).catch((error) => cb(error));
  }

  /**
   * Get tradable asset pairs
   * Returns an array of pair names and their info
   *
   * @param {object} [inputs] - { info: 'all' // (default = all)  leverage, fees, margin (optional)
   *                                                   pair: 'all' // (default = all), comma delimited list of asset pairs to get info on
   *                                                 }
   * @param  {Function} cb - callback
   * @return {Object}  - JSON Object - "DASHUSD": {"altname": "DASHUSD","aclass_base": "currency","base": "DASH",
   *                                                                               "aclass_quote": "currency","quote": "ZUSD","lot": "unit","pair_decimals": 5,
   *                                                                               "lot_decimals": 8,"lot_multiplier": 1,"leverage_buy": [],"leverage_sell": [],"fees": [...],
   *                                                                               "fees_maker": [..],"fee_volume_currency": "ZUSD","margin_call": 80,"margin_stop": 40}
   *
   */
  getTradableAssetPairs(inputs={}, cb) {
    let path = '/0/public/AssetPairs';
    let infoEnum = ['all', 'leverage', 'fees', 'margin'];

    if (inputs) {
      let pairSeparator = '?';

      // Check if inputs.info is valid
      if (inputs.info && typeof inputs.info === 'string' && infoEnum.indexOf(inputs.info) >= 0) {
        if (inputs.info !== 'all') { // although all is in the documentation of the Kraken API this value produces an error if used
          path = `${path}?info=${inputs.info}`;
          pairSeparator = '&';
        }
      } else {
        return cb('Option info must be a string, could be all, leverage, fees or margin');
      }

      // Check if inputs.pair is valid
      if (inputs.pair && typeof inputs.pair === 'string') {
        const pair = inputs.pair.replace(/\s/g,''); // Remove any whitespace
        if (inputs.pair !== 'all') { // although all is in the documentation of the Kraken API this value produces an error if used
          path = `${path}${pairSeparator}pair=${inputs.pair}`;
        }
      } else {
        return cb('Assets option must be a string, could be all for all assets or a comma separated values such as ETH,XRP');
      }
    } else {
      return cb("getTradableAssetPairs require an input {info:'all', pair:'all'} as first argument");
    }

    const options = {
      hostname: this.__apiBase,
      port: 443,
      path: path,
      method: 'GET',
    }

    request(options).then((response) => {
      return cb(null, response.result);
    }).catch((error) => cb(error));
  }

}

module.exports = Kraken;
