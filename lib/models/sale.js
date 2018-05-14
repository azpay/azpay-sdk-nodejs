function generateObject(data) {
  if (!data.order) throw new Error('Need to set order object on sale');
  else if (!data.payment) throw new Error('Need to set payment object on sale');
  else if (!data.billing) throw new Error('Need to set billing object on sale');

  return {
    order: {
      reference: data.order.reference,
      totalAmount: data.order.totalAmount,
    },
    payment: {
      acquirer: data.payment.acquirer,
      method: data.payment.method,
      amount: data.payment.amount,
      currency: data.payment.currency,
      country: data.payment.country,
      numberOfPayments: data.payment.numberOfPayments,
      groupNumber: data.payment.groupNumber,
      flag: data.payment.flag,
      cardHolder: data.payment.cardHolder,
      cardNumber: data.payment.cardNumber,
      cardSecurityCode: data.payment.cardSecurityCode,
      cardExpirationDate: data.payment.cardExpirationDate,
      saveCreditCard: data.payment.saveCreditCard,
      generateToken: data.payment.generateToken,
      departureTax: data.payment.departureTax,
      softDescriptor: data.payment.softDescriptor,
    },
    billing: {
      customerIdentity: data.billing.customerIdentity,
      name: data.billing.name,
      address: data.billing.address,
      address2: data.billing.address2,
      city: data.billing.city,
      state: data.billing.state,
      postalCode: data.billing.postalCode,
      country: data.billing.country,
      phone: data.billing.phone,
      email: data.billing.email,
    },
    urlReturn: data.urlReturn,
    fraud: data.fraud,
    customField: data.customField,
  };
}

export default {
  generateObject,
};

