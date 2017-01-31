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

var _cssColorNames = require("css-color-names");

var _cssColorNames2 = _interopRequireDefault(_cssColorNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* wrap takes a Component or a JSX-statement and recursively replaces 
   the prop 'cls' with the respective 'style' definitions.
   Usually, wrapping a whole Class / Component will do the trick,
   but for some render function (specifically ListView -> renderHeader) 
   this will not work. Hence the JSX-output of such functions can also be 
   wrapped */
function wrap(componentOrElement) {
    if (_react2.default.isValidElement(componentOrElement)) {
        var element = componentOrElement;
        return recursiveStyle(element);
    }
    var WrappedComponent = componentOrElement;
    var newClass = function (_WrappedComponent) {
        _inherits(newClass, _WrappedComponent);

        function newClass() {
            _classCallCheck(this, newClass);

            return _possibleConstructorReturn(this, (newClass.__proto__ || Object.getPrototypeOf(newClass)).apply(this, arguments));
        }

        _createClass(newClass, [{
            key: "render",
            value: function render() {
                return recursiveStyle(_get(newClass.prototype.__proto__ || Object.getPrototypeOf(newClass.prototype), "render", this).call(this));
            }
        }]);

        return newClass;
    }(WrappedComponent);

    /* Fix name */
    newClass.displayName = WrappedComponent.displayName || WrappedComponent.name;

    return newClass;
}

function recursiveStyle(elementsTree) {
    var props = elementsTree.props;

    var newProps = void 0;
    var translated = false;

    /* Parse cls string */
    if (_lodash2.default.isString(props.cls)) {
        newProps = {};
        translated = true;
        if (_lodash2.default.isArray(props.style)) {
            newProps.style = props.style.slice();
        } else if (_lodash2.default.isObject(props.style)) {
            newProps.style = [props.style];
        } else {
            newProps.style = [];
        }

        var splitted = props.cls.replace(/-/g, "_").split(" ");
        for (var i = 0; i < splitted.length; i++) {
            var cls = splitted[i];
            if (cls.length > 0) {
                var style = _index.styles[cls];
                if (style) {

                    /* Style found */
                    newProps.style.push(style);
                } else if (cls.startsWith("bg_")) {
                    newProps.style.push({
                        backgroundColor: cls.slice(3)
                    });
                } else if (cls.startsWith("b__")) {
                    newProps.style.push({
                        borderColor: cls.slice(3)
                    });
                } else if (_cssColorNames2.default[cls] || /^(rgb|#|hsl)/.test(cls)) {
                    newProps.style.push({
                        color: cls
                    });
                } else {
                    throw new Error("style '" + cls + "' not found");
                }
            }
        }
    }

    var newChildren = props.children;
    if (_lodash2.default.isArray(newChildren)) {

        /* Convert child array */
        newChildren = _react2.default.Children.toArray(newChildren);
        for (var _i = 0; _i < newChildren.length; _i++) {
            var c = newChildren[_i];
            if (_react2.default.isValidElement(c)) {
                var converted = recursiveStyle(c);
                if (converted !== c) {
                    translated = true;
                    newChildren[_i] = converted;
                }
            }
        }
    } else if (_react2.default.isValidElement(newChildren)) {

        /* Convert single child */
        var _converted = recursiveStyle(newChildren);
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