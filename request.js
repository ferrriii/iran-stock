const https = require('https')
const http = require('http')
const zlib = require('zlib')

function get(url) {
  return new Promise(function (resolve, reject) {

    http.get(url, (resp) => {
      let data = ''
      // TODO: below checks
      // const { statusCode } = resp
      // const encoding = resp.headers['Content-Encoding']
      let unzippedResponse = resp.pipe(zlib.createGunzip())

      // A chunk of data has been recieved.
      unzippedResponse.on('data', (chunk) => {
        data += chunk
      });

      // The whole response has been received.
      unzippedResponse.on('end', () => {
        resolve(data)
      });

    }).on("error", (err) => {
      reject(err)
    });
  })
}

module.exports = {
  get
}
