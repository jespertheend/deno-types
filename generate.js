#!/usr/bin/env -S deno run --allow-read --allow-write

import { join } from "https://deno.land/std@0.119.0/path/mod.ts";
import { setCwd } from "https://deno.land/x/chdir_anywhere@v0.0.2/mod.js";
setCwd();

const DENO_REPOSITORY_PATH = "../deno";

/**
 * @param {string} path
 * @returns {Promise<string[]>}
 */
async function collectDeclarationFiles(path) {
  /** @type {string[]} */
  const collectedFiles = [];
  const dirEntries = Deno.readDir(path);
  for await (const entry of dirEntries) {
    if (entry.isFile) {
      if (entry.name.startsWith("lib.deno") && entry.name.endsWith(".d.ts")) {
        collectedFiles.push(join(path, entry.name));
      }
    } else if (entry.isDirectory) {
      const files = await collectDeclarationFiles(`${path}/${entry.name}`);
      collectedFiles.push(...files);
    }
  }
  return collectedFiles;
}

console.log("Collecting declaration files...");
const declarationFiles = await collectDeclarationFiles(DENO_REPOSITORY_PATH);
// let modContent = "";

let concatenatedContent = "";

for (const declarationFilePath of declarationFiles) {
  const fileContent = await Deno.readTextFile(declarationFilePath);
  const lines = fileContent.split("\n");

  // Strip tripple slash directives
  const newLines = lines.filter((line) => !line.startsWith("/// <reference"));

  const newFileContent = newLines.join("\n");

  concatenatedContent += newFileContent + "\n";
}

try {
  await Deno.mkdir("./package/deno-types", { recursive: true });
} catch (e) {
  if (!(e instanceof Deno.errors.AlreadyExists)) {
    throw e;
  }
}

await Deno.writeTextFile("./package/deno-types/index.d.ts", concatenatedContent);
