"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scale = {
    "f-headline": 6,
    "f-subheadline": 5,
    f1: 3,
    f2: 2.25,
    f3: 1.5,
    f4: 1.25,
    f5: 1,
    f6: 0.875
};

exports.default = _lodash2.default.mapValues(scale, function (val) {
    return { fontSize: val };
});