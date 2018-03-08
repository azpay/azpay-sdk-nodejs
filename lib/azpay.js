import Transaction from './transaction';


class Azpay {
  constructor(credentials) {
    this.id = credentials.id;
    this.key = credentials.key;
  }

  transaction() {
    return new Transaction(this.id, this.key);
  }
}


export default Azpay;
