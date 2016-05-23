"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widths = {
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16
};

exports.default = _lodash2.default.mapValues(widths, function (val) {
    return { width: val };
});