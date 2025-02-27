// const sc = require("supercolliderjs");
import * as sc from "supercolliderjs";

sc.server.boot().then(async (server) => {
  // I think the type of 'server' here should be ServerPlus (or at least Server)
  // it appears as `sc.server.default` - and `server.synthDef` is `any`...
  // In reality - `server.synthDef` is actually `undefined` at runtime, so we fail to do anything useful.
  // This is confusing to me...
  // I don't know what is so different about the current script vs the past...
  // we're now using the ESM import, but I thought the actual sc.server.boot() should be doing the same thing...
  const def = await server.synthDef(
    "bubbles",
    `
      SynthDef("bubbles", { arg out=0, wobble=0.4, innerWobble=8, releaseTime=4, delayTime=0.2;
        var f, zout;
        f = LFSaw.kr(wobble, 0, 24, LFSaw.kr([innerWobble, innerWobble / 1.106], 0, 3, 80)).midicps;
        zout = CombN.ar(SinOsc.ar(f, 0, 0.04), delayTime, 0.2, 4);  // echoing sine wave
        zout = zout * EnvGen.kr(Env.linen(releaseTime: releaseTime), doneAction: 2);
        Out.ar(out, zout);
      });
    `,
  );

  setInterval(() => {
    server.synth(def, {
      wobble: Math.random() * 10,
      innerWobble: Math.random() * 16,
      releaseTime: Math.random() * 4 + 2,
      delayTime: Math.random() * 0.2 + 0.1,
    });
  }, 4000);
});
