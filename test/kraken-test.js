import chai, { expect } from 'chai';

import Kraken from '../src/Kraken';


chai.config.includeStack = true;

const kraken = new Kraken();

const testTime = { unixtime: 1497819368,  rfc1123: 'Sun, 18 Jun 17 20:56:08 +0000' };

describe('Kraken', () => {
  describe('getTime', () => {
    it('should show the server time', (done) => {
      kraken.getTime((error, time) => {
        console.log(Object.keys(time));
        expect(time).to.be.instanceof(Object);
        expect(time).to.have.keys(Object.keys(testTime));
        done();
      })
    })
  })
});
