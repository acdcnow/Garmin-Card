# Garmin Card for Home Assistant

<p align="center">
<img src="https://img.shields.io/github/v/release/acdcnow/Garmin-Card?style=for-the-badge&color=purple" alt="Version">
<img src="https://img.shields.io/badge/Home%20Assistant-2026.9%2B-41BDF5?style=for-the-badge" alt="Home Assistant 2026.9+">
<img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT license">
</p>

A fitness card for the Home Assistant Lovelace dashboard. It visualises the entities
created by the [Garmin Connect integration](https://github.com/cyberjunky/home-assistant-garmin_connect)
as animated progress rings (or bars) with optional goals, units and actions.

<img src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/everything.png" alt="Garmin Card with eight rings: steps, intensity minutes, last run, sleep score, hydration, training readiness, floors and duration">

> Every screenshot in this readme is rendered from the YAML in [`examples/`](examples) by the
> card itself, using [sample Garmin data](docs/preview) and a metric unit system.

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
- [Examples and previews](#examples-and-previews)
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
    units: m           # attributes have no unit of their own
    max: 10000         # meters
  - entity: sensor.garmin_connect_last_activity
    attribute: duration
    name: Duration
    units: s
    max: 7200
    show_units: true
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

Units come from the entity's `unit_of_measurement`. For an attribute, which has no unit of
its own, provide one with `units`. `show_units` toggles the unit per entity:

```yaml
show_units: false           # card default
entities:
  - entity: sensor.garmin_connect_last_activity
    attribute: duration
    name: Duration
    units: s                # the attribute carries no unit
    max: 7200
    show_units: true        # "2,410 s"
```

> **`units` is a label, it does not convert the value.** A value of `6420` (meters)
> labelled `km` reads "6,420 km". Home Assistant converts the value for you when the entity
> has a unit and a device class, so pick the display unit in **Settings → Devices &
> services → Entities → ⚙ → Unit of measurement** and the card follows it. For plain
> attributes, use a template sensor if you need the value in another unit.
>
> **`max` is always compared against the raw state**, and Home Assistant keeps the state in
> the entity's base unit. `sensor.garmin_connect_distance` is in meters, so a 10 km goal is
> `max: 10000` even when the card displays "6.42 km". The same applies to `max_entity`
> (`sensor.garmin_connect_daily_step_goal` is in steps, `…hydration_goal` in millilitres).

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

The anatomy of both layouts:

![Garmin Card layout schematic](https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/garmin-card-layout.svg)

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

## Examples and previews

Every image below is rendered from the YAML files in this repository by the card itself,
using [sample Garmin data and a metric unit system](docs/preview). Ready to paste:

| Folder | What it shows |
| ------ | ------------- |
| [examples/cards](examples/cards) | One card per fitness topic: activity, sleep, heart rate, training readiness, body composition, hydration, nutrition, gear… |
| [examples/designs](examples/designs) | Layout and styling recipes: dense rings, bars, header only, themes. |
| [examples/dashboards](examples/dashboards) | Two complete dashboards, a sections view and a masonry view. |
| [examples/garmin-entities.md](examples/garmin-entities.md) | Every Garmin Connect entity with its default entity id and what it is good for. |

### Dashboards

[`fitness-dashboard.yaml`](examples/dashboards/fitness-dashboard.yaml) — the modern
**sections** view, four sections with headings:

<img src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/fitness-dashboard.png" alt="Sections dashboard with Today, Sleep, Training and Body sections">

[`masonry-dashboard.yaml`](examples/dashboards/masonry-dashboard.yaml) — the classic
**masonry** layout for a wall tablet:

<img src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/masonry-dashboard.png" alt="Masonry dashboard with activity, sleep, training and hydration cards">

### Example cards

| | | |
| --- | --- | --- |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/minimal.png" alt="Minimal card"><br>[01 · Minimal](examples/cards/01-minimal.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/daily-activity.png" alt="Daily activity card"><br>[02 · Daily activity](examples/cards/02-daily-activity.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/steps-and-goals.png" alt="Steps and goals card"><br>[03 · Steps and goals](examples/cards/03-steps-and-goals.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/sleep.png" alt="Sleep card"><br>[04 · Sleep](examples/cards/04-sleep.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/heart-hrv-spo2.png" alt="Heart rate, HRV and SpO2 card"><br>[05 · Heart, HRV, SpO2](examples/cards/05-heart-hrv-spo2.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/body-battery-and-stress.png" alt="Body battery and stress card"><br>[06 · Battery and stress](examples/cards/06-body-battery-and-stress.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/training-readiness.png" alt="Training readiness card"><br>[07 · Training readiness](examples/cards/07-training-readiness.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/body-composition.png" alt="Body composition card"><br>[08 · Body composition](examples/cards/08-body-composition.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/hydration-and-nutrition.png" alt="Hydration and nutrition card"><br>[09 · Hydration and nutrition](examples/cards/09-hydration-and-nutrition.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/last-activity.png" alt="Last activity card"><br>[10 · Last activity](examples/cards/10-last-activity.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/goals-and-badges.png" alt="Goals and badges card"><br>[11 · Goals and badges](examples/cards/11-goals-and-badges.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/health-and-blood-pressure.png" alt="Health and blood pressure card"><br>[12 · Health and blood pressure](examples/cards/12-health-and-blood-pressure.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/gear-and-battery.png" alt="Gear and battery card"><br>[13 · Gear and battery](examples/cards/13-gear-and-battery.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/everything.png" alt="All options in one card"><br>[14 · Everything at once](examples/cards/14-everything.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/everything-dark.png" alt="The same card in a dark theme"><br>[dark theme](examples/cards/14-everything.yaml) |

### Designs

| | | |
| --- | --- | --- |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/rings-auto-columns.png" alt="Rings with automatic columns"><br>[Automatic columns](examples/designs/rings-auto-columns.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/rings-dense.png" alt="Six dense rings"><br>[Dense rings](examples/designs/rings-dense.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/rings-wide.png" alt="Eight rings, four per row"><br>[Wide, four per row](examples/designs/rings-wide.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/bars.png" alt="Bars layout"><br>[Bars layout](examples/designs/bars.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/compact-tile.png" alt="Compact tile for a section"><br>[Compact tile](examples/designs/compact-tile.yaml) | <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/header-first.png" alt="Header first design"><br>[Header first](examples/designs/header-first.yaml) |
| <img width="220" src="https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/preview/colors-and-themes.png" alt="Colors and themes"><br>[Colors and themes](examples/designs/colors-and-themes.yaml) | | |

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

[`docs/preview`](docs/preview) contains the harness that renders the screenshots in this
readme from the example YAML, so they cannot go stale unnoticed.

---

## Credits

- Originally based on [ljmerza/fitbit-card](https://github.com/ljmerza/fitbit-card) by
  Leonardo Merza. Thanks for the original card.
- Garmin data comes from
  [cyberjunky/home-assistant-garmin_connect](https://github.com/cyberjunky/home-assistant-garmin_connect).

## License

MIT
