"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentsWebWinJs = require("./components/WebWin.js");

Object.defineProperty(exports, "UWPButton", {
  enumerable: true,
  get: function get() {
    return _componentsWebWinJs.UWPButton;
  }
});
Object.defineProperty(exports, "UWPAPPBarButton", {
  enumerable: true,
  get: function get() {
    return _componentsWebWinJs.UWPAPPBarButton;
  }
});
Object.defineProperty(exports, "UWPPasswordBox", {
  enumerable: true,
  get: function get() {
    return _componentsWebWinJs.UWPPasswordBox;
  }
});
Object.defineProperty(exports, "UWPRichEditBox", {
  enumerable: true,
  get: function get() {
    return _componentsWebWinJs.UWPRichEditBox;
  }
});

function isUndef(v) {
  return v === undefined || v === null;
}
function isDef(v) {
  return v !== undefined && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" ||
  // $flow-disable-line
  typeof value === "symbol" || typeof value === "boolean";
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function toString(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

exports.isUndef = isUndef;
exports.isDef = isDef;
exports.isTrue = isTrue;
exports.isFalse = isFalse;
exports.isPrimitive = isPrimitive;
exports.isObject = isObject;
exports.toRawType = toRawType;
exports.isPlainObject = isPlainObject;
exports.isRegExp = isRegExp;
exports.isValidArrayIndex = isValidArrayIndex;
exports.toString = toString;
exports.toNumber = toNumber;
exports["default"] = toNumber;