"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REM_SCALE = [1, 2, 4, 8, 16];

var style = {};
_lodash2.default.forEach(REM_SCALE, function (val, idx) {
    style["w" + (idx + 1)] = {
        width: val + "rem"
    };
});

exports.default = style;