import { cp, mkdir, readdir, access, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const model = process.argv[2];
if (!model) {
  console.error("Usage: npm run experiment:new -- <model-name>");
  process.exit(1);
}

const root = process.cwd();
const onboarding = path.join(root, "benchmark", "onboarding");
const baseline = path.join(onboarding, "baseline");
const runs = path.join(onboarding, "runs");
const safeModel = model.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function copyApp(source, destination) {
  await cp(source, destination, {
    recursive: true,
    filter(src) {
      const rel = path.relative(onboarding, src);
      if (!rel) return true;
      const first = rel.split(path.sep)[0];
      return !["baseline", "runs", "node_modules", "dist"].includes(first);
    },
  });
}

if (!(await exists(path.join(onboarding, "package.json")))) {
  console.error("Run this command from the my-agent repository root.");
  process.exit(1);
}

// Snapshot the original fixture once. After this exists it is never overwritten.
if (!(await exists(baseline))) {
  await mkdir(baseline, { recursive: true });
  await copyApp(onboarding, baseline);
  await writeFile(path.join(baseline, "BASELINE.md"), "# Frozen baseline\n\nThis directory is the immutable Northstar onboarding fixture. Experiment agents must never edit it.\n");
  console.log("Created frozen baseline snapshot.");
}

const modelDir = path.join(runs, safeModel);
await mkdir(modelDir, { recursive: true });
const entries = await readdir(modelDir, { withFileTypes: true });
const nums = entries
  .filter((e) => e.isDirectory() && /^run-\d+$/.test(e.name))
  .map((e) => Number(e.name.slice(4)));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const runName = `run-${String(next).padStart(2, "0")}`;
const destination = path.join(modelDir, runName);

await cp(baseline, destination, {
  recursive: true,
  filter(src) {
    const name = path.basename(src);
    return !["node_modules", "dist", "BASELINE.md"].includes(name);
  },
});

const relative = path.relative(root, destination);
await writeFile(path.join(destination, "RUN.md"), `# Experiment run\n\n- Model: ${model}\n- Run: ${runName}\n- Source: frozen baseline\n- Workspace: ${relative}\n`);

console.log(`\nCreated: ${relative}`);
console.log("The baseline was not modified.");
console.log(`\nGive Eve this workspace:\n  ${relative}\n`);
