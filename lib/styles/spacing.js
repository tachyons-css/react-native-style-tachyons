"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REM_SCALE = [0, 0.25, 0.5, 1, 2, 4, 8, 16, 32];

var what = _lodash2.default.toPairs({
    m: "margin",
    p: "padding"
});
var where = _lodash2.default.toPairs({
    a: "",
    h: "Horizontal",
    v: "Vertical",
    t: "Top",
    r: "Right",
    b: "Bottom",
    l: "Left"
});

var style = {};
_lodash2.default.forEach(what, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        whatShort = _ref2[0],
        whatLong = _ref2[1];

    _lodash2.default.forEach(where, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            whereShort = _ref4[0],
            whereLong = _ref4[1];

        _lodash2.default.forEach(REM_SCALE, function (scale, idx) {
            style["" + whatShort + whereShort + idx] = _defineProperty({}, "" + whatLong + whereLong, scale);
        });
    });
});

exports.default = style;