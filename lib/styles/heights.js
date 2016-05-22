"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REM_SCALE = [1, 2, 4, 8, 16],
    PERCENTAGES = [25, 50, 75, 100];

var style = {};
_lodash2.default.forEach(REM_SCALE, function (val, idx) {
    return style["h" + (idx + 1)] = val + "rem";
});
_lodash2.default.forEach(PERCENTAGES, function (val) {
    return style["h-" + val] = val + "%";
});

exports.default = _lodash2.default.mapValues(style, function (val) {
    return { height: val };
});