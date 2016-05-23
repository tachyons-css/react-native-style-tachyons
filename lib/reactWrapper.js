"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.wrap = wrap;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Preconditions = require("./util/Preconditions");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function wrap(WrappedComponent) {
    var newClass = function (_WrappedComponent) {
        _inherits(newClass, _WrappedComponent);

        function newClass() {
            _classCallCheck(this, newClass);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(newClass).apply(this, arguments));
        }

        _createClass(newClass, [{
            key: "render",
            value: function render() {
                return this._recursiveStyle(_get(Object.getPrototypeOf(newClass.prototype), "render", this).call(this));
            }
        }, {
            key: "_recursiveStyle",
            value: function _recursiveStyle(elementsTree) {
                var _this2 = this;

                (0, _Preconditions.checkState)(_react2.default.isValidElement(elementsTree), "not a element tree: ", elementsTree);

                var props = _lodash2.default.assign({}, elementsTree.props);

                /* parse cls string */
                if (_lodash2.default.isString(props.className)) {
                    if (_lodash2.default.isObject(props.style)) {
                        props.style = [props.style];
                    } else if (!_lodash2.default.has(props, "style")) {
                        props.style = [];
                    }
                    _lodash2.default.split(props.className, " ").forEach(function (cls) {
                        if (cls !== "") {
                            (0, _Preconditions.checkState)(_lodash2.default.has(_index2.default.styles, cls), "style '" + cls + "' not found");
                            props.style.push(_index2.default.styles[cls]);
                        }
                    });
                }

                var children = _react2.default.Children.map(props.children, function (c) {
                    if (_react2.default.isValidElement(c)) {
                        return _this2._recursiveStyle(c);
                    }
                    return c;
                });

                if (_lodash2.default.isArray(children) && children.length === 1) {
                    children = children[0];
                }

                return _react2.default.cloneElement(elementsTree, props, children);
            }
        }]);

        return newClass;
    }(WrappedComponent);

    /* fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name;

    return newClass;
}