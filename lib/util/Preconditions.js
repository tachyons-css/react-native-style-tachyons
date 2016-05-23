"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkState = checkState;
function checkState(condition) {
    if (!condition) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var e = new Error(args.join(" "));
        e.args = args;
        throw e;
    }
}