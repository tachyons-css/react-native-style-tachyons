"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _reactNativeExtendedStylesheet = require("react-native-extended-stylesheet");

var _reactNativeExtendedStylesheet2 = _interopRequireDefault(_reactNativeExtendedStylesheet);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var styles = exports.styles = _reactNativeExtendedStylesheet2.default.create(styleSheet);