import * as langLib from "@supercollider/lang";
import * as server from "@supercollider/server";
import ServerPlus, { boot } from "@supercollider/server-plus";
import * as dryads from "@supercollider/dryads";
import { SCLangError } from "@supercollider/lang";
import { mapping as map, msg, resolveOptions } from "@supercollider/server";

declare const supercolliderjs: {
    server: typeof server & {
        boot: typeof boot;
        server: typeof ServerPlus;
    };
    dryads: typeof dryads;
    lang: typeof langLib;
    map: typeof map;
    msg: typeof msg;
    SCLangError: typeof SCLangError;
    resolveOptions: typeof resolveOptions;
};

export default supercolliderjs;
export const server: typeof supercolliderjs.server;
export const dryads: typeof supercolliderjs.dryads;
export const lang: typeof supercolliderjs.lang;
export const map: typeof supercolliderjs.map;
export const msg: typeof supercolliderjs.msg;
export const SCLangError: typeof supercolliderjs.SCLangError;
export const resolveOptions: typeof supercolliderjs.resolveOptions;