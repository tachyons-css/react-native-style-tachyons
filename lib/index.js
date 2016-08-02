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

var debug = require('debug')('react-native-tachyons');

/* global require */
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
        _lodash2.default.assign(styleSheet, require("./styles/borders").styles);
        _lodash2.default.assign(styleSheet, require("./styles/flexbox").default);
        _lodash2.default.assign(styleSheet, require("./styles/fontWeights").default);
        _lodash2.default.assign(styleSheet, require("./styles/images").default);
        _lodash2.default.assign(styleSheet, require("./styles/text").default);
        _lodash2.default.assign(styleSheet, require("./styles/opacity").default);
        _lodash2.default.assign(styleSheet, require("./styles/utilities").default);

        /* calculate rem scales */
        var REM_SCALED = [require("./styles/heights").heights, require("./styles/heights").minHeights, require("./styles/heights").maxHeights, require("./styles/widths").widths, require("./styles/widths").minWidths, require("./styles/widths").maxWidths, require("./styles/spacing").default, require("./styles/typeScale").default, require("./styles/borders").radii];
        _lodash2.default.forEach(REM_SCALED, function (subSheet) {
            _lodash2.default.assign(styleSheet, _lodash2.default.mapValues(subSheet, function (style) {
                return _lodash2.default.mapValues(style, function (val) {
                    return val * options.rem;
                });
            }));
        });

        /* colors: dark and light variant */
        var allColors = _lodash2.default.transform(options.colors.palette, function (result, val, key) {
            result[key] = val;

            /* light and dark alternatives */
            if (options.colors.lighten !== false) {
                result["light-" + key] = (0, _color2.default)(val).lighten(options.colors.lighten).hexString();
            }
            if (options.colors.darken !== false) {
                result["dark-" + key] = (0, _color2.default)(val).darken(options.colors.darken).hexString();
            }
        }, {});

        /* colors: background, foreground and border */
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

        /* copy all properties with hyphens to underscore */
        _lodash2.default.forEach(styleSheet, function (val, key) {
            if (key.includes("-")) {
                debug("replacing " + key + " -> " + key.replace(/-/g, "_"));
                styleSheet[key.replace(/-/g, "_")] = val;
            }
        });

        _lodash2.default.assign(NativeTachyons.styles, StyleSheet.create(styleSheet));
    }
};

exports.default = NativeTachyons;
var styles = exports.styles = NativeTachyons.styles;
var wrap = exports.wrap = reactWrapper.wrap;
var build = exports.build = NativeTachyons.build;