function generateObject(data) {
  if (!data.order) throw new Error('Need to set order object on paypal');
  else if (!data.payment) throw new Error('Need to set payment object on paypal');
  else if (!data.billing) throw new Error('Need to set billing object on paypal');

  const paypalObject = {
    order: {
      reference: data.order.reference,
      totalAmount: data.order.totalAmount,
    },
    payment: {
      amount: data.payment.amount,
      currency: data.payment.currency,
      country: data.payment.country,
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
  };

  if (data.payment.method) {
    paypalObject.payment = {
      method: data.payment.method,
      ...paypalObject.payment,
    };
  }
  return paypalObject;
}

export default {
  generateObject,
};
