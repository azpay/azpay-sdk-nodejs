import Azpay from '../lib/index';
import config from '../test.config';

describe('Transaction', () => {
  const azpay = Azpay({
    id: config.merchant_id,
    key: config.merchant_key,
  });

  const order = {
    reference: 'blablabla',
    totalAmount: '12345',
  };

  const paymentSale = {
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
    cardExpirationDate: '202007',
    saveCreditCard: 'true',
    generateToken: 'true',
    departureTax: '0',
  };

  const paymentPaypal = {
    amount: '12345',
    currency: '986',
    country: 'BRA',
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

  const dataSale = {
    order,
    payment: paymentSale,
    billing,
    urlReturn,
    fraud,
  };

  const dataPaypal = {
    order,
    payment: paymentPaypal,
    billing,
    urlReturn,
  };

  it('Should make a sale transaction', async () => {
    expect.assertions(2);
    try {
      const response = await azpay.transaction.sale(dataSale);
      expect(response).toBeTruthy();
      expect(response.transactionId).toBeTruthy();
    } catch (error) {
      console.info(error);
    }
  });

  it('Should make a paypal transaction', async () => {
    expect.assertions(5);
    try {
      const response = await azpay.transaction.paypal(dataPaypal);
      expect(response).toBeTruthy();
      expect(response.transactionId).toBeTruthy();
      expect(response.processor).toBeTruthy();
      expect(response.processor.urlReturn).toBeTruthy();
      expect(response.processor.details.id).toBeTruthy();
    } catch (error) {
      console.info(error);
    }
  });

  it('Should make a paypal plus transaction', async () => {
    expect.assertions(5);
    try {
      const dataPaypalPlus = dataPaypal;
      dataPaypalPlus.payment = {
        method: 'plus',
        ...dataPaypalPlus.payment,
      };
      const response = await azpay.transaction.paypal(dataPaypalPlus);
      expect(response).toBeTruthy();
      expect(response.transactionId).toBeTruthy();
      expect(response.processor).toBeTruthy();
      expect(response.processor.urlReturn).toBeTruthy();
      expect(response.processor.details.id).toBeTruthy();
    } catch (error) {
      console.info(error);
    }
  });
});
