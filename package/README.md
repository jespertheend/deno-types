# Deno Types

This package contains all the `Deno.` types extracted from the original Deno
repository. This is useful if you wish to bundle code without using
`deno bundle`. Or if you would like completions in your IDE without using a Deno
plugin.

## Usage

```
npm i -D deno-types
```

Then in your `tsconfig.json` add this package to your `typeRoots`. For instance:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "target": "esnext",
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/deno-types"
    ],
    "module": "esnext"
  },
  "files": ["src/main.js"],
  "include": ["src/**/*.js"]
}
```
