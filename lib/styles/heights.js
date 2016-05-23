"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var heights = {
    h1: 1,
    h2: 2,
    h3: 4,
    h4: 8,
    h5: 16
};

exports.default = _lodash2.default.mapValues(heights, function (val) {
    return { height: val };
});