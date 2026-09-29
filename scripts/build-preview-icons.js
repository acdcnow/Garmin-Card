/**
 * Builds docs/preview/icons.js: a subset of @mdi/js with every icon the
 * preview harness needs. The icon names are collected from the generated
 * docs/preview/cards.js, so the subset can never run out of sync.
 */
const fs = require("fs");
const mdi = require("@mdi/js");

const path = require("path");
const cardsFile = path.resolve(__dirname, "../docs/preview/cards.js");
const target = path.resolve(__dirname, "../docs/preview/icons.js");
const source = fs.readFileSync(cardsFile, "utf8");

const names = new Set();

// every "mdi:name" that appears in the generated preview data
const matches = source.match(/mdi:[a-z0-9-]+/g) || [];
matches.forEach((match) => names.add(match.slice(4)));

// battery icons are computed by the card from the battery level
[
  "battery",
  "battery-charging",
  "battery-10",
  "battery-20",
  "battery-30",
  "battery-40",
  "battery-50",
  "battery-60",
  "battery-70",
  "battery-80",
  "battery-90",
].forEach((name) => names.add(name));

const toExportName = (name) =>
  "mdi" + name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");

const subset = {};
const missing = [];

[...names].sort().forEach((name) => {
  const value = mdi[toExportName(name)];
  if (typeof value !== "string") {
    missing.push(`${name} (tried ${toExportName(name)})`);
    return;
  }
  subset[name] = value;
});

if (missing.length) {
  console.error(`Unknown icon names (${missing.length}):`);
  missing.forEach((name) => console.error(`  - ${name}`));
  process.exit(1);
}

const out = `/**
 * Generated subset of @mdi/js (Material Design Icons) used by the preview
 * harness. Regenerate with the preview generator.
 * Icons: ${Object.keys(subset).length}
 */
window.MDI_SUBSET = ${JSON.stringify(subset, null, 0)};
`;

fs.writeFileSync(target, out.replace(/\r\n/g, "\n"), "utf8");
console.log(`wrote ${target} with ${Object.keys(subset).length} icons (${out.length} bytes)`);
