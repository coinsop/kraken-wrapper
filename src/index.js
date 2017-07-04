import { config } from 'dotenv';

import Kraken from './Kraken';

config();

const kraken = new Kraken(process.env.API_KEY, process.env.API_SECRET);


/*
kraken.getTime().then((response)=> {
  console.log(response);
}).catch(error => { console.log(error) });

kraken.getAssetInfo('DASH').then((response)=> {
  console.log(response);
}).catch(error => { console.log(error) });

kraken.getTradableAssetPairs({info:'all', pair:'LTCUSD'}).then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });

kraken.getTickerInformation('LTCUSD').then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });

kraken.getOrderBook({ pair: 'LTCXBT', count: 5}).then((response) => {
  console.log(response.XLTCXXBT.asks[0]);
}).catch(error => { console.log(error) });

kraken.getTrades({ pair: 'LTCXBT'}).then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });


kraken.getSpread({ pair: 'LTCXBT'}).then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });


kraken.getBalance().then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });

kraken.getOpenOrders().then((response) => {
  console.log(response);
}).catch((error) => { console.log(error); });


kraken.getClosedOrders({ trades: true, closetime: 'close' }).then((response) => {
  console.log(response);
}).catch((error) => { console.log(error); });


kraken.getQueryOrders({ txid: 'OLEFM6-F2WRH-NXH2XR,OELLBJ-VJZCJ-QUONIS',
trades: true }).then((response) => {
  console.log(response);
}).catch((error) => { console.log(error); });
*/

kraken.getTradesHistory().then((response) => {
  console.log(response);
}).catch((error) => { console.log(error); });
