# Garmin Card for Home Assistant

<p align="center">
<img src="https://img.shields.io/github/v/release/acdcnow/Garmin-Card?style=for-the-badge&color=purple" alt="Version">
<img src="https://img.shields.io/badge/Home%20Assistant-2026.9%2B-41BDF5?style=for-the-badge" alt="Home Assistant 2026.9+">
<img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT license">
</p>

A fitness card for the Home Assistant Lovelace dashboard. It visualises the entities
created by the [Garmin Connect integration](https://github.com/cyberjunky/home-assistant-garmin_connect)
as animated progress rings (or bars) with optional goals, units and actions.

![Garmin Card layout](https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/garmin-card-layout.svg)

> The image above is a layout schematic. See the [examples](examples/) for ready to paste
> card configurations and a complete dashboard.

---

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Card options](#card-options)
- [Entity options](#entity-options)
- [Actions](#actions)
- [Layouts](#layouts)
- [Battery indicator](#battery-indicator)
- [Examples](#examples)
- [Dashboards and section sizing](#dashboards-and-section-sizing)
- [Migrating from fitbit-card](#migrating-from-fitbit-card)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Credits](#credits)

---

## Features

| | |
| --- | --- |
| **Animated rings** | Progress rings that animate from their previous value to the new one. |
| **Bars layout** | The same data as compact horizontal progress bars. |
| **Goal aware** | Take the maximum from another entity (`max_entity`) or from an attribute (`max_attribute`), so a ring fills up to your Garmin goal. |
| **Attributes** | Display any attribute instead of the state, e.g. the distance of your last activity. |
| **Header** | Optional header with a title, an optional battery indicator and compact entities. |
| **Actions** | `tap_action`, `hold_action` and `double_tap_action` per entity, including the modern `perform-action` config. |
| **Native formatting** | Values are formatted by Home Assistant itself, so your number format and per-entity display precision are respected. |
| **Garmin aware** | Detects the Garmin Connect integration through the device and entity registry for the card picker and the visual editor. |
| **No build step** | A single, dependency free JavaScript file. |

---

## Requirements

- Home Assistant **2026.9** or newer. Older versions keep working, but the newest
  formatting and card picker features need 2026.9.
- The [Garmin Connect](https://github.com/cyberjunky/home-assistant-garmin_connect)
  integration for the data, installed through HACS or manually.
- The card works with any numeric sensor, so template sensors are fine too.

Entity IDs are created from the entity name, so the examples use
`sensor.garmin_connect_<name>`, for example `sensor.garmin_connect_steps`. See
[examples/garmin-entities.md](examples/garmin-entities.md) for the full list.

---

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=acdcnow&repository=Garmin-Card&category=plugin)

1. Open HACS and go to **Dashboard** (plugins).
2. Select the three dot menu in the top right corner and choose **Custom repositories**.
3. Add `https://github.com/acdcnow/Garmin-Card` and select **Dashboard** as the category.
4. Search for **Garmin Card** in HACS and download it.
5. Hard refresh your browser (Ctrl + Shift + R) so the new resource is picked up.

HACS registers the resource automatically. If it does not, add it manually under
**Settings → Dashboards → Resources**:

```yaml
url: /hacsfiles/Garmin-Card/garmin-card.js
type: module
```

### Manual

1. Download `garmin-card.js` from the
   [latest release](https://github.com/acdcnow/Garmin-Card/releases/latest).
2. Copy it to `<config>/www/garmin-card.js`.
3. Add the resource under **Settings → Dashboards → Resources**:

```yaml
url: /local/garmin-card.js
type: module
```

4. Reload the browser (Ctrl + Shift + R).

---

## Quick start

The card is available in the card picker as **Garmin Card**. When the Garmin Connect
integration is configured, the picker prefills it with your steps, distance, calories and
intensity minutes, plus a header with resting heart rate, body battery and sleep score.
The visual editor then lets you fine tune everything.

A minimal manual configuration:

```yaml
type: custom:garmin-card
title: Markus
entities:
  - entity: sensor.garmin_connect_steps
    max_entity: sensor.garmin_connect_daily_step_goal
  - entity: sensor.garmin_connect_distance
    max: 10
  - entity: sensor.garmin_connect_calories
    max: 2500
```

---

## Card options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | string | **required** | `custom:garmin-card` |
| `entities` | list | `[]` | Entities shown as rings or bars. |
| `title` | string | *battery model / friendly name* | Title shown in the header. |
| `battery_entity` | string | – | Battery sensor shown next to the title. |
| `battery_colors` | map | – | Overrides the `high`, `medium` and `low` colors of the battery indicator. |
| `header` | boolean | `true` | Show or hide the whole header. |
| `header_entities` | list | `[]` | Compact entities shown on the right side of the header. |
| `show_units` | boolean | `false` | Show units for all body entities. |
| `show_units_header` | boolean | `false` | Show units for all header entities. |
| `max` | number | `100` | Global maximum used by body entities without their own maximum. |
| `layout` | string | `rings` | `rings` or `bars`. |
| `columns` | number | *auto* | Number of rings per row (1 – 6). |
| `ring_size` | number | `45` | Ring radius in pixels (24 – 80). |

---

## Entity options

`entities` and `header_entities` accept two forms:

```yaml
entities:
  - sensor.garmin_connect_steps          # short form
  - entity: sensor.garmin_connect_steps  # full form
    max_entity: sensor.garmin_connect_daily_step_goal
```

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `entity` | string | **required** | Entity id. |
| `attribute` | string | – | Show an attribute instead of the state. |
| `name` | string | *friendly name* | Label below the ring / in the bar. |
| `icon` | string | *entity icon* | Icon override (`mdi:run`). |
| `icon_color` | string | – | Accent color of the header icon, or the ring color for body entities. |
| `color` | string | – | Fixed ring / bar color. |
| `color_stops` | map | – | Color depending on the fill percentage, see [Colors](#colors). |
| `max` | number | *global `max`* | Maximum value for the ring. |
| `max_entity` | string | – | Take the maximum from another entity, e.g. your step goal. |
| `max_attribute` | string | – | Take the maximum from one of the entity's attributes, e.g. `goal`. |
| `show_units` | boolean | *card default* | Show the unit next to the value. |
| `units` | string | *unit of measurement* | Override the displayed unit. |
| `tap_action` | action | `more-info` | Action on tap. |
| `hold_action` | action | – | Action on press and hold. |
| `double_tap_action` | action | – | Action on double tap. |

### Goals and progress

Garmin exposes goals both as separate sensors and as attributes. The card supports both,
and the ring is scaled so that 100 % equals a full ring.

```yaml
type: custom:garmin-card
entities:
  # The goal is its own sensor entity
  - entity: sensor.garmin_connect_steps
    max_entity: sensor.garmin_connect_daily_step_goal

  - entity: sensor.garmin_connect_floors_ascended
    max_entity: sensor.garmin_connect_floors_ascended_goal

  - entity: sensor.garmin_connect_hydration
    max_entity: sensor.garmin_connect_hydration_goal

  # The goal is an attribute of the entity itself
  - entity: sensor.garmin_connect_intensity_minutes
    max_attribute: goal

  # No goal available: scale manually
  - entity: sensor.garmin_connect_sleep_score
    max: 100
```

The maximum is resolved in this order: `max` → `max_entity` → `max_attribute` → the
global `max` of the card.

### Reading an attribute instead of the state

Many Garmin sensors carry a whole object in their attributes, for example
`sensor.garmin_connect_last_activity` (name, distance, duration, activity type) or
`sensor.garmin_connect_blood_pressure_systolic` (diastolic, pulse).

```yaml
type: custom:garmin-card
title: Last activity
header_entities:
  - entity: sensor.garmin_connect_last_activity      # state = activity name
entities:
  - entity: sensor.garmin_connect_last_activity
    attribute: distance
    name: Distance
    units: km
    max: 10000
  - entity: sensor.garmin_connect_last_activity
    attribute: duration
    name: Duration
    units: s
    max: 7200
```

> Attribute values are formatted by Home Assistant as well, so an attribute holding a
> timestamp is rendered as a date/time and a numeric attribute uses the entity's display
> precision.

### Colors

Without a color the ring uses `--primary-color` (bars and header icons use
`--state-icon-color`). `color_stops` switches the color based on how full the ring is:

```yaml
entities:
  - entity: sensor.garmin_connect_body_battery
    max: 100
    color_stops:
      0: red
      30: orange
      60: green

  - entity: sensor.garmin_connect_steps
    max_entity: sensor.garmin_connect_daily_step_goal
    color: deepskyblue
```

Stops are inclusive: with `0/30/60` a fill of exactly 30 % is `orange`. Colors can be CSS
color names or hex values such as `'#14308D'`.

### Unit handling

Units come from the entity's `unit_of_measurement`. Use `units` to override the shown
unit (it does not convert the value) and `show_units` to toggle the unit per entity:

```yaml
show_units: false           # card default
entities:
  - entity: sensor.garmin_connect_steps
    units: k                # shown as "8,432 k"
    show_units: true
```

---

## Actions

Every entity accepts actions. `tap_action` defaults to `more-info`.

```yaml
entities:
  - entity: sensor.garmin_connect_steps
    tap_action:
      action: navigate
      navigation_path: /lovelace/fitness
    hold_action:
      action: url
      url_path: https://connect.garmin.com/modern/
  - entity: sensor.garmin_connect_last_activity
    double_tap_action:
      action: perform-action
      perform_action: garmin_connect.download_activity
      data:
        file_format: gpx
      target:
        entity_id: sensor.garmin_connect_last_activity
```

Supported actions are `more-info`, `toggle`, `navigate`, `url`, `perform-action`
(`call-service` with a `service` key works as well) and `none`. All actions support
`confirmation`.

---

## Layouts

```yaml
# Rings (default)
type: custom:garmin-card
layout: rings
columns: 3
ring_size: 45

# Horizontal bars, one row per entity
type: custom:garmin-card
layout: bars
```

More layout recipes: [examples/designs](examples/designs).

---

## Battery indicator

Point `battery_entity` at the battery sensor of your Garmin watch. Numeric percentages get
an automatic battery icon and turn yellow below 35 % and red below 15 %. String states
such as `High`, `Medium` and `Low` are supported as well.

```yaml
type: custom:garmin-card
battery_entity: sensor.fenix_7_battery
battery_colors:
  high: '#10A13C'
  medium: '#DEE023'
  low: '#DA3116'
```

---

## Examples

Ready to paste configurations, all based on real Garmin Connect entities:

| Example | What it shows |
| ------- | ------------- |
| [examples/cards](examples/cards) | One card per fitness topic: activity, sleep, heart rate, training readiness, body composition, hydration, nutrition, gear… |
| [examples/designs](examples/designs) | Layout and styling recipes: dense rings, bars, header only, themes. |
| [examples/dashboards](examples/dashboards) | A complete sections dashboard with all the cards together. |
| [examples/garmin-entities.md](examples/garmin-entities.md) | Every Garmin Connect entity with its default entity id and what it is good for. |

---

## Dashboards and section sizing

The card implements `getGridOptions()`, so it behaves nicely in the modern **sections**
dashboard view: six columns wide for up to two rings, nine columns for up to four rings
and full width for more. Override it per card with your own grid options:

```yaml
type: custom:garmin-card
grid_options:
  columns: 6
  rows: auto
entities:
  - entity: sensor.garmin_connect_steps
```

Picking a Garmin entity in the card picker also offers the card as a suggestion
(Home Assistant 2026.6+).

---

## Migrating from fitbit-card

The card was renamed from `fitbit-card` to `garmin-card`. Follow these steps:

1. Install **Garmin Card** through HACS, see [Installation](#installation).
2. Replace the resource URL with the new `/hacsfiles/Garmin-Card/garmin-card.js`.
3. In every dashboard, replace the card type `custom:fitbit-card` with
   `custom:garmin-card`.
4. Replace your Fitbit entity ids with the matching Garmin Connect entities, see
   [examples/garmin-entities.md](examples/garmin-entities.md).

All previous options (`battery_entity`, `header`, `header_entities`, `show_units`,
`show_units_header`, `entities`, `max`, plus the per entity options `max`, `color_stops`,
`show_units`, `units` and `icon_color`) keep working, so usually only the entity ids need
to be replaced.

---

## Troubleshooting

**The card does not appear in the picker.**
Reload the resource and hard refresh the browser (Ctrl + Shift + R). Check
**Settings → Dashboards → Resources** for an error state.

**A ring is always empty or full.**
The maximum is wrong. Use `max`, `max_entity` or `max_attribute`, and remember that the
value must be in the same unit as the maximum (`sensor.garmin_connect_distance` is in
meters, not kilometres).

**Entities show as `unavailable`.**
Garmin sensors are unavailable until your watch has synced to Garmin Connect and the
integration has polled. The card renders a placeholder ring in that case.

**I want to see the raw YAML the editor built.**
Open the dashboard editor → three dot menu on the card → **Show code editor**.

---

## Development

The card is a single, dependency free file: `dist/garmin-card.js`. There is no build step,
editing `dist/garmin-card.js` is enough.

```bash
npm install       # installs jsdom, used by the smoke test only
npm test          # runs test/smoke.test.js, a jsdom based render test
```

`test/smoke.test.js` boots the card inside jsdom with a fake `hass` object and checks
rendering, goal resolution, attribute handling, the editor and the config validation.

---

## Credits

- Originally based on [ljmerza/fitbit-card](https://github.com/ljmerza/fitbit-card) by
  Leonardo Merza. Thanks for the original card.
- Garmin data comes from
  [cyberjunky/home-assistant-garmin_connect](https://github.com/cyberjunky/home-assistant-garmin_connect).

## License

MIT
