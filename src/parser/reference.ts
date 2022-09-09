import {
  str,
  coroutine,
  choice,
  char,
  possibly,
  sequenceOf,
} from "../deps.ts";

import { whitespaceParser } from "./chars.ts";
import sourceParser from "./source.ts";
    
/*
Kind
    "Bed." ws "s."
    "s." 
    "id."
*/
const kindParser = choice([
  sequenceOf([
    str("Bed."),
    whitespaceParser,
    str("s."),
  ]).map(a => a.join("")),
  str("s."),
  str("id."),
]);

/*
Reference
    Kind ws Source
*/
const referenceParser = coroutine( function* () {
  const kind = yield kindParser;
  yield whitespaceParser;
  const source = yield sourceParser;
  
  return {
    source,
    kind,
  };
});

export default referenceParser;