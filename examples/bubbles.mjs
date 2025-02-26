// const sc = require("supercolliderjs");
import * as sc from "supercolliderjs";

sc.server.boot().then(async (server) => {
  // should be using await here?
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
