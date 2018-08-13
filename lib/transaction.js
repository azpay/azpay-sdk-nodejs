import axios from 'axios';
import Sale from './models/sale';
import Paypal from './models/paypal';

/**
 * Operations contants
 */
const OPERATIONS = {
  SALE: 'sale',
  PAYPAL: 'paypal',
  BOLETO: 'boleto',
  REPORT: 'report',
  CAPTURE: 'capture',
};

class Transaction {
  constructor(id, key, apiUrl) {
    // Setting local ID and Key
    this.id = id;
    this.key = key;
    this.apiUrl = apiUrl;
  }

  async request(operation, data) {
    try {
      const response = await axios(this.apiUrl, {
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
      // Returning the response
      return response.data;
    } catch (error) {
      console.info(error.response.data);
      throw new Error(error);
    }
  }

  async get(tid) {
    const response = await this.request(OPERATIONS.REPORT, { transactionId: tid });
    return response;
  }

  async authorize(data) {
    const response = await this.request('authorize', data);
    return response;
  }

  async sale(data) {
    // Getting sale object
    const saleObj = Sale.generateObject(data);
    try {
      const response = await this.request(OPERATIONS.SALE, saleObj);
      // Returning response
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async paypal(data) {
    // Getting paypal object
    const paypalObj = Paypal.generateObject(data);
    try {
      const response = await this.request(OPERATIONS.PAYPAL, paypalObj);
      // Returning response
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async boleto(data) {
    try {
      const response = await this.request(OPERATIONS.BOLETO, data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async capture(tid) {
    const response = await this.request(OPERATIONS.CAPTURE, { transactionId: tid });
    return response;
  }

  async cancel(tid) {
    const response = await this.request('cancel', { transactionId: tid });
    return response;
  }
}

export default Transaction;
