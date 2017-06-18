import http from 'http';

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
 * Makes an http request
 *
 * @param {Object} opts Request connection options
 * @param {String} opts.method HTTP verb or method
 * @param {String} opts.host Host address
 * @param {String} opts.path URL path
 * @param {String} opts.port Server port
 * @param {Object} opts.headers HTTP headers
 * @param {Object} data Object to send
 * @returns Promise
 */
const request = (opts, data) =>
  new Promise((resolve, reject) => {
    try {
      const req = http.request(opts, (res) => {
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
      if ((opts.method.toUpperCase() === 'PUT' || opts.method.toUpperCase() === 'POST') && data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    } catch (err) {
      reject(err);
    }
  });

export default request;
