# iran-stock
Nodejs package for live and historical Iran stock market status

## Install

```
npm i iran-stock
```

## API

### status
This method fetches latest status of iran stocks.
```javascript
const iranStock = require('iran-stock')

iranStock.status().then(stocks => {
  console.log(stocks.length, stocks[0])
  /* output:
  1002 {
  code: '143187001116603',
  ISIN: 'IRO6MELZ96C1',
  symbol: 'تملي612',
  company: 'تسهيلات مسكن بانك ملي-اسفند96',
  opening: '256029',
  closing: '256029',
  last: '256029',
  count: '1',
  volume: '2',
  value: '512058',
  lowest: '256029',
  highest: '256029',
  EPS: '269504'
  */
}
}, err => {
  console.log(err)
})
```

### history
This method provides historical price information for a specific stock.
```javascript
iranStock.history({
  // stock code
  code: '41302553376174581',
  // start date
  startDate: '20200621',
  // end date
  endDate: '20200623'
}).then(records => {
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