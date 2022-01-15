#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { setCwd } from "https://deno.land/x/chdir_anywhere@v0.0.2/mod.js";
setCwd();

const p = Deno.run({
  cmd: ["deno", "types"],
  stdout: "piped",
});

const typesContent = await p.output();
await Deno.writeFile("./package/deno-types/index.d.ts", typesContent);
