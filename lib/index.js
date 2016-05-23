"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.build = exports.wrap = exports.styles = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _color = require("color");

var _color2 = _interopRequireDefault(_color);

var _reactWrapper = require("./reactWrapper");

var reactWrapper = _interopRequireWildcard(_reactWrapper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NativeTachyons = {
    wrap: reactWrapper.wrap,

    /* placeholder */
    styles: Object.create(null),

    build: function build() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var StyleSheet = arguments[1];

        _lodash2.default.defaultsDeep(options, {
            rem: 16,
            colors: {
                lighten: 0.2,
                darken: 0.2,
                palette: {
                    white: "#ffffff",
                    black: "#000000"
                }
            }
        });

        /* assign all the styles */
        var styleSheet = {};
        _lodash2.default.assign(styleSheet, require("./styles/borders").default);
        _lodash2.default.assign(styleSheet, require("./styles/flexbox").default);
        _lodash2.default.assign(styleSheet, require("./styles/fontWeights").default);
        _lodash2.default.assign(styleSheet, require("./styles/images").default);
        _lodash2.default.assign(styleSheet, require("./styles/text").default);

        /* calculate rem scales */
        var REM_SCALED = [require("./styles/heights").default, require("./styles/spacing").default, require("./styles/typeScale").default, require("./styles/widths").default];
        _lodash2.default.forEach(REM_SCALED, function (subSheet) {
            _lodash2.default.assign(styleSheet, _lodash2.default.mapValues(subSheet, function (style) {
                return _lodash2.default.mapValues(style, function (val) {
                    return val * options.rem;
                });
            }));
        });

        /* add colors */
        var allColors = _lodash2.default.transform(options.colors.palette, function (result, val, key) {
            result[key] = val;

            /* light and dark alternatives */
            result["light-" + key] = (0, _color2.default)(val).lighten(options.colors.lighten).hexString();
            result["dark-" + key] = (0, _color2.default)(val).darken(options.colors.darken).hexString();
        }, {});

        _lodash2.default.forEach(allColors, function (val, key) {
            styleSheet["bg-" + key] = {
                backgroundColor: val
            };
            styleSheet["" + key] = {
                color: val
            };
            styleSheet["b--" + key] = {
                borderColor: val
            };
        }, {});

        _lodash2.default.assign(NativeTachyons.styles, StyleSheet.create(styleSheet));
    }
};

exports.default = NativeTachyons;
var styles = exports.styles = NativeTachyons.styles;
var wrap = exports.wrap = reactWrapper.wrap;
var build = exports.build = NativeTachyons.build;