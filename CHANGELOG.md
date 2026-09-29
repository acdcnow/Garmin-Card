# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-29

The card was renamed from `fitbit-card` to `garmin-card` and rebuilt for
Home Assistant 2026.9.

### Added

- **Goal aware progress rings** – a ring can take its maximum from another entity
  (`max_entity: sensor.garmin_connect_daily_step_goal`) or from an attribute of the
  entity itself (`max_attribute: goal`), so Garmin goals fill the ring completely.
- **Attribute values** – `attribute:` shows any attribute instead of the state, e.g. the
  distance or duration of `sensor.garmin_connect_last_activity`.
- **Bars layout** – `layout: bars` renders the same data as horizontal progress bars.
- **Layout options** – `columns` (rings per row) and `ring_size` (ring radius).
- **Actions** – `tap_action`, `hold_action` and `double_tap_action` per entity, with
  support for `more-info`, `toggle`, `navigate`, `url`, the modern `perform-action`
  config, `call-service` and `confirmation`.
- **Name and icon overrides** – `name` and `icon` per entity.
- **Numeric battery support** – `battery_entity` now understands percentages, picks the
  matching `mdi:battery*` icon, shows charging state and colors the icon by level.
  String states (`High` / `Medium` / `Low`) keep working.
- **Garmin auto detection** – the card picker prefills the card with your Garmin entities
  using the device and entity registry, and the card is offered as a suggestion when a
  Garmin entity is picked (Home Assistant 2026.6+).
- A [visual editor](README.md#quick-start) built on `ha-form`.
- Examples: [single topic cards](examples/cards),
  [layout designs](examples/designs),
  [a full dashboard](examples/dashboards) and an
  [entity reference](examples/garmin-entities.md).
- Screenshots of every example and both dashboards in the README. They are rendered from
  the example YAML by the card itself (`docs/preview`), so they cannot drift away from the
  code that is actually shipped.
- `hacs.json`, a HACS validation workflow, a smoke test (`npm test`) and
  `npm run preview:data` to regenerate the README previews.

### Changed

- **Renamed** everything from `fitbit-card` to `garmin-card`: the custom element, the card
  type `custom:garmin-card`, the bundle `dist/garmin-card.js`, the documentation and the
  HACS metadata.
- Rebuilt for **Home Assistant 2026.9+**:
  - values are formatted with `hass.formatEntityStateToParts()` /
    `hass.formatEntityAttributeValueToParts()`, so your number format and the per entity
    display precision are respected,
  - `getGridOptions()` for the sections view,
  - `getEntitySuggestion()` for the card picker,
  - runtime strings come from `hass.localize()`,
  - card events are fired with `{ bubbles: true, composed: true }`,
  - theme variables use `--primary-color`, `--state-icon-color`, `--divider-color`,
    `--ha-font-size-*` and `--mdc-icon-size` instead of the removed `--paper-*` variables.
- The editor was rewritten with `ha-form` selectors; the removed Polymer
  `paper-checkbox` / `paper-input` elements are no longer used.
- Rings animate from their previous value to the new one instead of redrawing from empty.
- Card defaults: rings now use `--primary-color` instead of `--primary-text-color`.

### Removed

- The webpack / babel build chain, `src/` and the old `dist/fitbit-card.js`. The card is a
  single dependency free file that needs no build step.
- The previous hard limit of three header entities.
- The `attribution` based entity filter, which does not exist for Garmin sensors. Garmin
  entities are detected through the device registry instead.

### Fixed

- Invalid progress values (a maximum of `0`, or a non numeric state) no longer produce
  `NaN` rings; rings fall back to an empty ring and a placeholder label.
- Units are only shown when the value is present and when they are actually requested.
- The editor no longer writes empty or default values into the card configuration, so the
  generated YAML stays readable.
- The old editor label bug that showed "Max" twice instead of "Color stops" is gone.

## [1.1.1] - and earlier

See the upstream project [ljmerza/fitbit-card](https://github.com/ljmerza/fitbit-card),
the Fitbit Card this project started as a fork of.

[2.0.0]: https://github.com/acdcnow/Garmin-Card/releases/tag/v2.0.0
