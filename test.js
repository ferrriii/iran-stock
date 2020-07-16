const iranStock = require('./index.js')

function check(expr, test) {
  if (expr) {
    console.log('\x1b[32m%s\x1b[0m', 'Passed:' , test)
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'Failed:', test)
  }
}

async function testStocks() {
  let latestStocks
  try {
    latestStocks = await iranStock.status()
  } catch(e) {
    check(false, 'getting Stocks, error:' + e.message)
  }
  check(latestStocks.length > 0, 'status() returns non zero length array')
  check(latestStocks[0].code !== undefined, 'stock has code')
  check(latestStocks[0].symbol !== undefined, 'stock has symbol')
  check(latestStocks[0].company !== undefined, 'stock has company')
  check(latestStocks[0].opening !== undefined, 'stock has opening')
  check(latestStocks[0].closing !== undefined, 'stock has closing')
  check(latestStocks[0].volume !== undefined, 'stock has volume')
  
  let undefinedStocks = latestStocks.find(stock => stock === undefined)
  check(undefinedStocks === undefined, 'no undefined stock')
  return latestStocks
}

async function testHistory(stock){
  let prices
  try {
  prices = await iranStock.history({
	  code: stock.code,
	  startDate: '2020051' + String(Number.parseInt(Math.random() * 10)),
	  endDate: '2020061' + String(Number.parseInt(Math.random() * 10))
	  })
  } catch(e) {
    check(false, 'getting price, stock - error: ' + stock.code + ' - ' + e)
	return false
  }
  check(prices !== undefined, 'history() is not undefined for stock ' + stock.code)
  check(prices.length >= 0, 'history() returns an array for stock ' + stock.code)
  if (prices.length === 0) return
  check(prices[0].date !== undefined, 'price has date for stock ' + stock.code)
  check(prices[0].highest !== undefined, 'price has highest for stock ' + stock.code)
  check(prices[0].lowest !== undefined, 'price has lowest for stock ' + stock.code)
  check(prices[0].closing !== undefined, 'price has closing for stock ' + stock.code)
  check(prices[0].opening !== undefined, 'price has opening for stock ' + stock.code)
  let undefinedPrices = prices.find(price => price === undefined)
  check(undefinedPrices === undefined, 'no undefined price for stock ' + stock.code)
  
  return true
}

async function testPrice(latestStocks) {
  for (stock of latestStocks) {
    let result = await testHistory(stock)
	if (result === false) return
  }
}

async function test() {
  const latestStocks = await testStocks()
  testPrice(latestStocks)
}

test()