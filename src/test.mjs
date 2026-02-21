// --- assert (simple implementations) ---

function strictEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(
      `AssertionError: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
}

function throws(fn, expected) {
  let err;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  if (err === undefined) {
    throw new Error("AssertionError: Expected function to throw");
  }
  if (expected instanceof RegExp && !expected.test(err.message)) {
    throw new Error(
      `AssertionError: Expected error message to match ${expected}, got: ${err.message}`,
    );
  }
}

function deepStrictEqual(actual, expected) {
  if (!equal(actual, expected)) {
    throw new Error(
      `AssertionError: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
}

function equal(a, b) {
  if (Object.is(a, b)) return true;
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, k) || !equal(a[k], b[k])) {
      return false;
    }
  }
  return true;
}

export default {
  strictEqual,
  throws,
  deepStrictEqual,
};

// --- minimal test runner (describe / it) ---

export function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

export function it(name, fn) {
  try {
    fn();
    console.log(`  ✔ ${name}`);
  } catch (e) {
    console.error(`  ✘ ${name}`);
    console.error(e.message);
  }
}
