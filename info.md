# Garmin Card

Show your Garmin Connect fitness data in Home Assistant: animated activity rings,
daily goals, sleep, body battery, stress, training readiness, body composition and
more.

![Garmin Card layout](https://raw.githubusercontent.com/acdcnow/Garmin-Card/master/docs/garmin-card-layout.svg)

## Installation

### HACS

1. Open HACS and go to **Dashboard** (plugins).
2. Three dot menu → **Custom repositories**.
3. Add `https://github.com/acdcnow/Garmin-Card` with category **Dashboard**.
4. Download **Garmin Card** and hard refresh your browser.

### Manual

Copy `garmin-card.js` to `<config>/www/` and add it as a resource
(**Settings → Dashboards → Resources**):

```yaml
url: /local/garmin-card.js
type: module
```

## Requirements

- Home Assistant 2026.9 or newer.
- The [Garmin Connect integration](https://github.com/cyberjunky/home-assistant-garmin_connect)
  for the data.

## Configuration

```yaml
type: custom:garmin-card
title: Markus
battery_entity: sensor.fenix_7_battery
header_entities:
  - entity: sensor.garmin_connect_resting_heart_rate
  - entity: sensor.garmin_connect_body_battery
  - entity: sensor.garmin_connect_sleep_score
entities:
  # rings that fill up to your Garmin goals
  - entity: sensor.garmin_connect_steps
    max_entity: sensor.garmin_connect_daily_step_goal
  - entity: sensor.garmin_connect_intensity_minutes
    max_attribute: goal
  - entity: sensor.garmin_connect_floors_ascended
    max_entity: sensor.garmin_connect_floors_ascended_goal
  # and a ring that reads an attribute
  - entity: sensor.garmin_connect_last_activity
    attribute: distance
    name: Last run
    units: km
    max: 10
    show_units: true
```

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `type` | string | **required** | `custom:garmin-card`
| `entities` | list | `[]` | Entities shown as rings or bars
| `title` | string | – | Title shown in the header
| `battery_entity` | string | – | Battery sensor shown next to the title
| `battery_colors` | map | – | `high`, `medium`, `low` colors of the battery indicator
| `header` | boolean | `true` | Show/hide the header
| `header_entities` | list | `[]` | Compact entities in the header
| `show_units` | boolean | `false` | Show units for all body entities
| `show_units_header` | boolean | `false` | Show units for all header entities
| `max` | number | `100` | Global maximum for body entities
| `layout` | string | `rings` | `rings` or `bars`
| `columns` | number | *auto* | Rings per row (1 – 6)
| `ring_size` | number | `45` | Ring radius in pixels (24 – 80)

### Entity options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `entity` | string | **required** | Entity id
| `attribute` | string | – | Show an attribute instead of the state
| `name` | string | *friendly name* | Label override
| `icon` | string | *entity icon* | Icon override
| `icon_color` | string | – | Accent / ring color
| `color` | string | – | Fixed ring color
| `color_stops` | map | – | Color by fill percentage, e.g. `0: red, 60: green`
| `max` | number | *global `max`* | Maximum value
| `max_entity` | string | – | Maximum from another entity (goal sensor)
| `max_attribute` | string | – | Maximum from an attribute, e.g. `goal`
| `show_units` | boolean | *card default* | Show the unit
| `units` | string | *unit of measurement* | Unit override
| `tap_action` / `hold_action` / `double_tap_action` | action | `more-info` on tap | Actions

Full documentation, examples and a dashboard in the
[repository](https://github.com/acdcnow/Garmin-Card).
