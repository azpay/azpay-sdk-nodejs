import Paypal from '../lib/models/paypal';

describe('Paypal Model', () => {
  const rightOrderData = {
    order: {
      reference: '123456789',
      totalAmount: '50000',
    },
    payment: {
      amount: '10000',
      currency: '986',
      country: 'BRA',
    },
    billing: {
      customerIdentity: '1',
      name: 'Fulano de Tal',
      address: 'Av. Federativa, 230',
      address2: '10 Andar',
      city: 'Mogi das Cruzes',
      state: 'SP',
      postalCode: '20031170',
      country: 'BR',
      phone: '1147770000',
      email: 'fulanodetal@email.com',
    },
    urlReturn: 'http://loja.exemplo.com.br',
  };

  const wrongOrderData = {
    urlReturn: 'http://loja.exemplo.com.br',
    order: {
      totalAmount: '50000',
      reference: '123456789',
    },
    payment: {
      saveCreditCard: 'true',
      groupNumber: '0',
      method: '1',
      acquirer: '1',
      amount: '10000',
      currency: '986',
      country: 'BRA',
      numberOfPayments: '1',
      flag: 'mastercard',
      cardHolder: 'Jose da Silva',
      cardNumber: '5453010000066167',
      cardSecurityCode: '123',
      cardExpirationDate: '201805',
      generateToken: 'false',
      departureTax: '0',
    },
    billing: {
      state: 'SP',
      email: 'fulanodetal@email.com',
      address2: '10 Andar',
      customerIdentity: '1',
      name: 'Fulano de Tal',
      address: 'Av. Federativa, 230',
      city: 'Mogi das Cruzes',
      postalCode: '20031170',
      country: 'BR',
      phone: '1147770000',
    },
    fraud: 'false',
  };

  it('should generate a paypal object on the right order', () => {
    // The generated json string is not equal (different orders)
    expect(JSON.stringify(wrongOrderData)).not.toEqual(JSON.stringify(rightOrderData));
    // Now, the sale object changes the order and makes the strings equal
    expect(JSON.stringify(Paypal.generateObject(wrongOrderData)))
      .toEqual(JSON.stringify(rightOrderData));
  });
});
