# Deno Types

This repository contains a script that extracts the declaration files from the
official Deno repository and puts them in a package to be published on npm.

To generate `index.d.ts` simply run `./generate.js` (make sure Deno is
installed).

This scripts takes all `lib.deno.*.d.ts` files from the repository, strips away
the tripple slash directives, and concatenates them into a single file.

More info on how to use the types can be found in [here](package/README.md).
