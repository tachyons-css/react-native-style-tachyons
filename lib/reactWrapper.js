"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.wrap = wrap;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
                var props = elementsTree.props;
                var newProps = void 0;
                var translated = false;

                /* parse cls string */
                if (_lodash2.default.isString(props.cls)) {
                    newProps = {};
                    if (_lodash2.default.isArray(props.style)) {
                        newProps.style = props.style.slice();
                    } else if (_lodash2.default.isObject(props.style)) {
                        newProps.style = [props.style];
                    } else {
                        newProps.style = [];
                    }

                    var splitted = props.cls.split(" ");
                    for (var i = 0; i < splitted.length; i++) {
                        var cls = splitted[i];
                        if (cls.length > 0) {
                            var style = _index2.default.styles[cls];
                            if (_lodash2.default.isUndefined(style)) {
                                throw new Error("style '" + cls + "' not found");
                            }
                            newProps.style.push(style);
                            translated = true;
                        }
                    }
                }

                var newChildren = props.children;
                if (_lodash2.default.isArray(newChildren)) {

                    /* convert child array */
                    newChildren = _react2.default.Children.toArray(newChildren);
                    for (var _i = 0; _i < newChildren.length; _i++) {
                        var c = newChildren[_i];
                        if (_react2.default.isValidElement(c)) {
                            var converted = this._recursiveStyle(c);
                            if (converted !== c) {
                                translated = true;
                                newChildren[_i] = converted;
                            }
                        }
                    }
                } else if (_react2.default.isValidElement(newChildren)) {

                    /* convert single child */
                    var _converted = this._recursiveStyle(newChildren);
                    if (_converted !== newChildren) {
                        translated = true;
                        newChildren = _converted;
                    }
                }

                if (translated) {
                    return _react2.default.cloneElement(elementsTree, newProps, newChildren);
                }

                return elementsTree;
            }
        }]);

        return newClass;
    }(WrappedComponent);

    /* fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name;

    return newClass;
}