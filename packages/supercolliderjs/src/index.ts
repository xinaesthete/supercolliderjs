/**
 * @module supercolliderjs
 */
import * as langLib from "@supercollider/lang";
import * as server from "@supercollider/server";
import ServerPlus, { boot } from "@supercollider/server-plus";
import * as dryads from "@supercollider/dryads";
import { SCLangError } from "@supercollider/lang";
import { mapping as map, msg, resolveOptions } from "@supercollider/server";

const lang = langLib;

// Create the combined export object
const supercolliderjs = {
  server: {
    ...server,
    boot,
    server: ServerPlus,
  },
  dryads,
  lang,
  map,
  msg,
  SCLangError,
  resolveOptions,
};

// Default export for ESM support
export default supercolliderjs;

// Named exports for destructuring
export { server, dryads, lang, map, msg, SCLangError, resolveOptions };