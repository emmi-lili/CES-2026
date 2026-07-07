import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");

if (!existsSync(outDir)) {
  console.error("Run `npm run build` first — out/ directory not found.");
  process.exit(1);
}

function copyDir(name) {
  const src = join(root, name);
  const dest = join(outDir, name);
  cpSync(src, dest, { recursive: true });
  console.log(`Copied ${name}/ -> out/${name}/`);
}

copyDir("api");
copyDir("uploads");
cpSync(join(root, "deploy", ".htaccess"), join(outDir, ".htaccess"));
console.log("Copied deploy/.htaccess -> out/.htaccess");
console.log("\nDeploy bundle ready in out/");
