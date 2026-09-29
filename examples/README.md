# Garmin Card examples

Every file in this folder is ready to paste into a dashboard. Open the dashboard
editor, choose **Add card → Manual** (or the three dot menu → **Show code editor**) and
paste the YAML.

| Folder | Content |
| ------ | ------- |
| [`cards/`](cards) | One card per fitness topic, from a minimal example to nutrition and gear. |
| [`designs/`](designs) | Layout and styling recipes: dense rings, bars, compact tiles, themed colors. |
| [`dashboards/`](dashboards) | Complete dashboards that combine several cards. |
| [`garmin-entities.md`](garmin-entities.md) | Reference of every entity the Garmin Connect integration creates. |

## Before you paste

The entity ids in these examples follow the default naming of the
[Garmin Connect integration](https://github.com/cyberjunky/home-assistant-garmin_connect):

```
sensor.garmin_connect_<entity name>
e.g.  sensor.garmin_connect_steps, sensor.garmin_connect_sleep_score
```

If you renamed the device or the entities, use your own ids. The fastest way to find
them is **Developer tools → States** and searching for `garmin_connect`, or
**Settings → Devices & services → Garmin Connect → Entities**.

The card itself also helps: add it through the card picker, and the stub configuration is
prefilled with the Garmin entities it detected.

## The patterns the examples use

```yaml
# 1. A ring that fills up to a goal that lives in its own sensor
- entity: sensor.garmin_connect_steps
  max_entity: sensor.garmin_connect_daily_step_goal

# 2. A ring that fills up to a goal that lives in an attribute
- entity: sensor.garmin_connect_intensity_minutes
  max_attribute: goal

# 3. A ring that reads an attribute instead of the state
- entity: sensor.garmin_connect_last_activity
  attribute: distance
  name: Last run
  max: 10000

# 4. A score ring with a fixed maximum and colors by fill level
- entity: sensor.garmin_connect_sleep_score
  max: 100
  color_stops:
    0: red
    60: orange
    80: green

# 5. A compact header entity that is not a ring
header_entities:
  - entity: sensor.garmin_connect_resting_heart_rate
    show_units: true
```
