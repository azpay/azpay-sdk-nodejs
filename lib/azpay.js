import 'whatwg-fetch';
import Transaction from './transaction';

class Azpay {
  constructor(credentials) {
    this.id = credentials.id;
    this.key = credentials.key;
  }

  transaction(data) {
    return new Transaction(this.id, this.key, data);
  }
}

export default Azpay;
