import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Entered fifty $2 joke contests, built dozens of repos, and still haven't won a single dollar.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate mirror: 1-100 characters, single line, non-blank.
if (LINE.length < 1 || LINE.length > 100 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`entry line fails gate: ${LINE.length} chars`);
}

const tmp = join(outDir, `.entry.txt.${process.pid}.tmp`);
writeFileSync(tmp, LINE + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
