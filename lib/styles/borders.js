"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.styles = exports.radii = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var radii = exports.radii = _lodash2.default.mapValues({
    br0: 0,
    br1: 0.125,
    br2: 0.25,
    br3: 0.5,
    br4: 1,
    br5: 2
}, function (val) {
    return { borderRadius: val };
});

var styles = exports.styles = {
    ba: {
        borderWidth: 1
    },
    bt: {
        borderTopWidth: 1
    },
    br: {
        borderRightWidth: 1
    },
    bb: {
        borderBottomWidth: 1
    },
    bl: {
        borderLeftWidth: 1
    },
    "br--bottom": {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    "br--top": {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    "br--left": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    "br--right": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
};