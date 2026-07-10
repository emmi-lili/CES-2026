import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (!basePath) {
  console.log("NEXT_PUBLIC_BASE_PATH not set — skipping asset path fix.");
  process.exit(0);
}

function walkHtmlFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkHtmlFiles(full));
    else if (entry.endsWith(".html")) files.push(full);
  }
  return files;
}

const prefix = basePath.startsWith("/") ? basePath : `/${basePath}`;
const htmlFiles = walkHtmlFiles(outDir);

let total = 0;
for (const file of htmlFiles) {
  const original = readFileSync(file, "utf8");
  const fixed = original.replace(
    /(src|href)="\/(?!crypto-experience-summit\/|\/)([^"]*)"/g,
    `$1="${prefix}/$2"`,
  );
  if (fixed !== original) {
    writeFileSync(file, fixed);
    total += 1;
  }
}

console.log(`Fixed public asset paths in ${total} HTML file(s) with prefix ${prefix}`);
