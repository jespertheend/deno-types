#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { ensureDir } from "https://deno.land/std@0.153.0/fs/mod.ts";
import { setCwd } from "https://deno.land/x/chdir_anywhere@v0.0.2/mod.js";
setCwd();

const p = Deno.run({
  cmd: ["deno", "types"],
  stdout: "piped",
});

const typesContent = await p.output();
await ensureDir("./package/deno-types/");
await Deno.writeFile("./package/deno-types/index.d.ts", typesContent);
