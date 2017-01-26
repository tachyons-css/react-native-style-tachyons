"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.build = exports.wrap = exports.styles = exports.sizes = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _color = require("color");

var _color2 = _interopRequireDefault(_color);

var _reactWrapper = require("./reactWrapper");

var reactWrapper = _interopRequireWildcard(_reactWrapper);

var _heights = require("./styles/heights");

var _widths = require("./styles/widths");

var _borders = require("./styles/borders");

var borders = _interopRequireWildcard(_borders);

var _flexbox = require("./styles/flexbox");

var _flexbox2 = _interopRequireDefault(_flexbox);

var _spacing = require("./styles/spacing");

var _spacing2 = _interopRequireDefault(_spacing);

var _typeScale = require("./styles/typeScale");

var _typeScale2 = _interopRequireDefault(_typeScale);

var _text = require("./styles/text");

var _text2 = _interopRequireDefault(_text);

var _images = require("./styles/images");

var _images2 = _interopRequireDefault(_images);

var _fontWeights = require("./styles/fontWeights");

var _fontWeights2 = _interopRequireDefault(_fontWeights);

var _opacity = require("./styles/opacity");

var _opacity2 = _interopRequireDefault(_opacity);

var _utilities = require("./styles/utilities");

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var debug = require("debug")("react-native-tachyons");

var NativeTachyons = {
    wrap: reactWrapper.wrap,

    /* Placeholder */
    styles: {},

    /* Placeholder */
    sizes: {},

    build: function build() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var StyleSheet = arguments[1];


        _lodash2.default.defaultsDeep(options, {
            rem: 16,
            colors: {
                palette: {}
            },
            fonts: {},
            styles: {}
        });

        /* Assign all the styles */
        var styleSheet = {};
        _lodash2.default.assign(styleSheet, borders.styles);
        _lodash2.default.assign(styleSheet, _flexbox2.default);
        _lodash2.default.assign(styleSheet, _fontWeights2.default);
        _lodash2.default.assign(styleSheet, _images2.default);
        _lodash2.default.assign(styleSheet, _text2.default);
        _lodash2.default.assign(styleSheet, _opacity2.default);
        _lodash2.default.assign(styleSheet, _utilities2.default);

        /* Calculate rem scales */
        var sizes = {};
        var REM_SCALED = [_heights.heights, _heights.minHeights, _heights.maxHeights, _widths.widths, _widths.minWidths, _widths.maxWidths, _spacing2.default, _typeScale2.default, borders.radii];

        REM_SCALED.forEach(function (subSheet) {

            _lodash2.default.forOwn(subSheet, function (styleObj, tachyonsKey) {
                _lodash2.default.forOwn(styleObj, function (val, name) {
                    styleSheet[tachyonsKey] = _defineProperty({}, name, val * options.rem);
                    sizes[tachyonsKey] = val * options.rem;
                });
            });
        });
        debug("got sizes:", sizes);

        _lodash2.default.forOwn(options.colors.palette, function (val, name) {
            styleSheet["bg-" + name] = { backgroundColor: val };
            styleSheet["" + name] = { color: val };
            styleSheet["b--" + name] = { borderColor: val };

            /* Alpha variants */
            for (var i = 10; i < 100; i += 10) {
                var rgbString = new _color2.default(val).alpha(i / 100).rgb().string();
                debug("writing alpha variant: " + name + ": " + rgbString);

                styleSheet["bg-" + name + "-" + i] = { backgroundColor: rgbString };
                styleSheet[name + "-" + i] = { color: rgbString };
                styleSheet["b--" + name + "-" + i] = { borderColor: rgbString };
            }
        });

        /* Font-families */
        _lodash2.default.forOwn(options.fonts, function (val, key) {
            styleSheet["ff-" + key] = { fontFamily: val };
        });

        /* Lastly, add (and overwrite) all custom styles passed through options */
        _lodash2.default.assign(styleSheet, options.styles);

        _lodash2.default.assign(NativeTachyons.sizes, hyphensToUnderscores(sizes));
        _lodash2.default.assign(NativeTachyons.styles, StyleSheet.create(hyphensToUnderscores(styleSheet)));
    }
};

function hyphensToUnderscores(sourceObj) {
    var translated = {};

    /* Create hypened versions */
    _lodash2.default.forOwn(sourceObj, function (val, key) {
        translated[key.replace(/-/g, "_")] = val;
    });

    return translated;
}

exports.default = NativeTachyons;
var sizes = NativeTachyons.sizes,
    styles = NativeTachyons.styles,
    wrap = NativeTachyons.wrap,
    build = NativeTachyons.build;
exports.sizes = sizes;
exports.styles = styles;
exports.wrap = wrap;
exports.build = build;