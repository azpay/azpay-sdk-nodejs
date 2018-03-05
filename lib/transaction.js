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
    const v = {
      'transaction-request': {
        version: '1.0.0',
        verification: {
          merchantId: this.id,
          merchantKey: this.key,
        },
        [operation]: data,
      },
    };
  }

  authorize() {
    this.request('authorize', this.transactionData);
  }
}

export default Transaction;
