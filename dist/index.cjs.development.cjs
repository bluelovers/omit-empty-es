'use strict';

const {
  toString
} = Object.prototype;
function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  let type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }
  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';
  switch (ctorName(val)) {
    case 'Symbol':
      return 'symbol';
    case 'Promise':
      return 'promise';
    case 'WeakMap':
      return 'weakmap';
    case 'WeakSet':
      return 'weakset';
    case 'Map':
      return 'map';
    case 'Set':
      return 'set';
    case 'Int8Array':
      return 'int8array';
    case 'Uint8Array':
      return 'uint8array';
    case 'Uint8ClampedArray':
      return 'uint8clampedarray';
    case 'Int16Array':
      return 'int16array';
    case 'Uint16Array':
      return 'uint16array';
    case 'Int32Array':
      return 'int32array';
    case 'Uint32Array':
      return 'uint32array';
    case 'Float32Array':
      return 'float32array';
    case 'Float64Array':
      return 'float64array';
  }
  if (isGeneratorObj(val)) {
    return 'generator';
  }
  type = toString.call(val);
  switch (type) {
    case '[object Object]':
      return 'object';
    case '[object Map Iterator]':
      return 'mapiterator';
    case '[object Set Iterator]':
      return 'setiterator';
    case '[object String Iterator]':
      return 'stringiterator';
    case '[object Array Iterator]':
      return 'arrayiterator';
  }
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}
function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}
function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}
function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string' && typeof val.ignoreCase === 'boolean' && typeof val.multiline === 'boolean' && typeof val.global === 'boolean';
}
function isGeneratorFn(name) {
  return ctorName(name) === 'GeneratorFunction';
}
function isGeneratorObj(val) {
  return typeof val.throw === 'function' && typeof val.return === 'function' && typeof val.next === 'function';
}
function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err instanceof Error && err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}
function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

const omitEmpty = (obj, options) => {
  const omitZero = options ? options.omitZero : false;
  const omit = value => {
    if (Array.isArray(value)) {
      value = value.map(v => omit(v)).filter(v => !isEmpty(v, omitZero));
    }
    if (kindOf(value) === 'object') {
      const result = {};
      for (const key of Object.keys(value)) {
        const val = omit(value[key]);
        if (val !== void 0) {
          result[key] = val;
        }
      }
      value = result;
    }
    if (!isEmpty(value, omitZero)) {
      return value;
    }
    return void 0;
  };
  let res = omit(obj);
  if (res === void 0) {
    res = kindOf(obj) === 'object' ? {} : res;
  }
  return res;
};
function isEmpty(value, omitZero) {
  switch (kindOf(value)) {
    case 'null':
    case 'undefined':
      return true;
    case 'boolean':
    case 'function':
    case 'date':
    case 'regexp':
      return false;
    case 'string':
    case 'arguments':
      return value.length === 0;
    case 'file':
    case 'map':
    case 'set':
      return value.size === 0;
    case 'number':
      return omitZero ? value === 0 : false;
    case 'error':
      return value.message === '';
    case 'array':
      for (const ele of value) {
        if (!isEmpty(ele, omitZero)) {
          return false;
        }
      }
      return true;
    case 'object':
      for (const key of Object.keys(value)) {
        if (!isEmpty(value[key], omitZero)) {
          return false;
        }
      }
      return true;
    default:
      {
        return true;
      }
  }
}
{
  Object.defineProperty(omitEmpty, "__esModule", {
    value: true
  });
  Object.defineProperty(omitEmpty, 'omitEmpty', {
    value: omitEmpty
  });
  Object.defineProperty(omitEmpty, 'default', {
    value: omitEmpty
  });
}

// @ts-ignore
module.exports = omitEmpty;
//# sourceMappingURL=index.cjs.development.cjs.map
