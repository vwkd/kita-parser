import parser from "./parser/mod.ts"
import transformer from "./transformer/mod.ts";

const input = await Deno.readTextFile("./vz.txt");

const parseResult = parser.fork(input,
  (error, parsingState) => {
    console.error("Parse error:", error);
    console.error("Parse target:", parsingState.data);
    // throw error;
    return parsingState.result
  },
  (result, _) => {
    console.log("Parse success:", result.slice(0,5));
    console.log("Transform success:", result2.slice(0, 5));
    return result2;
  }
);

const result = transformer(parseResult);

await Deno.writeTextFile("out/vz.json", JSON.stringify(result, null, 2));
