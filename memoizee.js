import { resets } from "./reset.js";
import memoizeeImpl from "memoizee";

const memoizeeWithReset = (fn, ...opts) => {
  let ret;
  function newFn(...args) {
    resets.add(ret);
    return fn.apply(this, args);
  }
  Object.defineProperty(newFn, "length", { value: fn.length });
  ret = memoizeeImpl(newFn, ...opts);
  return ret;
};

export default process.env.NODE_ENV === "production"
  ? memoizeeImpl
  : memoizeeWithReset;
