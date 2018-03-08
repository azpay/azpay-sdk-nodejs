import Azpay from '../lib/azpay';


test('Create a credit card authorization', () => {
  expect.assertions(1);

  const azpay = new Azpay({
    id: '292',
    key: 'ahbknj6zhgi47872609891571427',
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

  const urlReturn = 'urlde.test.com/ordertal';

  const fraud = 'false';

  const transaction = azpay.transaction();

  const data = {
    order,
    payment,
    billing,
    urlReturn,
    fraud,
  };


  const tid = '7055A4FB-86C8-ABC5-16DC-8DCEFF0CA22F';

  return transaction.get(tid)
    .then((response) => {
      console.log(response.data);
      return expect(response.status).toBe(200);
    })
    .catch((error) => {
      console.log(error);
    });
});
