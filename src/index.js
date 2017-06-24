// import request from './helpers/request';
import Kraken from './Kraken';

const kraken = new Kraken();

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

*/


kraken.getOHLC({ pair: 'LTCXBT'}).then((response) => {
  console.log(response);
}).catch(error => { console.log(error) });



