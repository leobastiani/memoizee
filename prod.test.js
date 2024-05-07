// @ts-check

import assert from "node:assert";
import { test } from "node:test";
import memoizee from "./index.js";
import memoizeeImpl from "memoizee";

test("success", () => {
  let calls = 0;
  const myMock = (/** @type {number} */ a) => {
    calls++;
    return a + 1;
  };
  const memoized = memoizee(myMock);
  memoized(1);
  memoized(1);
  memoized(2);
  assert.strictEqual(calls, 2);
  assert.strictEqual(memoized(1), 2);
});

test("this", () => {
  let lastThis;
  function fn(/** @type {number} */ a) {
    // @ts-expect-error
    lastThis = this;
    return [lastThis, a];
  }
  const memoized = memoizee(fn);
  const this1 = {};
  const this2 = {};
  memoized.call(this1, 1);
  assert.strictEqual(lastThis, this1);
  assert.strictEqual(memoized(1)[0], this1);
  assert.strictEqual(memoized(1)[1], 1);

  memoized.call(this2, 2);
  assert.strictEqual(lastThis, this2);
  assert.strictEqual(memoized(2)[0], this2);
  assert.strictEqual(memoized(2)[1], 2);

  memoized(3);
  assert.strictEqual(lastThis, undefined);
  assert.strictEqual(memoized(3)[0], undefined);
  assert.strictEqual(memoized(3)[1], 3);
});

test("name", () => {
  function fn() {}
  assert.strictEqual(memoizeeImpl(fn).name, memoizee(fn).name);
});
