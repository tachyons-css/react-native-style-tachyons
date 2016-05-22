"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weights = {
    normal: "normal",
    b: "bold",
    fw1: "100",
    fw2: "200",
    fw3: "300",
    fw4: "400",
    fw5: "500",
    fw6: "600",
    fw7: "700",
    fw8: "800",
    fw9: "900"
};

exports.default = _lodash2.default.mapValues(weights, function (val) {
    return { fontWeight: val };
});