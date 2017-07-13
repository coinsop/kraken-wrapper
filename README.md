# Node (npm) API wrapper for Kraken Exchange

This a library that interacts with the Kraken Exchange API

## Installation

kraken-wrapper is available from npm

```
npm install kraken-wrapper
```

## Usage

### Getting Started

Include the module and create a new Kraken object.

The parameters are optional and have the following values:

* api_key: (string) Your apps API KEY. Optional only needed for private methods
* api_secret: (string) Your apps API SECRET. Optional only needed for private methods


Example with API KEY and API SECRET for private and public methods:

```javascript
const Kraken = require('kraken-wrapper');

const kraken = new Kraken('YOUR API KEY', 'YOUR API SECRET');
```
Example without API KEY and API SECRET for just public methods:

```javascript
const kraken = require('kraken-wrapper');

const kraken = new Kraken();
```

Once you have the client you can do request to the API like this:

```javascript
const kraken = require('kraken-wrapper');

const kraken = new Kraken('YOUR API KEY', 'YOUR API SECRET');

kraken.getTrades({ pair: 'ETHUSD' }).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```
All the methods always return a Promise.

If the result has no errors the result object will be:

```json
{ error: [],
  result:
   [ ... ]
}

```

## How to obtain the API KEY and API SECRET

1. Login on your Kraken account [https://www.kraken.com/en-us/login](https://www.kraken.com/en-us/login)
2. Go to Settings > API
3. Click on Generate New Key
4. Fill the fields and add the permissions
5. Click on Generate Key
6. Copy your Key and Secret.

## CAUTION

**Depending on the permission that you give to your Keys you can make transactions and withdrawals with certains methods, always keep safe your KEYS, don't you put your Keys in the code. Use enviroment variables or other secure methods.**

**WE ARE NOT RESPONSABLE FOR THE WRONG USE OF THIS APPLICATION OR FOR ANY MALFUNCTION, BREACH OR ANY OTHER PROBLEM WITH THE KRAKEN API.**

**YOU HAVE BEEN WARNED**

## Methods

All the method's params are objects.

## Public methods

* getTime() - Kraken Server's time - Returns a json object with the unix and rfc 1123 time, useful for approximating the skew time between the server and client.
* getAssetInfo(params) - Used to get an array of asset names and their info.
  * info = info to retrieve (optional):
  * info = all info (default)
  * aclass = asset class (optional): currency (default)
  * asset = comma delimited list of assets to get info on (optional.  default = all for given asset class) - ex: ETH,LTC
* getTradableAssetPairs(params) - Used to get an array pair names and their info
  * info = info to retrieve (optional): info = all info (default),  leverage = leverage info, fees = fees schedule
  * margin = margin info
  * pair = comma delimited list of asset pairs to get info on (optional.  default = all), ex: ETHUSD,LTCUSD
* getTickerInformation(params) - Used to get an array of pair names and their ticker info
  * pair = comma delimited list of asset pairs to get info on, ex: ETHUSD,LTCUSD
* getOHLC(params) - Used to get an array of pair name and OHLC (Open, High, Low, Close) data.
  * pair = asset pair to get OHLC data for
  * interval = time frame interval in minutes (optional): 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600
  * since = return committed OHLC data since given id (optional.  exclusive)
* getOrderBook(params) - Used to get an array of pair name and market depth
  * pair = asset pair to get market depth for
  * count = maximum number of asks/bids (optional)
* getTrades(params) - Used to get an array of pair name and recent trade data
  * pair = asset pair to get market depth for
  * since = return trade data since given id (optional.  exclusive)
* getSpread(params) - Used to get an array of pair name and recent spread data
  * pair = asset pair to get market depth for
  * since = return trade data since given id (optional.  exclusive)

## Private methods (API KEY and SECRET required)

* getBalance() - Used to get an array of asset names and balance amount
* getTradeBalance(params) - Used to get an array of trade balance info
  * aclass = asset class (optional):
  * currency (default)
  * asset = base asset used to determine balance (default = ZUSD)
* getOpenOrders(params) - Used to get an array of order info in open array with txid as the key
  * trades = whether or not to include trades in output (optional.  default = false)
  * userref = restrict results to given user reference id (optional)
* getClosedOrders(params) - Used to get an array of order info
  * trades = whether or not to include trades in output (optional.  default = false)
  * userref = restrict results to given user reference id (optional)
  * start = starting unix timestamp or order tx id of results (optional.  exclusive)
  * end = ending unix timestamp or order tx id of results (optional.  inclusive)
  * ofs = result offset
  * closetime = which time to use (optional), open, close, both (default)
* getQueryOrders(params) - Used to get a associative array of orders info
  * trades = whether or not to include trades in output (optional.  default = false)
  * userref = restrict results to given user reference id (optional)
  * txid = comma delimited list of transaction ids to query info about (20 maximum)
* getTradesHistory(params) - Used to get an array of trade info
  * type = type of trade (optional), options:  all = all types (default), any position = any position (open or closed), closed position = positions that have been closed closing position = any trade closing all or part of a position, no position = non-positional trades
  * trades = whether or not to include trades related to position in output (optional.  default = false)
  * start = starting unix timestamp or trade tx id of results (optional.  exclusive)
  * end = ending unix timestamp or trade tx id of results (optional.  inclusive)
  * ofs = result offset
* getQueryTrades(params) - Used to get a associative array of trades info
  * txid = comma delimited list of transaction ids to query info about (20 maximum)
  * trades = whether or not to include trades related to position in output (optional.  default = false)
* getOpenPositions(params) - Used to get a associative array of open position info
  * txid = comma delimited list of transaction ids to restrict output to
  * docalcs = whether or not to include profit/loss calculations (optional.  default = false)
* getLedgers(params) - Used to get a associative array of ledgers info
  * aclass = asset class (optional): currency (default)
  * asset = comma delimited list of assets to restrict output to (optional.  default = all)
  * type = type of ledger to retrieve (optional): all (default), deposit, withdrawal, trade, margin
  * start = starting unix timestamp or ledger id of results (optional.  exclusive)
  * end = ending unix timestamp or ledger id of results (optional.  inclusive)
  * ofs = result offset
* getTradeVolume(params) - Used to get a associative array of ledgers info
  * id = comma delimited list of ledger ids to query info about (20 maximum)
* getQueryLedgers(params) - Used to get a associative array of trade volume info
  * pair = comma delimited list of asset pairs to get fee info on (optional)
  * fee-info = whether or not to include fee info in results (optional)
* setAddOrder(params) - Used to request a new buy or sell order
  * For the parameters go to https://www.kraken.com/en-us/help/api#add-standard-order
* setCancelOrder(params) - Used to cancel a open buy or sell order
  * txid = transaction id

## Private Experimental Methods

* getDepositMethods(params) - Used to get a associative array of deposit methods
  * aclass = asset class (optional): currency (default)
  * asset = asset being deposited
* getDepositAddresses(params) - Used to get a associative array of deposit addresses or generate a new address.
  * aclass = asset class (optional): currency (default)
  * asset = asset being deposited
  * method = name of the deposit method
  * new = whether or not to generate a new address (optional.  default = false)
* getDepositStatus(params) - Used to get a array of array deposit status information
  * aclass = asset class (optional): currency (default)
  * asset = asset being deposited
  * method = name of the deposit method
* getWithdrawInfo(params) - Used to get a associative array of withdrawal info.
  * aclass = asset class (optional): currency (default)
  * asset = asset being withdrawn
  * key = withdrawal key name, as set up on your account
  * amount = amount to withdraw
* setWithdraw(params) - Make a withdrawal
  * aclass = asset class (optional): currency (default)
  * asset = asset being withdrawn
  * key = withdrawal key name, as set up on your account
  * amount = amount to withdraw, including fees
* getWithdrawStatus(params) - Get a array of array withdrawal status information.
  * aclass = asset class (optional): currency (default)
  * asset = asset being withdrawn
  * method = withdrawal method name (optional)
* setWithdrawCancel(params) - Cancel a withdrawal. Cancelation cannot be guaranteed. This will put in a cancelation request. Depending upon how far along the withdrawal process is, it may not be possible to cancel the withdrawal.
  * aclass = asset class (optional): currency (default)
  * asset = asset being withdrawn
  * refid = withdrawal reference id

If you want more info about the methods here you can find the documentation on the Kraken API documentation [here](https://www.kraken.com/en-us/help/api).

## Contribute

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Issues or feature request

Open an issue on [Github](https://github.com/coinsop/kraken-wrapper/issues)

## History

1.0.0: Added all methods public and private.

## Credits

- [Olivers De Abreu](https://github.com/oliversd)
- [Luis Fuenmayor](https://github.com/fuelusumar)

## License

This project is licensed under the [MIT License](https://github.com/coinsop/kraken-wrapper/blob/master/LICENSE)
