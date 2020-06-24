const { get } = require("./request.js");

function status() {
  return new Promise(async function (resolve, reject) {
    try {

      let data = await get('http://tsetmc.com/tsev2/data/MarketWatchPlus.aspx')

      let dataParts = data.split('@')
      if (dataParts.length < 5) {
        reject('Wrong data format')
        return
      }

      // stock details is at index 2
      let stocks = dataParts[2].split(';')
      let stockObjects = stocks.map(stock => {
        stockProps = stock.split(',')
        // invalid record
        if (stockProps.length < 15) return {}

        return {
          code: stockProps[0],
          ISIN: stockProps[1],
          symbol: stockProps[2],
          company: stockProps[3],
          opening: stockProps[5],
          closing: stockProps[6],
          last: stockProps[7],
          count: stockProps[8],
          volume: stockProps[9],
          value: stockProps[10],
          lowest: stockProps[11],
          highest: stockProps[12],
          yesterday: stockProps[13],
          EPS: stockProps[14]
        }
      })

      resolve(stockObjects)

    } catch (e) {
      reject(e)
    }

  })
}

function history({ code, startDate, endDate }) {
  return new Promise(async function (resolve, reject) {

    try {

      let data = await get(`http://tsetmc.com/tse/data/Export-txt.aspx?a=InsTrade&InsCode=${code}&DateFrom=${startDate}&DateTo=${endDate}&b=0`)
      let records = data.split('\r\n')
      // remove header
      records.shift()
      // filter not empty lines
      records = records.filter(record => record)
        .map(record => {
          let fields = record.split(',')
          if (fields.length < 11) return {}

          return {
            date: fields[1],
            first: fields[2],
            highest: fields[3],
            lowest: fields[4],
            closing: fields[5],
            value: fields[6],
            volume: fields[7],
            opening: fields[10],
          }
        })

      resolve(records)

    } catch (e) {
      reject(e)
    }

  })
}

module.exports = {
  status,
  history
}
