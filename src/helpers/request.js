import https from 'https';

/**
 * Checks if str is a valid JSON string
 *
 * @param {String} str Input string that should be a valid JSON
 * @returns Boolean
 */
const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Makes an https request
 *
 * @param {Object} options Request connection options
 * @param {String} options.method HTTP verb or method
 * @param {String} options.hostname Host address
 * @param {String} options.path URL path
 * @param {String} options.port Server port
 * @param {Object} options.headers HTTP headers
 * @param {Object} data Object to send
 * @returns Promise
 */
const request = (options, data) =>
  new Promise((resolve, reject) => {
    try {
      const req = https.request(options, (res) => {
        let str = '';
        res.on('data', (chunk) => {
          str += chunk;
        });
        res.on('end', () => {
          resolve(isJson(str) ? JSON.parse(str) : str);
        });
        res.on('error', (e) => {
          reject(e);
        });
      });
      if ((options.method.toUpperCase() === 'PUT' || options.method.toUpperCase() === 'POST') && data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    } catch (err) {
      reject(err);
    }
  });

export default request;
