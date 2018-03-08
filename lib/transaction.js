import axios from 'axios';


const operationErrorMessage = 'Operation unavailable for this transaction';
const api = 'https://api.azpay.com.br/v1/receiver/';


class Transaction {
  constructor(id, key) {
    this.id = id;
    this.key = key;

    // available actions
    this.actions = {
      get: true,
      authorize: true,
      sale: true,
      capture: true,
      cancel: true,
      boleto: true,
    };
  }

  request(operation, data) {
    const response = axios(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
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

    this.report = response;

    return response;
  }

  get(tid) {
    if (!this.actions.get) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('report', {
      transactionId: tid,
    });

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  authorize(data) {
    if (!this.actions.authorize) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('authorize', data);

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.boleto = false;

      if (response.status === 4) this.actions.capture = false;
      else if (response.status === 3) this.actions.capture = true;
    }

    this.report = response;

    return response;
  }

  sale(data) {
    if (!this.actions.sale) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('sale', data);

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  capture(tid) {
    if (!this.actions.capture) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('capture', {
      transactionId: tid,
    });

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  cancel(tid) {
    if (!this.actions.cancel) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('cancel', {
      transactionId: tid,
    });

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  boleto(data) {
    if (!this.actions.boleto) {
      throw new Error(operationErrorMessage);
    }

    const response = this.request('boleto', data);

    if (Object.prototype.hasOwnProperty.call(response, 'transactionId')) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }
}


export default Transaction;
