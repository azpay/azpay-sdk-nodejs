# AZPAY SDK for Node (WARNING: IN DEVELOPMENT)

This SDK is currently in development. Coming soon :)

## Installing

```bash
$ npm install --save azpay
OR
$ yarn add azpay
```

## Creating AZPay object

```javascript
import Azpay from 'azpay';

const azpay = Azpay({
  id: 'YOUR_MERCHANT_ID',
  key: 'YOUR_MERCHANT_KEY',
});
```

## Creating a Sale transaction

Your need to have the AZPAY object (created before)

### Using Javascript ES8 ASYNC/AWAIT:

```javascript
try {
  const response = await azpay.transaction.sale({
    order: {
      ...
    },
    payment: {
      ...
    },
    billing: {
      ...
    },
    urlReturn: ...,
    fraud: ...,
  });
} catch (error) {
  // DEAL WITH ERROR HERE
}

```

### Using Promises:

```javascript
azpay.transaction.sale({
  order: {
    ...
  },
  payment: {
    ...
  },
  billing: {
    ...
  },
  urlReturn: ...,
  fraud: ...,
}).then((response) => {
    // DEAL WITH RESPONSE
  }).catch((error) => {
    // DEAL WITH ERROR HERE
  });
```

## How to run the tests (For SDK developers only)

You must have a config file on the root called test.config.js:

```javascript
export default {
  merchant_id: 'YOUR_MERCHANT_ID',
  merchant_key: 'YOUR_MERCHANT_KEY',
};
```

Run on your terminal:

```bash
yarn test
```

PS: The test.config.js file is ignored on .gitignore
