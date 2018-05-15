import axios from 'axios';
import { API_URL } from './';
import Sale from './models/sale';

/**
 * Operations contants
 */
const OPERATIONS = {
  SALE: 'sale',
  BOLETO: 'boleto',
  REPORT: 'report',
  CAPTURE: 'capture',
};

class Transaction {
  constructor(id, key) {
    // Setting local ID and Key
    this.id = id;
    this.key = key;

    // Available actions
    this.actions = {
      get: true,
      authorize: true,
      sale: true,
      capture: true,
      cancel: true,
      boleto: true,
    };
  }

  async request(operation, data) {
    try {
      const response = await axios(API_URL, {
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
      // Setting report object as response
      this.report = response;
      // Returning the response
      return response;
    } catch (error) {
      console.info(error.response.data);
      throw new Error(error);
    }
  }

  async get(tid) {
    if (!this.actions.get) {
      throw new Error('Operation unavailable for this transaction');
    }

    const response = await this.request(OPERATIONS.REPORT, { transactionId: tid });

    if (response.transactionId) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  async authorize(data) {
    if (!this.actions.authorize) {
      throw new Error('Operation unavailable for this transaction');
    }

    const response = await this.request('authorize', data);

    if (response.transactionId) {
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

  async sale(data) {
    // Checking if sale is available
    if (!this.actions.sale) {
      throw new Error('Operation unavailable for this transaction');
    }
    // Getting sale object
    const saleObj = Sale.generateObject(data);

    try {
      const response = await this.request(OPERATIONS.SALE, saleObj);
      // Changing available actions
      if (response.transactionId) {
        this.actions.get = false;
        this.actions.authorize = false;
        this.actions.sale = false;
        this.actions.capture = false;
        this.actions.boleto = false;
      }
      // Returning response
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async capture(tid) {
    if (!this.actions.capture) {
      throw new Error('Operation unavailable for this transaction');
    }

    const response = await this.request(OPERATIONS.CAPTURE, { transactionId: tid });

    if (response.transactionId) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  async cancel(tid) {
    if (!this.actions.cancel) {
      throw new Error('Operation unavailable for this transaction');
    }

    const response = await this.request('cancel', { transactionId: tid });

    if (response.transactionId) {
      this.actions.get = false;
      this.actions.authorize = false;
      this.actions.sale = false;
      this.actions.capture = false;
      this.actions.boleto = false;
    }

    this.report = response;

    return response;
  }

  async boleto(data) {
    if (!this.actions.boleto) {
      throw new Error('Operation unavailable for this transaction');
    }

    const response = await this.request(OPERATIONS.boleto, data);

    if (response.transactionId) {
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

