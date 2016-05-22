"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REM_SCALE = [1, 2, 4, 8, 16],
    PERCENTAGES = [10, 20, 25, 33, 34, 40, 50, 60, 75, 80, 100];

var style = {};
_lodash2.default.forEach(REM_SCALE, function (val, idx) {
    return style["w" + (idx + 1)] = val + "rem";
});
_lodash2.default.forEach(PERCENTAGES, function (val) {
    return style["w-" + val] = val + "%";
});

exports.default = _lodash2.default.mapValues(style, function (val) {
    return { width: val };
});