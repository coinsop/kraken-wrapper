import chai, { expect } from 'chai';

import Kraken from '../src/Kraken';


chai.config.includeStack = true;

const kraken = new Kraken();

describe('Kraken', () => {
  describe('getTime', () => {
    it('should show the server time', (done) => {
      kraken.getTime((error, time) => {
        expect(time).to.be.instanceof(Object);
        expect(time).to.have.property('unixtime');
        expect(time).to.have.property('rfc1123');
        done();
      })
    })
  });

  describe('getAssetInfo', () => {
    it('should show all the assets available on Kraken', (done) => {
      kraken.getAssetInfo('all', (error, response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 0).to.be.false;
        done();
      })
    });

    it('should show only two assets on Kraken', (done) => {
      kraken.getAssetInfo('ETH,XRP', (error, response) => {
        expect(response).to.be.instanceof(Object);
        expect(Object.keys(response).length === 2).to.be.true;
        expect(response.XETH).to.have.property('altname');
        done();
      })
    });

    it('should NOT accept assets that are no strings', (done) => {
      kraken.getAssetInfo({ curr1: 'ETH', curr2: 'XRP' }, (error, response) => {
        expect(response).to.be.undefined;
        expect(error).to.be.equal('Assets option must be a string, could be all for all assets or a comma separated values such as ETH,XRP');
        done();
      })
    });

  });
});
