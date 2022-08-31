import {
  str,
  coroutine,
  choice,
  char,
  many,
  recursiveParser,
  anyCharExcept
} from "../deps.ts";

import { newlineParser, whitespaceParser } from "./chars.ts";
import keyParser from "./key.ts";
import valueParser from "./value.ts";
import referenceParser from "./reference.ts";
import definitionsParser from "./definitions.ts";

/*
Text
    Lines
    Line
*/
// TODO: use startOfInput and endOfInput?
const textParser = recursiveParser( () => choice([
  linesParser,
  lineParser,
]));

/*
Lines
    Line nl Text
*/
const linesParser = coroutine(function* () {
  const line = yield lineParser;
  yield newlineParser;
  const rest = yield textParser;
  const restArr = Array.isArray(rest) ? rest : [rest];
  
  return [
    line,
    ...restArr,
  ];
});

/*
Line
    Key ws Value
*/
const lineParser = coroutine(function* () {
  // TODO: finish
  const line = yield many (anyCharExcept (newlineChar));
  return line.join("");
});

/*
Value
    Reference
    Definitions
*/
const textParser = choice([
  referenceParser,
  definitionsParser,
]);

export default textParser;