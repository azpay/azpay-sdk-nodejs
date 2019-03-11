import '@babel/polyfill';
import Transaction from './transaction';

// AZPAY API URL
export default function azpay(credentials, env = 'evaluation') {
  const apiUrl = env === 'production'
    ? 'https://api.azpay.com.br/v1/receiver/'
    : 'http://evaluation-api.azpay.com.br/v1/receiver';
  const { id, key } = credentials;
  // Creating AZPAY props
  const transaction = new Transaction(id, key, apiUrl);
  return {
    transaction,
  };
}
