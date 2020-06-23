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