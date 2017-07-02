import https from 'https';
import querystring from 'querystring';

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
 * @param {Object} opts Request connection options
 * @param {String} opts.method HTTP verb or method
 * @param {String} opts.host Host address
 * @param {String} opts.path URL path
 * @param {String} opts.port Server port
 * @param {Object} opts.headers HTTP headers
 * @param {Object} data Object to send or params in case of GET method
 * @returns Promise
 */
const request = (opts, data = null) =>
  new Promise((resolve, reject) => {
    try {
      let _opts = JSON.parse(JSON.stringify(opts));
      if (_opts.method.toUpperCase() === 'GET' && data) {
        _opts = Object.assign({}, _opts, { path: `${_opts.path}?${querystring.stringify(data)}` });
      }
      const req = https.request(_opts, (res) => {
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
      if ((_opts.method.toUpperCase() === 'PUT' || _opts.method.toUpperCase() === 'POST') && data) {
        if (_opts.headers && (_opts.headers['Content-Type'] === 'application/json' || _opts.headers['content-type'] === 'application/json')) {
          req.write(JSON.stringify(data));
        } else {
          req.write(querystring.stringify(data));
        }
      }
      req.end();
    } catch (err) {
      reject(err);
    }
  });

export default request;
