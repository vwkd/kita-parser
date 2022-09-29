import {
  coroutine,
  char,
  many,
  sepBy1,
  possibly,
  str,
} from "../deps.ts";

import { whitespaceParser } from "./chars.ts";
import { wordsParser } from "./word.ts";
import tagsWhitespaceParser from "./tags.ts";

/*
CategoryList
    Words ("," ws Words)*
*/
const categoryListParser = sepBy1( str(", ")) (wordsParser);

/*
Category
    "(" CategoryList ")"
*/
const categoryParser = coroutine( function* () {
  yield char("(");
  const categoryList = yield categoryListParser;
  yield char(")");
  
  return categoryList;
});

/*
WhitespaceCategory
    ws Category
*/
const whitespaceCategoryParser = coroutine( function* () {
  yield whitespaceParser;
  const category = yield categoryParser;
  
  return category;
});

/*
Element
    Words WhitespaceCategory?
*/
const elementParser = coroutine( function* () {
  const value = yield wordsParser;
  const category = (yield possibly( whitespaceCategoryParser)) ?? [];

  return {
    value,
    category,
  };
});

/*
CommaWhitespaceElement
    "," ws Element
*/
const commaWhitespaceElementParser = coroutine( function* () {
  yield char(",");
  yield whitespaceParser;
  const element = yield elementParser;
  
  return element;
});

/*
Elements
    Element CommaWhitespaceElement*
*/
const elementsParser = coroutine( function* () {
  const element = yield elementParser;
  const elementList = yield many( commaWhitespaceElementParser);

  return [
    element,
    ...elementList,
  ];
});

/*
Field
    TagsWhitespace? Elements
*/
const fieldParser = coroutine( function* () {
  const tags = (yield possibly( tagsWhitespaceParser)) ?? [];
  const value = yield elementsParser;

  return {
    value,
    tags,
  };
});

export default fieldParser;
