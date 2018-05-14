import Azpay from '../lib/azpay';
import Transaction from '../lib/transaction';

describe('AZPAY Main Class', () => {
  it('Should an azpay object with id, key and transaction', () => {
    const credentials = {
      id: 'merchantid',
      key: 'merchantkey',
    };
    const azpay = new Azpay(credentials);
    // Must have a merchant id and merchant key
    expect(azpay.id).toEqual('merchantid');
    expect(azpay.key).toEqual('merchantkey');
    // Must have a transaction object
    expect(azpay.transaction).toBeInstanceOf(Transaction);
  });
});
