import Azpay from '../lib/index';
import Transaction from '../lib/transaction';

describe('AZPAY Main Class', () => {
  it('Should an azpay object with id, key and transaction', () => {
    const credentials = {
      id: 'merchantid',
      key: 'merchantkey',
    };
    const azpay = Azpay(credentials);
    // Must have a transaction object
    expect(azpay.transaction).toBeInstanceOf(Transaction);
  });
});
