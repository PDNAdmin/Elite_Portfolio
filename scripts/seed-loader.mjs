// Lets plain Node load the site's TypeScript content files for the seed script:
// resolves "@/..." imports (like tsconfig paths) and turns image imports into
// { src: "<absolute file path>" } so the script can upload the original files.

import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageExt = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

function findTs(base) {
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
    if (existsSync(candidate) && !candidate.endsWith(path.sep)) return candidate;
  }
  return null;
}

registerHooks({
  resolve(specifier, context, next) {
    let target = null;
    if (specifier.startsWith("@/")) target = path.join(root, specifier.slice(2));
    else if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      target = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
    }
    if (target) {
      if (imageExt.test(target)) return { url: pathToFileURL(target).href, shortCircuit: true };
      const file = findTs(target);
      if (file && /\.tsx?$/.test(file)) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (imageExt.test(url)) {
      const file = fileURLToPath(url);
      return {
        format: "module",
        source: `export default { src: ${JSON.stringify(file)}, local: true };`,
        shortCircuit: true,
      };
    }
    return next(url, context);
  },
});
