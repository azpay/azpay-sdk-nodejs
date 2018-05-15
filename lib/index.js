import Transaction from './transaction';

// AZPAY API URL
export const API_URL = process.env.NODE_ENV === 'test' ?
  'http://evaluation-api.azpay.com.br/v1/receiver'
  :
  'https://api.azpay.com.br/v1/receiver/';

class Azpay {
  constructor(credentials) {
    this.id = credentials.id;
    this.key = credentials.key;
    // Creating AZPAY props
    this.transaction = new Transaction(this.id, this.key);
  }
}

module.exports = Azpay;

