import Azpay from '../lib/azpay';
import config from '../test.config';

describe('Transaction', () => {
  const azpay = new Azpay({
    id: config.merchant_id,
    key: config.merchant_key,
  });

  const order = {
    reference: 'blablabla',
    totalAmount: '12345',
  };

  const payment = {
    acquirer: '1',
    method: '1',
    amount: '12345',
    currency: '986',
    country: 'BRA',
    numberOfPayments: '1',
    groupNumber: '0',
    flag: 'mastercard',
    cardHolder: 'Jose da Silva',
    cardNumber: '5453010000066167',
    cardSecurityCode: '123',
    cardExpirationDate: '201805',
    saveCreditCard: 'true',
    generateToken: 'true',
    departureTax: '0',
  };

  const billing = {
    customerIdentity: '1',
    name: 'Fulano de tal',
    address: 'Av Federativa, 230',
    address2: '10 andar',
    city: 'Mogi das Cruzes',
    state: 'SP',
    postalCode: '20031170',
    country: 'BR',
    phone: '1147770000',
    email: 'fulano@de.tal',
  };

  const urlReturn = 'http://urlde.test.com/ordertal';
  const fraud = 'false';
  const data = {
    order,
    payment,
    billing,
    urlReturn,
    fraud,
  };

  it('Should make a sale transaction', async () => {
    expect.assertions(1);
    try {
      const response = await azpay.transaction.sale(data);
      expect(response).toBeTruthy();
    } catch (error) {
      console.info(error);
    }
  });
});
