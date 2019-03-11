'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('@babel/polyfill');
var axios = _interopDefault(require('axios'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

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
    customField: data.customField,
    partnerID: data.partnerID
  };
}

var Sale = {
  generateObject: generateObject
};

function generateObject$1(data) {
  if (!data.order) throw new Error('Need to set order object on paypal');else if (!data.payment) throw new Error('Need to set payment object on paypal');else if (!data.billing) throw new Error('Need to set billing object on paypal');
  var paypalObject = {
    order: {
      reference: data.order.reference,
      totalAmount: data.order.totalAmount
    },
    payment: {
      amount: data.payment.amount,
      currency: data.payment.currency,
      country: data.payment.country
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
    urlReturn: data.urlReturn
  };

  if (data.payment.method) {
    paypalObject.payment = _objectSpread({
      method: data.payment.method
    }, paypalObject.payment);
  }

  return paypalObject;
}

var Paypal = {
  generateObject: generateObject$1
};

/**
 * Operations contants
 */

var OPERATIONS = {
  SALE: 'sale',
  PAYPAL: 'paypal',
  BOLETO: 'boleto',
  REPORT: 'report',
  CAPTURE: 'capture'
};

var Transaction =
/*#__PURE__*/
function () {
  function Transaction(id, key, apiUrl) {
    _classCallCheck(this, Transaction);

    // Setting local ID and Key
    this.id = id;
    this.key = key;
    this.apiUrl = apiUrl;
  }

  _createClass(Transaction, [{
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(operation, data) {
        var params, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                params = {
                  'transaction-request': _defineProperty({
                    version: '1.0.0',
                    verification: {
                      merchantId: this.id,
                      merchantKey: this.key
                    }
                  }, operation, data)
                }; // Printing params

                console.info('SENDING PARAMS', params); // Making request

                _context.next = 5;
                return axios(this.apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify(params)
                });

              case 5:
                response = _context.sent;
                return _context.abrupt("return", response.data);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.info(_context.t0.response.data);
                throw new Error(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      return function request(_x, _x2) {
        return _request.apply(this, arguments);
      };
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.request(OPERATIONS.REPORT, {
                  transactionId: tid
                });

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function get(_x3) {
        return _get.apply(this, arguments);
      };
    }()
  }, {
    key: "authorize",
    value: function () {
      var _authorize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.request('authorize', data);

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function authorize(_x4) {
        return _authorize.apply(this, arguments);
      };
    }()
  }, {
    key: "sale",
    value: function () {
      var _sale = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(data) {
        var saleObj, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Getting sale object
                saleObj = Sale.generateObject(data);
                _context4.prev = 1;
                _context4.next = 4;
                return this.request(OPERATIONS.SALE, saleObj);

              case 4:
                response = _context4.sent;
                return _context4.abrupt("return", response);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      return function sale(_x5) {
        return _sale.apply(this, arguments);
      };
    }()
  }, {
    key: "paypal",
    value: function () {
      var _paypal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(data) {
        var paypalObj, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Getting paypal object
                paypalObj = Paypal.generateObject(data);
                _context5.prev = 1;
                _context5.next = 4;
                return this.request(OPERATIONS.PAYPAL, paypalObj);

              case 4:
                response = _context5.sent;
                return _context5.abrupt("return", response);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                throw new Error(_context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      return function paypal(_x6) {
        return _paypal.apply(this, arguments);
      };
    }()
  }, {
    key: "boleto",
    value: function () {
      var _boleto = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.request(OPERATIONS.BOLETO, data);

              case 3:
                response = _context6.sent;
                return _context6.abrupt("return", response);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                throw new Error(_context6.t0);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      return function boleto(_x7) {
        return _boleto.apply(this, arguments);
      };
    }()
  }, {
    key: "capture",
    value: function () {
      var _capture = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.request(OPERATIONS.CAPTURE, {
                  transactionId: tid
                });

              case 2:
                response = _context7.sent;
                return _context7.abrupt("return", response);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function capture(_x8) {
        return _capture.apply(this, arguments);
      };
    }()
  }, {
    key: "cancel",
    value: function () {
      var _cancel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(tid) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.request('cancel', {
                  transactionId: tid
                });

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function cancel(_x9) {
        return _cancel.apply(this, arguments);
      };
    }()
  }]);

  return Transaction;
}();

function azpay(credentials) {
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'evaluation';
  var apiUrl = env === 'production' ? 'https://api.azpay.com.br/v1/receiver/' : 'http://evaluation-api.azpay.com.br/v1/receiver';
  var id = credentials.id,
      key = credentials.key; // Creating AZPAY props

  var transaction = new Transaction(id, key, apiUrl);
  return {
    transaction: transaction
  };
}

module.exports = azpay;
