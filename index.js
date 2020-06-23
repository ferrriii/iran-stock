const { get } = require("./request.js");

function status() {
  return new Promise(async function (resolve, reject) {
    try {
      let data = await get('http://tsetmc.com/tsev2/data/MarketWatchPlus.aspx')
      let dataParts = data.split('@')
      let stocks = dataParts[2].split(';') // stock details
      let stockObjects = stocks.map(stock => {
        stockProps = stock.split(',')
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
          EPS: stockProps[13]
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
      records = records.filter(record => record).map(record => {
        let fields = record.split(',')
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
