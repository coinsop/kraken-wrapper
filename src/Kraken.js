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
  constructor(apiKey = {}, apiBase = 'api.kraken.com', apiProtocol = 'https', apiVersion = 0) {
    this.__apiKey = apiKey;
    this.__apiBase = apiBase;
    this.__apiProtocol = apiProtocol;
    this.__apiVersion = apiVersion;
  }

  doRequest(type, endPoint, params = null) {
    return new Promise((resolve, reject) =>  {
      let path = `/${this.__apiVersion}/`;

      if (type === 'private') {
        path = `${path}/private/`;
      } else {
        path = `${path}/public/`;
      }

      const options = {
        hostname: this.__apiBase,
        port: 443,
        path: `${path}${endPoint}`,
        method: 'GET',
      }

      request(options, params).then((response) => {
        resolve(response.result);
      }).catch((error) => reject(error));

    });
  }

  /**
   * Returns a json object with the unix and rfc 1123 time
   * of the Kraken servers
   * This is to aid in approximating the skew time between the server and client.
   * @return {Object}  - JSON Object { unixtime: 1497805936,
   *                                                         rfc1123: 'Sun, 18 Jun 17 17:12:16 +0000' }
   */
  getTime() {
    return new Promise((resolve, reject) => {
      this.doRequest('public', 'Time').then((response) => {
        resolve(response);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Returns a json object with a list of the assets available on kraken
   *
   * @param {string} [assets] - comma delimited list of assets to get
   *                                              info on for given asset class (optional).
   *                                              default = null
   * @return {Object}  - JSON Object - { XETH: { aclass: 'currency', altname: 'ETH', decimals: 10,  display_decimals: 5 } }
   *
   */
  getAssetInfo(assets=null) {
    return new Promise((resolve, reject) => {
      let params = {};
      if (assets && assets !== 'all' ) {
        if (typeof assets !== 'string') {
          reject('Assets option must be a string, could be all for all assets or a comma separated values such as ETH,XRP');
        }
        // Remove any whitespace
        assets = assets.replace(/\s/g,'')
        params = {asset: assets};
      }

      this.doRequest('public', 'Assets', params).then((response) => {
        resolve(response);
      }).catch((error) => reject(error));

    });
  }

  /**
   * Get tradable asset pairs
   * Returns an array of pair names and their info
   *
   * @param {object} [inputs] - { info: 'all' // (default = all)  leverage, fees, margin (required)
   *                                                   pair: 'all' // (default = all), comma delimited list of asset pairs to get info on
   *                                                 }
   * @return {Object}  - JSON Object - "DASHUSD": {"altname": "DASHUSD","aclass_base": "currency","base": "DASH",
   *                                                                               "aclass_quote": "currency","quote": "ZUSD","lot": "unit","pair_decimals": 5,
   *                                                                               "lot_decimals": 8,"lot_multiplier": 1,"leverage_buy": [],"leverage_sell": [],"fees": [...],
   *                                                                               "fees_maker": [..],"fee_volume_currency": "ZUSD","margin_call": 80,"margin_stop": 40}
   *
   */
  getTradableAssetPairs(inputs={}) {
    return new Promise((resolve, reject) => {
      let infoEnum = ['all', 'leverage', 'fees', 'margin'];
      let params = {};

      if (inputs) {
        // Check if inputs.info is valid
        if (inputs.info && typeof inputs.info === 'string' && infoEnum.indexOf(inputs.info) >= 0) {
          if (inputs.info !== 'all') { // although all is in the documentation of the Kraken API this value produces an error if used
            params.info = inputs.info;
          }
        } else {
          reject('Option info must be a string, could be all, leverage, fees or margin');
        }

        // Check if inputs.pair is valid
        if (inputs.pair && typeof inputs.pair === 'string') {
          const pair = inputs.pair.replace(/\s/g,''); // Remove any whitespace
          if (inputs.pair !== 'all') { // although all is in the documentation of the Kraken API this value produces an error if used
            params.pair = inputs.pair;
          }
        } else {
          reject('pair option must be a string, could be all for all assets or a comma separated values such as ETHUSD,XRPUSD');
        }
      } else {
        reject("getTradableAssetPairs require an input {info:'all', pair:'all'} as first argument");
      }

      this.doRequest('public', 'AssetPairs', params).then((response) => {
        resolve(response);
      }).catch((error) => reject(error));

    });
  }


   /**
   * Get ticker information
   * Returns an array of pair names and their ticker info
   *
   * @param {string} [pair] - comma delimited list of asset pairs to get info on
   * @return {Object}  - JSON Object - "XETHZUSD": {"a": ["349.28068","1","1.000"], "b": ["346.75998","4","4.000"],
   * "c": ["348.14094","0.01400000"],"v": ["487.87279670","72199.49047653"],"p": ["348.24177","348.24025"],"t": [421,21937],
   * "l": ["345.00000","306.99981"],"h": ["351.49000","365.98700"],"o": "348.49998"}
   *
   */
  getTickerInformation(pair=null) {
    return new Promise((resolve, reject) => {
      let params = {};

      if (pair && pair !== 'all' ) {
        if (typeof pair !== 'string') {
          reject('Pair option must be a string, could be all for all pair or a comma separated values such as ETHUSD,XRPUSD');
        }
        // Remove any whitespace
        pair = pair.replace(/\s/g,'')
        params.pair = pair;
      }

      this.doRequest('public', 'Ticker', params).then((response) => {
        resolve(response);
      }).catch((error) => reject(error));

    });
  }

  /**
   * Get OCHL data
   * Returns an array of pair names and their ticker info
   *
   * @param {object} [inputs] - { pair: '' // required, asset pair to get OHLC data for
   *                                                   interval: 1 // (default = 1), time frame interval in minutes, could be 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600
   *                                                   since: return committed OHLC data since given id
   *                                                 }
   * @return {Object}  - JSON Object - "XETHZUSD": {"a": ["349.28068","1","1.000"], "b": ["346.75998","4","4.000"],
   * "c": ["348.14094","0.01400000"],"v": ["487.87279670","72199.49047653"],"p": ["348.24177","348.24025"],"t": [421,21937],
   * "l": ["345.00000","306.99981"],"h": ["351.49000","365.98700"],"o": "348.49998"}
   *
   */
  getOHLC(params = { pair: null, interval: 1, since: null}) {
    return new Promise((resolve, reject) => {
      let path = '/0/public/OHLC';
      let intervalEnum = [1, 5, 15, 30, 60, 240, 1440, 10080, 21600]

      if (!params || !params.pair) {
        reject("You must at least indicate the trading pair getOCHL({pair: 'tradingpair'})");
      }

      if (params.pair ) {
        if (typeof params.pair !== 'string') {
          reject('Pair option must be a string, could be all for all pair or a comma separated values such as ETHUSD,XRPUSD');
        }
        // Remove any whitespace
        params.pair = params.pair.replace(/\s/g,'')
        params.pair = params.pair;
      }

      if (params.interval) {
        if (typeof params.interval !== 'number' || intervalEnum.indexOf(params.interval) < 0) {
          reject('Interval option must be a integer, and one of this intervals values 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600');
        }
      }

      if (params.since) {
        if (typeof params.since !== 'number') {
          reject('Since option must be a unix time, for example 1495864800');
        }
      }

      this.doRequest('public', 'OHLC', params).then((response) => {
        resolve(response);
      }).catch((error) => reject(error));
    });
  }

}

module.exports = Kraken;
