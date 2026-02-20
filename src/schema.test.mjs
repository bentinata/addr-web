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
  it("returns mapped array when given correct items", () => {
    const parse = array(string);
    assert.deepStrictEqual(parse(["a", "b", "c"]), ["a", "b", "c"]);
  });

  it("throws when given a non-array", () => {
    const parse = array(string);
    assert.throws(() => parse("not array"), /Expected an array/);
  });

  it("throws when an item fails the inner parser", () => {
    const parse = array(number);
    assert.throws(() => parse([1, "two", 3]), /Expected number, got string/);
  });

  it("works with custom parser", () => {
    const parse = array(number);
    assert.deepStrictEqual(parse([1, 2, 3]), [1, 2, 3]);
  });
});

describe("optional", () => {
  it("returns undefined when given undefined", () => {
    const parse = optional(string);
    assert.strictEqual(parse(undefined), undefined);
  });

  it("parses and returns value when given defined value", () => {
    const parse = optional(string);
    assert.strictEqual(parse("hello"), "hello");
  });

  it("throws when given wrong type", () => {
    const parse = optional(number);
    assert.throws(() => parse("not a number"), /Expected number, got string/);
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
  it("returns object with parsed values", () => {
    const parse = define({ name: string, age: number });
    assert.deepStrictEqual(parse({ name: "Alice", age: 30 }), {
      name: "Alice",
      age: 30,
    });
  });

  it("throws when given non-object", () => {
    const parse = define({ name: string });
    assert.throws(() => parse("string"), /Expected an object/);
    assert.throws(() => parse(null), /Expected an object/);
  });

  it("throws when a field cannot be parsed", () => {
    const parse = define({ name: string, age: number });
    assert.throws(
      () => parse({ name: "Alice", age: "thirty" }),
      /Expected number, got string/,
    );
  });

  it("throws with list of field when multiple fields cannot be parsed", () => {
    const parse = define({ name: string, age: number });

    assert.throws(
      () => parse({ name: 0b0010_0101_1110, age: "30" }),
      /"name":.*,"age":.*/,
    );
  });

  it("works with optional and array", () => {
    const parse = define({
      name: string,
      tags: optional(array(string)),
    });
    assert.deepStrictEqual(parse({ name: "Bob", tags: ["a", "b"] }), {
      name: "Bob",
      tags: ["a", "b"],
    });
    assert.deepStrictEqual(parse({ name: "Bob" }), {
      name: "Bob",
      tags: undefined,
    });
  });
});
