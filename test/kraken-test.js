import chai, { expect } from 'chai';

import Kraken from '../src/Kraken';


chai.config.includeStack = true;

const kraken = new Kraken();

describe('Kraken', () => {
  describe('getTime', () => {
    it('should show the server time', (done) => {
      kraken.getTime().then((time) => {
        expect(time).to.be.instanceof(Object);
        expect(time).to.have.property('unixtime');
        expect(time).to.have.property('rfc1123');
        done();
      }).catch(error => done(error));
    });
  });

  describe('getAssetInfo', () => {
    it('should show all the assets available on Kraken', (done) => {
      kraken.getAssetInfo('all').then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 0).to.be.false;
        done();
      }).catch(error => done(error));
    });

    it('should show only two assets on Kraken', (done) => {
      kraken.getAssetInfo('ETH,XRP').then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 2).to.be.true;
        expect(response.XETH).to.have.property('altname');
        done();
      }).catch(error=> done(error) );
    });

    it('should NOT accept assets that are no strings', (done) => {
      kraken.getAssetInfo({ curr1: 'ETH', curr2: 'XRP' }).then((response) => {
        expect(response).to.be.undefined;
        done();
      }).catch((error) => {
        expect(error).to.be.equal('Assets option must be a string, could be all for all assets or a comma separated values such as ETH,XRP');
        done();
      });
    });

  });

  describe('getTradableAssetPairs', () => {
    it('should show all the tradable assets pairs available on Kraken', (done) => {
      kraken.getTradableAssetPairs({ info: 'all', pair: 'all' }).then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 0).to.be.false;
        done();
      }).catch(error => done(error));
    });

    it('should show only two tradable assets on Kraken', (done) => {
      kraken.getTradableAssetPairs({ info: 'all', pair: 'ETHUSD,XRPUSD' }).then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 2).to.be.true;
        expect(response.XETHZUSD).to.have.property('altname');
        done();
      }).catch(error => done(error));
    });
  });

  describe('getTickerInformation', () => {
    it('should show all the assets available on Kraken', (done) => {
      kraken.getTickerInformation('ETHUSD').then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 0).to.be.false;
        done();
      }).catch(error => done(error));
    });

    it('should show only two assets on Kraken', (done) => {
      kraken.getTickerInformation('ETHUSD,LTCXBT').then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 2).to.be.true;
        expect(response.XETHZUSD).to.have.property('a');
        done();
      }).catch(error=> done(error) );
    });

    it('should NOT accept assets that are no strings', (done) => {
      kraken.getTickerInformation({ curr1: 'ETH', curr2: 'XRP' }).then((response) => {
        expect(response).to.be.undefined;
        done();
      }).catch((error) => {
        expect(error).to.be.equal('Pair option must be a string, could be all for all pair or a comma separated values such as ETHUSD,XRPUSD');
        done();
      });
    });

  });

  describe('getOHLC', () => {
    it('should show an array of pair name and OHLC data on Kraken', (done) => {
      kraken.getOHLC({ pair: 'LTCXBT' }).then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 0).to.be.false;
        done();
      }).catch(error => done(error));
    });

    it('should give and error if the interval option is not a number', (done) => {
      kraken.getOHLC({ pair: 'LTCXBT', interval: 'yesterday' }).then((response) => {
        expect(response).to.be.undefined;
        done();
      }).catch((error) => {
        expect(error).to.be.equal('Interval option must be a integer, and one of this intervals values 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600');
        done();
      });
    });

    it('should give and error if the since option is not a number', (done) => {
      kraken.getOHLC({ pair: 'LTCXBT', since: 'yesterday' }).then((response) => {
        expect(response).to.be.undefined;
        done();
      }).catch((error) => {
        expect(error).to.be.equal('Since option must be a unix time, for example 1495864800');
        done();
      });
    });
  });
});
