const VALIDATOR = {
  email: /[A-Za-z0-9_.-]+@[a-z0-9.]+/,
  phone: /62/,
};

/**
 * @param {any} x
 * @returns {string}
 */
export const string = (x) => {
  if (typeof x !== "string")
    throw new Error(`Expected string, got ${typeof x}`);
  return x;
};

/**
 * @param {any} x
 * @returns {number}
 */
export const number = (x) => {
  if (typeof x !== "number")
    throw new Error(`Expected number, got ${typeof x}`);

  return x;
};

/**
 * @template T
 * @param {(x: any) => T} validator
 * @returns {(x: any) => T[]}
 */
export const array = (validator) => (x) => {
  if (!Array.isArray(x)) throw new Error("Expected an array");

  return x.map(validator);
};

/**
 * @template T
 * @param {(x: any) => T?} validator
 * @returns {(x: any) => T?}
 */
export const optional = (validator) => (x) => {
  if (x === undefined) return undefined;

  return validator(x);
};

export const email = (x) => {
  if (!VALIDATOR.email.test(x)) throw new Error("Expected valid email");

  return string(x);
};

export const phone = (x) => {
  if (!VALIDATOR.phone.test(x)) throw new Error("Expected valid phone number");

  return number(x);
};

/**
 * @template {Record<string, Function>} T
 * @param {T} definition
 * @returns {(unparsed: any) => {[K in keyof T]: ReturnType<T[K]>}}
 */
export const define = (definition) => (unparsed) => {
  if (typeof unparsed !== "object" || unparsed === null) {
    throw new Error("Expected an object");
  }

  const result = {};
  for (const key in definition) {
    result[key] = definition[key](unparsed[key]);
  }

  return result;
};
