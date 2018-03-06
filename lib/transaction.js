import axios from 'axios';


const url = 'https://api.azpay.com.br/v1/receiver/';

class Transaction {
  constructor(id, key, body) {
    this.id = id;
    this.key = key;

    this.transactionData = {
      order: body.order,
      payment: body.payment,
      billing: body.billing,
      urlReturn: body.urlReturn,
      fraud: body.antiFraud.enabled,
    };

    if (body.antiFraud.enabled) {
      this.transactionData.fraudData = body.antiFraud.data;
    }
  }

  request(operation, data) {
    return axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'transaction-request': {
          version: '1.0.0',
          verification: {
            merchantId: this.id,
            merchantKey: this.key,
          },
          [operation]: data,
        },
      }),
    });
  }

  authorize() {
    return this.request('authorize', this.transactionData);
  }
}

export default Transaction;
