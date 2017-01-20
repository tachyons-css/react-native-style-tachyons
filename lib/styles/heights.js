"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.minHeights = exports.maxHeights = exports.heights = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var heights = exports.heights = _lodash2.default.mapValues({
    h1: 1,
    h2: 2,
    h3: 4,
    h4: 8,
    h5: 16,
    h6: 32
}, function (val) {
    return { height: val };
});

var maxHeights = exports.maxHeights = _lodash2.default.mapValues({
    "max-h1": 1,
    "max-h2": 2,
    "max-h3": 4,
    "max-h4": 8,
    "max-h5": 16,
    "max-h6": 32
}, function (val) {
    return { maxHeight: val };
});

var minHeights = exports.minHeights = _lodash2.default.mapValues({
    "min-h1": 1,
    "min-h2": 2,
    "min-h3": 4,
    "min-h4": 8,
    "min-h5": 16,
    "max-h6": 32
}, function (val) {
    return { minHeight: val };
});