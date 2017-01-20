"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.minWidths = exports.maxWidths = exports.widths = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widths = exports.widths = _lodash2.default.mapValues({
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16,
    w6: 32
}, function (val) {
    return { width: val };
});

var maxWidths = exports.maxWidths = _lodash2.default.mapValues({
    "max-w1": 1,
    "max-w2": 2,
    "max-w3": 4,
    "max-w4": 8,
    "max-w5": 16,
    "max-w6": 32
}, function (val) {
    return { maxWidth: val };
});

var minWidths = exports.minWidths = _lodash2.default.mapValues({
    "min-w1": 1,
    "min-w2": 2,
    "min-w3": 4,
    "min-w4": 8,
    "min-w5": 16,
    "min-w6": 32
}, function (val) {
    return { minWidth: val };
});