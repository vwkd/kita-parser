import {
  str,
  coroutine,
  choice,
  char,
  recursiveParser,
  many,
} from "../deps.ts";

import { newlineParser, whitespaceParser } from "./chars.ts";
import keyParser from "./key.ts";
import referenceParser from "./reference.ts";
import definitionsParser from "./definitions.ts";

/*
Text
    Line NewlineLine*
*/
// TODO: use startOfInput and endOfInput?
const textParser = coroutine(function* () {
  const line = yield lineParser;
  const rest = yield many( newlineLineParser);
  
  return [
    line,
    ...rest,
  ];
});

/*
NewlineLine
    nl Line
*/
const newlineLineParser = coroutine(function* () {
  yield newlineParser;
  const line = yield lineParser;
  
  return line;
});

/*
Line
    Key ws Value
*/
const lineParser = coroutine(function* () {
  const key = yield keyParser;
  yield whitespaceParser;
  const value = yield valueParser;
  
  return {
    key,
    value,
  };
});

/*
Value
    Reference
    Definitions
*/
const valueParser = choice([
  referenceParser,
  definitionsParser,
]);

export default textParser;