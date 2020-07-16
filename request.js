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

      const encoding = resp.headers['content-encoding']
	  const length = Number(resp.headers['content-length'])
	  let responsePipe = resp
	  if (encoding === 'gzip' && length > 0) {
        responsePipe = resp.pipe(zlib.createGunzip())
	  }

      // A chunk of data has been recieved.
      responsePipe.on('data', (chunk) => {
        data += chunk
      });

      // The whole response has been received.
      responsePipe.on('end', () => {
        resolve(data)
      });

      responsePipe.on('error', err => {
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
