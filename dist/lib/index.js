'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

function generateObject(data) {
  if (!data.order) throw new Error('Need to set order object on sale');else if (!data.payment) throw new Error('Need to set payment object on sale');else if (!data.billing) throw new Error('Need to set billing object on sale');

  return {
    order: {
      reference: data.order.reference,
      totalAmount: data.order.totalAmount
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
      softDescriptor: data.payment.softDescriptor
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
      email: data.billing.email
    },
    urlReturn: data.urlReturn,
    fraud: data.fraud,
    customField: data.customField
  };
}

var Sale = {
  generateObject: generateObject
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/**
 * Operations contants
 */
var OPERATIONS = {
  SALE: 'sale',
  BOLETO: 'boleto',
  REPORT: 'report',
  CAPTURE: 'capture'
};

var Transaction = function () {
  function Transaction(id, key, apiUrl) {
    classCallCheck(this, Transaction);

    // Setting local ID and Key
    this.id = id;
    this.key = key;
    this.apiUrl = apiUrl;

    // Available actions
    this.actions = {
      get: true,
      authorize: true,
      sale: true,
      capture: true,
      cancel: true,
      boleto: true
    };
  }

  createClass(Transaction, [{
    key: 'request',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(operation, data) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios(this.apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    'transaction-request': defineProperty({
                      version: '1.0.0',
                      verification: {
                        merchantId: this.id,
                        merchantKey: this.key
                      }
                    }, operation, data)
                  })
                });

              case 3:
                response = _context.sent;

                // Setting report object as response
                this.report = response;
                // Returning the response
                return _context.abrupt('return', response);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.info(_context.t0.response.data);
                throw new Error(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function request(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.actions.get) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                _context2.next = 4;
                return this.request(OPERATIONS.REPORT, { transactionId: tid });

              case 4:
                response = _context2.sent;


                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.boleto = false;
                }

                this.report = response;

                return _context2.abrupt('return', response);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get$$1(_x3) {
        return _ref2.apply(this, arguments);
      }

      return get$$1;
    }()
  }, {
    key: 'authorize',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.actions.authorize) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                _context3.next = 4;
                return this.request('authorize', data);

              case 4:
                response = _context3.sent;


                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.boleto = false;

                  if (response.status === 4) this.actions.capture = false;else if (response.status === 3) this.actions.capture = true;
                }

                this.report = response;

                return _context3.abrupt('return', response);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function authorize(_x4) {
        return _ref3.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: 'sale',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
        var saleObj, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.actions.sale) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                // Getting sale object
                saleObj = Sale.generateObject(data);
                _context4.prev = 3;
                _context4.next = 6;
                return this.request(OPERATIONS.SALE, saleObj);

              case 6:
                response = _context4.sent;

                // Changing available actions
                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.capture = false;
                  this.actions.boleto = false;
                }
                // Returning response
                return _context4.abrupt('return', response);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](3);
                throw new Error(_context4.t0);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 11]]);
      }));

      function sale(_x5) {
        return _ref4.apply(this, arguments);
      }

      return sale;
    }()
  }, {
    key: 'capture',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.actions.capture) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                _context5.next = 4;
                return this.request(OPERATIONS.CAPTURE, { transactionId: tid });

              case 4:
                response = _context5.sent;


                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.capture = false;
                  this.actions.boleto = false;
                }

                this.report = response;

                return _context5.abrupt('return', response);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function capture(_x6) {
        return _ref5.apply(this, arguments);
      }

      return capture;
    }()
  }, {
    key: 'cancel',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.actions.cancel) {
                  _context6.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                _context6.next = 4;
                return this.request('cancel', { transactionId: tid });

              case 4:
                response = _context6.sent;


                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.capture = false;
                  this.actions.boleto = false;
                }

                this.report = response;

                return _context6.abrupt('return', response);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function cancel(_x7) {
        return _ref6.apply(this, arguments);
      }

      return cancel;
    }()
  }, {
    key: 'boleto',
    value: function () {
      var _ref7 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.actions.boleto) {
                  _context7.next = 2;
                  break;
                }

                throw new Error('Operation unavailable for this transaction');

              case 2:
                _context7.prev = 2;
                _context7.next = 5;
                return this.request(OPERATIONS.BOLETO, data);

              case 5:
                response = _context7.sent;


                if (response.transactionId) {
                  this.actions.get = false;
                  this.actions.authorize = false;
                  this.actions.sale = false;
                  this.actions.capture = false;
                  this.actions.boleto = false;
                }

                this.report = response;

                return _context7.abrupt('return', response);

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7['catch'](2);
                throw new Error(_context7.t0);

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 11]]);
      }));

      function boleto(_x8) {
        return _ref7.apply(this, arguments);
      }

      return boleto;
    }()
  }]);
  return Transaction;
}();

// AZPAY API URL
function azpay(credentials) {
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'evaluation';

  var apiUrl = env === 'production' ? 'https://api.azpay.com.br/v1/receiver/' : 'http://evaluation-api.azpay.com.br/v1/receiver';
  var id = credentials.id,
      key = credentials.key;
  // Creating AZPAY props

  var transaction = new Transaction(id, key, apiUrl);
  return {
    transaction: transaction
  };
}

module.exports = azpay;
