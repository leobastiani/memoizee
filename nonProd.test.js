// @ts-check

import assert from "node:assert";
import { test } from "node:test";
import memoizee, { resetAll } from "./index.js";

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
  assert.strictEqual(memoized(1), 2);
  assert.strictEqual(calls, 2);

  resetAll();
  memoized(1);
  assert.strictEqual(memoized(1), 2);
  assert.strictEqual(calls, 3);
});
