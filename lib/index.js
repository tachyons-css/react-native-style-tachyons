"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _reactWrapper = require("./reactWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* assign all the styles */
var styleSheet = {};
_lodash2.default.assign(styleSheet, require("./styles/borders").default);
_lodash2.default.assign(styleSheet, require("./styles/flexbox").default);
_lodash2.default.assign(styleSheet, require("./styles/fontWeights").default);
_lodash2.default.assign(styleSheet, require("./styles/heights").default);
_lodash2.default.assign(styleSheet, require("./styles/images").default);
_lodash2.default.assign(styleSheet, require("./styles/spacing").default);
_lodash2.default.assign(styleSheet, require("./styles/text").default);
_lodash2.default.assign(styleSheet, require("./styles/typeScale").default);
_lodash2.default.assign(styleSheet, require("./styles/widths").default);

/* placeholder */
var NativeTachyons = {
    styles: Object.create(null),

    build: function build(StyleSheet) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _lodash2.default.defaults(options, {
            rem: 16,
            colors: {
                white: "#ffffff",
                black: "#000000"
            }
        });

        var calculated = _lodash2.default.mapValues(styleSheet, function (style) {
            return _lodash2.default.mapValues(style, function (val) {
                if (_lodash2.default.isString(val) && val.endsWith("rem")) {
                    return val.slice(0, -3) * options.rem;
                }

                return val;
            });
        });

        _lodash2.default.assign(NativeTachyons.styles, StyleSheet.create(calculated));
    },

    wrap: _reactWrapper.wrap
};

exports.default = NativeTachyons;