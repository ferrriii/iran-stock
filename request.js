const http = require('http')
const zlib = require('zlib')

function get(url) {
  return new Promise(function (resolve, reject) {

    http.get(url, (resp) => {
      let data = ''
      const { statusCode } = resp
      if (statusCode !== 200) {
        reject('http error ' + statusCode)
        return
      }
      // TODO: below checks encdoing and set appropriate zlib pipe
      // const encoding = resp.headers['content-encoding']
      let unzippedResponse = resp.pipe(zlib.createGunzip())

      // A chunk of data has been recieved.
      unzippedResponse.on('data', (chunk) => {
        data += chunk
      });

      // The whole response has been received.
      unzippedResponse.on('end', () => {
        resolve(data)
      });

      unzippedResponse.on('error', err => {
        reject(err)
      });

    }).on("error", (err) => {
      reject(err)
    });
  })
}

module.exports = {
  get
}
