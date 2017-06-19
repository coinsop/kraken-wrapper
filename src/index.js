// import request from './helpers/request';
import Kraken from './Kraken';

const kraken = new Kraken();

kraken.getAssetInfo('ETH,XRP', (error, response) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(response);
});


