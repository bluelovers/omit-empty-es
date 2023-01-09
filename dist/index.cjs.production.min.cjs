"use strict";

const {toString: r} = Object.prototype;

function kindOf(e) {
  if (void 0 === e) return "undefined";
  if (null === e) return "null";
  let t = typeof e;
  if ("boolean" === t) return "boolean";
  if ("string" === t) return "string";
  if ("number" === t) return "number";
  if ("symbol" === t) return "symbol";
  if ("function" === t) return function isGeneratorFn(r) {
    return "GeneratorFunction" === ctorName(r);
  }(e) ? "generatorfunction" : "function";
  if (function isArray(r) {
    return Array.isArray ? Array.isArray(r) : r instanceof Array;
  }(e)) return "array";
  if (function isBuffer(r) {
    return !(!r.constructor || "function" != typeof r.constructor.isBuffer) && r.constructor.isBuffer(r);
  }(e)) return "buffer";
  if (function isArguments(r) {
    try {
      if ("number" == typeof r.length && "function" == typeof r.callee) return !0;
    } catch (r) {
      if (r instanceof Error && -1 !== r.message.indexOf("callee")) return !0;
    }
    return !1;
  }(e)) return "arguments";
  if (function isDate(r) {
    return r instanceof Date || "function" == typeof r.toDateString && "function" == typeof r.getDate && "function" == typeof r.setDate;
  }(e)) return "date";
  if (function isError(r) {
    return r instanceof Error || "string" == typeof r.message && r.constructor && "number" == typeof r.constructor.stackTraceLimit;
  }(e)) return "error";
  if (function isRegexp(r) {
    return r instanceof RegExp || "string" == typeof r.flags && "boolean" == typeof r.ignoreCase && "boolean" == typeof r.multiline && "boolean" == typeof r.global;
  }(e)) return "regexp";
  switch (ctorName(e)) {
   case "Symbol":
    return "symbol";

   case "Promise":
    return "promise";

   case "WeakMap":
    return "weakmap";

   case "WeakSet":
    return "weakset";

   case "Map":
    return "map";

   case "Set":
    return "set";

   case "Int8Array":
    return "int8array";

   case "Uint8Array":
    return "uint8array";

   case "Uint8ClampedArray":
    return "uint8clampedarray";

   case "Int16Array":
    return "int16array";

   case "Uint16Array":
    return "uint16array";

   case "Int32Array":
    return "int32array";

   case "Uint32Array":
    return "uint32array";

   case "Float32Array":
    return "float32array";

   case "Float64Array":
    return "float64array";
  }
  if (function isGeneratorObj(r) {
    return "function" == typeof r.throw && "function" == typeof r.return && "function" == typeof r.next;
  }(e)) return "generator";
  switch (t = r.call(e), t) {
   case "[object Object]":
    return "object";

   case "[object Map Iterator]":
    return "mapiterator";

   case "[object Set Iterator]":
    return "setiterator";

   case "[object String Iterator]":
    return "stringiterator";

   case "[object Array Iterator]":
    return "arrayiterator";
  }
  return t.slice(8, -1).toLowerCase().replace(/\s/g, "");
}

function ctorName(r) {
  return r.constructor ? r.constructor.name : null;
}

const omitEmpty = (r, e) => {
  const t = !!e && e.omitZero, omit = r => {
    if (Array.isArray(r) && (r = r.map((r => omit(r))).filter((r => !isEmpty(r, t)))), 
    "object" === kindOf(r)) {
      const e = {};
      for (const t of Object.keys(r)) {
        const n = omit(r[t]);
        void 0 !== n && (e[t] = n);
      }
      r = e;
    }
    if (!isEmpty(r, t)) return r;
  };
  let n = omit(r);
  return void 0 === n && (n = "object" === kindOf(r) ? {} : n), n;
};

function isEmpty(r, e) {
  switch (kindOf(r)) {
   case "null":
   case "undefined":
   default:
    return !0;

   case "boolean":
   case "function":
   case "date":
   case "regexp":
    return !1;

   case "string":
   case "arguments":
    return 0 === r.length;

   case "file":
   case "map":
   case "set":
    return 0 === r.size;

   case "number":
    return !!e && 0 === r;

   case "error":
    return "" === r.message;

   case "array":
    for (const t of r) if (!isEmpty(t, e)) return !1;
    return !0;

   case "object":
    for (const t of Object.keys(r)) if (!isEmpty(r[t], e)) return !1;
    return !0;
  }
}

Object.defineProperty(omitEmpty, "__esModule", {
  value: !0
}), Object.defineProperty(omitEmpty, "omitEmpty", {
  value: omitEmpty
}), Object.defineProperty(omitEmpty, "default", {
  value: omitEmpty
}), module.exports = omitEmpty;
//# sourceMappingURL=index.cjs.production.min.cjs.map
