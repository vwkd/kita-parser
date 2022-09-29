export {
  str,
  sequenceOf,
  coroutine,
  choice,
  char,
  possibly,
  many,
  many1,
  between,
  startOfInput,
  endOfInput,
  digits,
  anyCharExcept,
  skip,
  getData,
  setData,
  withData,
} from "https://cdn.skypack.dev/arcsecond@v4.1.0";
import {
  sequenceOf,
  many,
} from "https://cdn.skypack.dev/arcsecond@v4.1.0";
export { equal } from "https://deno.land/std@0.154.0/testing/asserts.ts";

// fixed version, see https://github.com/francisrstokes/arcsecond/issues/98
export const sepBy1 = separator => value => sequenceOf([
  value,
  many(sequenceOf([
    separator,
    value
  ]).map(a => a[1])),
]).map(([e, r]) => [e, ...r]);

import { ByteCodePointConverter } from "./utils.ts";
const res = await fetch("https://raw.githubusercontent.com/vwkd/ka-dict-verbs/main/src/vz.txt");
const input = await res.text();
export const inputObj = ByteCodePointConverter(input);