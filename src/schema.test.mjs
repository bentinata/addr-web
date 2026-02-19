import { describe, it } from "node:test";
import assert from "node:assert";
import {
  string,
  number,
  array,
  optional,
  email,
  phone,
  define,
} from "./schema.mjs";

describe("string", () => {
  it("returns the value when given a string", () => {
    assert.strictEqual(string("hello"), "hello");
  });

  it("throws when given a number", () => {
    assert.throws(() => string(42), /Expected string, got number/);
  });

  it("throws when given undefined", () => {
    assert.throws(() => string(undefined), /Expected string, got undefined/);
  });

  it("throws when given an object", () => {
    assert.throws(() => string({}), /Expected string, got object/);
  });
});

describe("number", () => {
  it("returns the value when given a number", () => {
    assert.strictEqual(number(42), 42);
  });

  it("throws when given a string", () => {
    assert.throws(() => number("42"), /Expected number, got string/);
  });

  it("throws when given undefined", () => {
    assert.throws(() => number(undefined), /Expected number, got undefined/);
  });
});

describe("array", () => {
  it("returns mapped array when given valid items", () => {
    const validate = array(string);
    assert.deepStrictEqual(validate(["a", "b", "c"]), ["a", "b", "c"]);
  });

  it("throws when given a non-array", () => {
    const validate = array(string);
    assert.throws(() => validate("not array"), /Expected an array/);
  });

  it("throws when an item fails the inner validator", () => {
    const validate = array(number);
    assert.throws(() => validate([1, "two", 3]), /Expected number, got string/);
  });

  it("works with custom validator", () => {
    const validate = array(number);
    assert.deepStrictEqual(validate([1, 2, 3]), [1, 2, 3]);
  });
});

describe("optional", () => {
  it("returns undefined when given undefined", () => {
    const validate = optional(string);
    assert.strictEqual(validate(undefined), undefined);
  });

  it("validates and returns value when given defined value", () => {
    const validate = optional(string);
    assert.strictEqual(validate("hello"), "hello");
  });

  it("throws when given invalid value", () => {
    const validate = optional(number);
    assert.throws(
      () => validate("not a number"),
      /Expected number, got string/,
    );
  });
});

describe("email", () => {
  it("returns string when given valid email", () => {
    assert.strictEqual(email("user@example.com"), "user@example.com");
  });

  it("accepts emails with allowed characters", () => {
    assert.strictEqual(email("a-z_1.2@domain.co"), "a-z_1.2@domain.co");
  });

  it("throws when given invalid email", () => {
    assert.throws(() => email("notanemail"), /Expected valid email/);
  });

  it("throws when given empty string", () => {
    assert.throws(() => email(""), /Expected valid email/);
  });

  it("throws when given non-string", () => {
    assert.throws(() => email(123), /Expected valid email/);
  });
});

describe("phone", () => {
  it("returns number when given valid phone (contains 62)", () => {
    assert.strictEqual(phone(62), 62);
    assert.strictEqual(phone(62123), 62123);
  });

  it("throws when given number without 62", () => {
    assert.throws(() => phone(1), /Expected valid phone number/);
  });

  it("throws when given non-number", () => {
    assert.throws(() => phone("62"), /Expected number, got string/);
  });
});

describe("define", () => {
  it("returns object with validated values", () => {
    const validate = define({ name: string, age: number });
    assert.deepStrictEqual(validate({ name: "Alice", age: 30 }), {
      name: "Alice",
      age: 30,
    });
  });

  it("throws when given non-object", () => {
    const validate = define({ name: string });
    assert.throws(() => validate("string"), /Expected an object/);
    assert.throws(() => validate(null), /Expected an object/);
  });

  it("throws when a field fails validation", () => {
    const validate = define({ name: string, age: number });
    assert.throws(
      () => validate({ name: "Alice", age: "thirty" }),
      /Expected number, got string/,
    );
  });

  it("works with optional and array", () => {
    const validate = define({
      name: string,
      tags: optional(array(string)),
    });
    assert.deepStrictEqual(validate({ name: "Bob", tags: ["a", "b"] }), {
      name: "Bob",
      tags: ["a", "b"],
    });
    assert.deepStrictEqual(validate({ name: "Bob" }), {
      name: "Bob",
      tags: undefined,
    });
  });
});
