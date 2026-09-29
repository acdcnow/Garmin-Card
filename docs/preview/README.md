# Card previews

These are the images the [README](../../README.md) uses. They are screenshots of the card,
rendered from the YAML in [`examples/`](../../examples) with the real `dist/garmin-card.js`
and a fake `hass` object — so they cannot show something the card does not actually
render, and they go stale loudly (see below) when an example changes.

## Files

| File | Content |
| ---- | ------- |
| `harness.html` | The preview page: stubs `<ha-card>` and `<ha-icon>`, defines the theme variables and renders every example |
| `cards.js` | **Generated** — the configuration of all 23 examples plus a realistic fake Garmin state set (136 entities) |
| `icons.js` | **Generated** — the Material Design Icons subset from `@mdi/js` that the harness needs |
| `*.png` | The screenshots used by the README: 21 example cards, one dark theme variant and two dashboards |

## Regenerating the data

```bash
npm install
npm run preview:data
```

That rebuilds `cards.js` and `icons.js` from the example YAML files
(`scripts/build-preview-data.js` and `scripts/build-preview-icons.js`). The output is
deterministic and LF only, so CI can verify it is up to date:

```bash
npm run preview:data && git diff --exit-code docs/preview
```

The fake sensor values, units and device classes live in
`scripts/build-preview-data.js`. The data uses a metric unit system, which is why a
distance shows up as `6.42 km` while the card configuration keeps `max: 10000` (meters) —
exactly what Home Assistant does: the state stays in the base unit, only the display is
converted.

## Regenerating the screenshots

Open `harness.html` in a browser (it needs `../../dist/garmin-card.js`, so serve the
repository or open the file directly) and capture each element that has a `shot-` id.
With Playwright:

```js
const page = await browser.newPage({ viewportSize: { width: 1780, height: 1200 } });
await page.goto(`file://${repo}/docs/preview/harness.html`);
await page.waitForFunction(() => document.body.dataset.ready === 'true');
await page.waitForTimeout(1500);            // let the ring animation finish

for (const shot of await page.locator('.shot').all()) {
  const id = await shot.getAttribute('id'); // shot-<name>
  await shot.screenshot({ path: `${repo}/docs/preview/${id.replace(/^shot-/, '')}.png` });
}
for (const id of ['shot-fitness-dashboard', 'shot-masonry-dashboard']) {
  await page.locator(`#${id}`).screenshot({ path: `${repo}/docs/preview/${id.replace(/^shot-/, '')}.png` });
}
```

`harness.html` also has a `#dark` section which renders one card with the Home Assistant
dark theme variables.
