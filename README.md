# iran-stock
<img alt="downloads" src="https://img.shields.io/npm/dt/iran-stock?style=flat-square"> <img alt="version" src="https://img.shields.io/npm/v/iran-stock?style=flat-square"> <img alt="issues" src="https://img.shields.io/github/issues/ferrriii/iran-stock?style=flat-square"> <img alt="package size" src="https://img.shields.io/bundlephobia/minzip/iran-stock?style=flat-square"> <img alt="forks" src="https://img.shields.io/github/forks/ferrriii/iran-stock?style=flat-square"> <img alt="stars" src="https://img.shields.io/github/stars/ferrriii/iran-stock?style=flat-square"> <img alt="license" src="https://img.shields.io/github/license/ferrriii/iran-stock?style=flat-square"> <img alt="programming language" src="https://img.shields.io/github/languages/top/ferrriii/iran-stock?style=flat-square"> <img alt="test status" src="https://img.shields.io/github/workflow/status/ferrriii/iran-stock/test?label=test?style=flat-square">

Nodejs package for live and historical Iran stock market status

## Install

```
npm i iran-stock
```

## API

### status()
This method fetches latest status of iran stocks.
```javascript
const iranStock = require('iran-stock')

// get all stocks, then print count and information of the first stock
iranStock.status()
.then(stocks => {

  console.log(stocks.length, stocks[0])

  /* output:
  1002 {
  code: '143187001116603', // stock code
  ISIN: 'IRO6MELZ96C1',
  symbol: 'تملي612',
  company: 'تسهيلات مسكن بانك ملي-اسفند96',
  opening: '256029', // price
  closing: '256029', // price
  last: '256029', // price
  count: '1', // of trades
  volume: '2', // of trades
  value: '512058', // of trades
  lowest: '256029', // price
  highest: '256029', // price
  yesterday: '269504', // price
  EPS: ''
  }
  */

}, err => {
  console.log(err)
})
```

### history()
This method provides historical daily price information for a specific stock.
```javascript
const iranStock = require('iran-stock')

iranStock.history({
  // stock code
  code: '41302553376174581',
  // start date in yyyymmdd format
  startDate: '20200621',
  // end date in yyyymmdd format
  endDate: '20200623'
})
.then(records => {

  console.log(records)
  /* output:
  [
    {
      date: '20200620',
      first: '44930.00',
      highest: '45100.00',
      lowest: '43980.00',
      closing: '44940.00',
      value: '293808929810',
      volume: '6538132',
      opening: '42960.00'
    },
    {
      date: '20200621',
      first: '45000.00',
      highest: '47180.00',
      lowest: '43400.00',
      closing: '45140.00',
      value: '391701775190',
      volume: '8677526',
      opening: '44940.00'
    },
    {
      date: '20200622',
      first: '47390.00',
      highest: '47390.00',
      lowest: '47390.00',
      closing: '46930.00',
      value: '43849824830',
      volume: '925297',
      opening: '45140.00'
    }
  ]
  */

}, err => {
  console.log(err)
})
```

### Example
Below example fetches price list of a specific stock in June 2020.
```javascript
const iranStock = require('iran-stock')

async function load() {
  try {

    // get stock list
    const stocks = await iranStock.status()
    console.log('stock data received')

    // find the 'فجر' stock
    const myStock = stocks.filter(stock => stock.symbol == 'فجر')[0]
    if (!myStock) {
      console.log('stock not found')
      return;
    }
    console.log('stock found')

    // get price history for the stock
    const prices = await iranStock.history({
      // stock code
      code: myStock.code,
      // start date in yyyymmdd format
      startDate: '20200601',
      // end date in yyyymmdd format
      endDate: '20200630'
    })
    console.log(prices)

  } catch (err) {
    console.log('error', err)
  }
}

load()
```
