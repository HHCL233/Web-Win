export const isUndef = (v) => v === undefined || v === null;
export const isDef = (v) => v !== undefined && v !== null;
export const isTrue = (v) => v === true;
export const isFalse = (v) => v === false;
export const isPrimitive = (value) => 
  typeof value === "string" || 
  typeof value === "number" ||
  typeof value === "symbol" || 
  typeof value === "boolean";

export const isObject = (obj) => obj !== null && typeof obj === "object";
const _toString = Object.prototype.toString;

export const toRawType = (value) => _toString.call(value).slice(8, -1);
export const isPlainObject = (obj) => _toString.call(obj) === "[object Object]";
export const isRegExp = (v) => _toString.call(v) === "[object RegExp]";
export const isValidArrayIndex = (val) => {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
};

export const toString = (val) => 
  val == null 
    ? "" 
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) 
      ? JSON.stringify(val, null, 2) 
      : String(val);

export const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

export default toNumber;