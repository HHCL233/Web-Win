export { UWPButton } from "./components/WebWin.js";
export { UWPAPPBarButton } from "./components/WebWin.js";
export { UWPPasswordBox } from "./components/WebWin.js";
export { UWPRichEditBox } from "./components/WebWin.js";

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
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
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
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export {
  isUndef,
  isDef,
  isTrue,
  isFalse,
  isPrimitive,
  isObject,
  toRawType,
  isPlainObject,
  isRegExp,
  isValidArrayIndex,
  toString,
  toNumber,
};
export default toNumber;
