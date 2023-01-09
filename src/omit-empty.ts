import typeOf from './kind-of';

type Options = {
  omitZero: boolean;
};

const omitEmpty = <Output, Input = unknown>(
  obj: Input,
  options?: Options
): Output => {
  const omitZero = options ? options.omitZero : false;

  /* eslint-disable no-param-reassign */
  const omit = (value: Input) => {
    if (Array.isArray(value)) {
      // @ts-ignore
      value = value.map((v) => omit(v)).filter((v) => !isEmpty(v, omitZero));
    }

    if (typeOf(value) === 'object') {
      const result = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
        // @ts-ignore
        const val = omit(value[key]);
        if (val !== void 0) {
          // @ts-ignore
          result[key] = val;
        }
      }
      // @ts-ignore
      value = result;
    }

    if (!isEmpty(value, omitZero)) {
      return value;
    }
    return void 0;
  };
  /* eslint-enable no-param-reassign */

  let res = omit(obj) as unknown;
  if (res === void 0) {
    res = typeOf(obj) === 'object' ? {} : res;
  }
  return (res as unknown) as Output;
};

function isEmpty<Input = unknown>(value: Input, omitZero: boolean) {
  switch (typeOf(value)) {
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
      // @ts-ignore
      return value.length === 0;
    case 'file':
    case 'map':
    case 'set':
      // @ts-ignore
      return value.size === 0;
    case 'number':
      // @@ts-ignore
      return omitZero ? value === 0 : false;
    case 'error':
      // @ts-ignore
      return value.message === '';
    case 'array':
      // eslint-disable-next-line no-restricted-syntax
      // @ts-ignore
      for (const ele of value) {
        if (!isEmpty(ele, omitZero)) {
          return false;
        }
      }
      return true;
    case 'object':
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(value)) {
        // @ts-ignore
        if (!isEmpty(value[key], omitZero)) {
          return false;
        }
      }
      return true;
    default: {
      return true;
    }
  }
}

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
  Object.defineProperty(omitEmpty, "__esModule", { value: true });

  Object.defineProperty(omitEmpty, 'omitEmpty', { value: omitEmpty });
  Object.defineProperty(omitEmpty, 'default', { value: omitEmpty });
}

export default omitEmpty;
