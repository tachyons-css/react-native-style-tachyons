"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opacities = {
    "o-100": 1,
    "o-90": 0.9,
    "o-80": 0.8,
    "o-70": 0.7,
    "o-60": 0.6,
    "o-50": 0.5,
    "o-40": 0.4,
    "o-30": 0.3,
    "o-20": 0.2,
    "o-10": 0.1,
    "o-05": 0.05,
    "o-025": 0.025
};

exports.default = _lodash2.default.mapValues(opacities, function (val) {
    return { opacity: val };
});