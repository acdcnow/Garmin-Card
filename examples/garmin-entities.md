# Garmin Connect entities and how to use them

Reference of the entities created by the
[Garmin Connect integration](https://github.com/cyberjunky/home-assistant-garmin_connect)
(130+ sensors) and how they are best displayed with Garmin Card.

## How the entity ids are built

All sensors are attached to one **Garmin Connect** device and the ids follow

```
sensor.garmin_connect_<slug of the entity name>
```

| Entity name | Default entity id |
| ----------- | ----------------- |
| Steps | `sensor.garmin_connect_steps` |
| Sleep score | `sensor.garmin_connect_sleep_score` |
| Blood pressure systolic | `sensor.garmin_connect_blood_pressure_systolic` |

If you renamed the device or an entity, the ids change. Search for `garmin_connect` in
**Developer tools → States**.

The **Type** column tells you how the entity works best in the card:

| Type | Meaning |
| ---- | ------- |
| **goal** | Has a matching goal sensor → use `max_entity` |
| **ring** | A score or value with a natural maximum (`100`, `%`, minutes…) → use `max` |
| **header** | A single reading that looks better as a compact header entity |
| **attribute** | Carries a useful object in its attributes → use `attribute` |

---

## Activity and steps

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Steps | `sensor.garmin_connect_steps` | steps | goal | `max_entity: sensor.garmin_connect_daily_step_goal` |
| Daily step goal | `sensor.garmin_connect_daily_step_goal` | steps | – | Only used as a maximum |
| Distance | `sensor.garmin_connect_distance` | m | ring | Value is in **meters**; use `max: 10000` for a 10 km ring |
| Yesterday steps | `sensor.garmin_connect_yesterday_steps` | steps | header | |
| Yesterday distance | `sensor.garmin_connect_yesterday_distance` | m | header | |
| Weekly step average | `sensor.garmin_connect_weekly_step_average` | steps | header | |
| Weekly distance average | `sensor.garmin_connect_weekly_distance_average` | m | header | |
| Floors ascended | `sensor.garmin_connect_floors_ascended` | – | goal | `max_entity: sensor.garmin_connect_floors_ascended_goal` |
| Floors ascended goal | `sensor.garmin_connect_floors_ascended_goal` | – | – | Only used as a maximum |
| Floors descended | `sensor.garmin_connect_floors_descended` | – | header | |
| Floors ascended distance | `sensor.garmin_connect_floors_ascended_distance` | m | header | |

## Calories

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Calories | `sensor.garmin_connect_calories` | kcal | ring | `max: 2500` |
| Active calories | `sensor.garmin_connect_active_calories` | kcal | ring | `max: 1000` |
| BMR calories | `sensor.garmin_connect_bmr_calories` | kcal | header | |
| Burned / consumed / remaining calories | `sensor.garmin_connect_burned_calories`, `…_consumed_calories`, `…_remaining_calories` | kcal | ring | `remaining_calories` as a ring toward `0` |

## Heart rate

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Resting heart rate | `sensor.garmin_connect_resting_heart_rate` | bpm | header | The classic header entity |
| Min / Max heart rate | `sensor.garmin_connect_min_heart_rate`, `…_max_heart_rate` | bpm | header | |
| 7-day average resting heart rate | `sensor.garmin_connect_7_day_average_resting_heart_rate` | bpm | header | |
| Min / Max average heart rate | `sensor.garmin_connect_min_avg_heart_rate`, `…_max_avg_heart_rate` | bpm | header | |
| Abnormal heart rate alerts | `sensor.garmin_connect_abnormal_heart_rate_alerts` | – | header | |

## HRV (heart rate variability)

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| HRV status | `sensor.garmin_connect_hrv_status` | – | header | Text state (`balanced`, `low`, …) |
| HRV weekly average | `sensor.garmin_connect_hrv_weekly_average` | ms | ring | `max: 100` |
| HRV last night average | `sensor.garmin_connect_hrv_last_night_average` | ms | ring | `max: 100` |
| HRV last night 5-min high | `sensor.garmin_connect_hrv_last_night_5min_high` | ms | header | |
| HRV baseline | `sensor.garmin_connect_hrv_baseline` | ms | header | `attribute: baseline_low_upper` also available |

## Stress and recovery

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Average stress level | `sensor.garmin_connect_average_stress_level` | – | ring | `max: 100`, `color_stops` inverted colors |
| Max stress level | `sensor.garmin_connect_max_stress_level` | – | header | |
| Stress qualifier | `sensor.garmin_connect_stress_qualifier` | – | header | Text state |
| Stress duration | `sensor.garmin_connect_stress_duration` | min | ring | `max: 720` (12 h) |
| Rest stress duration | `sensor.garmin_connect_rest_stress_duration` | min | ring | |
| Activity stress duration | `sensor.garmin_connect_activity_stress_duration` | min | ring | |
| Low / Medium / High stress duration | `sensor.garmin_connect_low_stress_duration`, `…_medium_stress_duration`, `…_high_stress_duration` | min | ring | Good candidates for `color_stops` |

## Sleep

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Sleep score | `sensor.garmin_connect_sleep_score` | – | ring | `max: 100`, `color_stops: {0: red, 60: orange, 80: green}` |
| Sleep need | `sensor.garmin_connect_sleep_need` | min | – | Use as `max_entity` for the sleep duration ring |
| Sleep duration | `sensor.garmin_connect_sleep_duration` | min | goal | `max_entity: sensor.garmin_connect_sleep_need` |
| Total sleep duration | `sensor.garmin_connect_total_sleep_duration` | min | ring | Time in bed |
| Awake time | `sensor.garmin_connect_awake_time` | min | ring | |
| Deep / Light / REM sleep | `sensor.garmin_connect_deep_sleep`, `…_light_sleep`, `…_rem_sleep` | min | ring | `max: 120`, `max: 300`, `max: 120` |
| Nap time | `sensor.garmin_connect_nap_time` | min | header | |
| Bedtime / Wake time | `sensor.garmin_connect_bedtime`, `…_wake_time` | timestamp | header | Rendered as a time by Home Assistant |
| Optimal bedtime / wake time | `sensor.garmin_connect_optimal_bedtime`, `…_optimal_wake_time` | timestamp | header | |
| Unmeasurable sleep | `sensor.garmin_connect_unmeasurable_sleep` | min | header | |

## Body battery

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Body battery | `sensor.garmin_connect_body_battery` | % | ring | `max: 100` |
| Body battery charged | `sensor.garmin_connect_body_battery_charged` | – | header | |
| Body battery drained | `sensor.garmin_connect_body_battery_drained` | – | header | |
| Body battery highest / lowest | `sensor.garmin_connect_body_battery_highest`, `…_lowest` | – | header | |

## Training and fitness

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Training readiness | `sensor.garmin_connect_training_readiness` | % | ring | `max: 100` |
| Morning training readiness | `sensor.garmin_connect_morning_training_readiness` | % | ring | Attributes: `level`, `sleep_score`, `recovery_score`, `hrv_status`, `acuteLoad` |
| Training status | `sensor.garmin_connect_training_status` | – | header | Text state (`productive`, …) |
| Recovery time | `sensor.garmin_connect_recovery_time` | min | ring | `max: 1440` |
| VO2 Max | `sensor.garmin_connect_vo2_max` | mL/(kg·min) | ring | `max: 60` |
| Endurance score | `sensor.garmin_connect_endurance_score` | – | ring | `max: 10000` in practice, use `max: 5000` |
| Hill score | `sensor.garmin_connect_hill_score` | – | ring | `max: 100` |
| Fitness age | `sensor.garmin_connect_fitness_age` | years | header | Also `…_achievable_fitness_age`, `…_previous_fitness_age`, `…_chronological_age` |
| Lactate threshold heart rate | `sensor.garmin_connect_lactate_threshold_heart_rate` | bpm | header | |
| Power to weight / FTP | dynamic per sport, e.g. `sensor.garmin_connect_power_to_weight_running` | W/kg, W | header | Created for each sport in your data |

## Body composition

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Weight | `sensor.garmin_connect_weight` | kg | ring | `max` around your range, e.g. `90` |
| BMI | `sensor.garmin_connect_bmi` | – | ring | `max: 35` |
| Body fat | `sensor.garmin_connect_body_fat` | % | ring | `max: 40` |
| Body water | `sensor.garmin_connect_body_water` | % | ring | `max: 70` |
| Muscle mass | `sensor.garmin_connect_muscle_mass` | kg | ring | `max: 45` |
| Bone mass | `sensor.garmin_connect_bone_mass` | kg | header | |
| Visceral fat | `sensor.garmin_connect_visceral_fat` | – | header | |
| Metabolic age | `sensor.garmin_connect_metabolic_age` | years | header | |
| Physique rating | `sensor.garmin_connect_physique_rating` | – | header | |

## Hydration

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Hydration | `sensor.garmin_connect_hydration` | ml | goal | `max_entity: sensor.garmin_connect_hydration_goal` |
| Hydration goal | `sensor.garmin_connect_hydration_goal` | ml | – | Only used as a maximum |
| Hydration daily average | `sensor.garmin_connect_hydration_daily_average` | ml | header | |
| Hydration sweat loss | `sensor.garmin_connect_hydration_sweat_loss` | ml | header | |
| Hydration activity intake | `sensor.garmin_connect_hydration_activity_intake` | ml | header | |

## Intensity minutes

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Intensity minutes | `sensor.garmin_connect_intensity_minutes` | min | goal | `max_attribute: goal` (attributes: `moderate_minutes`, `vigorous_minutes`, `goal`) |
| Intensity minutes goal | `sensor.garmin_connect_intensity_minutes_goal` | min | – | Alternative to `max_attribute: goal` |
| Moderate intensity minutes | `sensor.garmin_connect_moderate_intensity_minutes` | min | ring | |
| Vigorous intensity minutes | `sensor.garmin_connect_vigorous_intensity_minutes` | min | ring | |

## Health monitoring

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Latest SpO2 | `sensor.garmin_connect_latest_spo2` | % | ring | `max: 100` |
| Average SpO2 | `sensor.garmin_connect_average_spo2` | % | header | |
| Lowest SpO2 | `sensor.garmin_connect_lowest_spo2` | % | header | Attribute `calibration_days` on the skin temperature sensor |
| Latest respiration | `sensor.garmin_connect_latest_respiration` | brpm | ring | `max: 25` |
| Average sleep respiration | `sensor.garmin_connect_average_sleep_respiration` | brpm | header | |
| Skin temperature change | `sensor.garmin_connect_skin_temperature_change` | °C | header | Delta value, keep it in the header |

## Goals and achievements

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Active goals | `sensor.garmin_connect_active_goals` | – | ring | Attributes contain all goals with `progressPercent` |
| Future goals | `sensor.garmin_connect_future_goals` | – | header | |
| Goals history | `sensor.garmin_connect_goals_history` | – | header | |
| Badges | `sensor.garmin_connect_badges` | – | header | Attributes list every badge |
| User points | `sensor.garmin_connect_user_points` | – | ring | `max` from your level |
| User level | `sensor.garmin_connect_user_level` | – | header | |

## Activity tracking

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Last activity | `sensor.garmin_connect_last_activity` | – | attribute | Attributes: `activityId`, `distance`, `duration`, `activityType`, `startTime`… |
| Last activities | `sensor.garmin_connect_last_activities` | – | attribute | `last_activities` list |
| Last workout | `sensor.garmin_connect_last_workout` | – | header | |
| Next scheduled workout | `sensor.garmin_connect_next_scheduled_workout` | – | header | |
| Today's scheduled workout | `sensor.garmin_connect_today_s_scheduled_workout` | – | header | The apostrophe makes this id awkward, check Developer tools |
| Training plan goal event | `sensor.garmin_connect_training_plan_goal_event` | – | ring | Attribute `days_until_event` as a countdown ring |
| Last activity route | `sensor.garmin_connect_last_activity_route` | – | attribute | `polyline` attribute, use the integration's map card |
| Last synced | `sensor.garmin_connect_last_synced` | timestamp | header | Good for a "data is fresh" check |

## Blood pressure

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Blood pressure systolic | `sensor.garmin_connect_blood_pressure_systolic` | mmHg | attribute | Attributes `diastolic`, `pulse` |
| Blood pressure diastolic | `sensor.garmin_connect_blood_pressure_diastolic` | mmHg | ring | `max: 150` |
| Blood pressure pulse | `sensor.garmin_connect_blood_pressure_pulse` | bpm | header | |
| Blood pressure category | `sensor.garmin_connect_blood_pressure_category` | – | header | |

## Nutrition (requires Garmin Connect+)

Disabled by default, enable them in the entity settings.

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Nutrition consumed calories | `sensor.garmin_connect_nutrition_consumed_calories` | kcal | goal | `max_entity: sensor.garmin_connect_nutrition_calorie_goal` |
| Nutrition consumed protein | `sensor.garmin_connect_nutrition_consumed_protein` | g | goal | `max_entity: sensor.garmin_connect_nutrition_protein_goal` |
| Nutrition consumed carbohydrates | `sensor.garmin_connect_nutrition_consumed_carbohydrates` | g | goal | `max_entity: sensor.garmin_connect_nutrition_carbohydrates_goal` |
| Nutrition consumed fat | `sensor.garmin_connect_nutrition_consumed_fat` | g | goal | `max_entity: sensor.garmin_connect_nutrition_fat_goal` |
| Nutrition remaining calories | `sensor.garmin_connect_nutrition_remaining_calories` | kcal | header | |
| Nutrition logged entries | `sensor.garmin_connect_nutrition_logged_entries` | – | header | |
| Nutrition last logged | `sensor.garmin_connect_nutrition_last_logged` | timestamp | header | |

## Gear, devices and solar

| Entity | Default entity id | Unit | Type | Card tip |
| ------ | ----------------- | ---- | ---- | -------- |
| Devices | `sensor.garmin_connect_devices` | – | header | Attributes list every registered device |
| Connected sensors | `sensor.garmin_connect_connected_sensors` | – | header | ANT+/BLE sensors with battery status |
| Solar intensity | `sensor.garmin_connect_solar_intensity` | % | ring | `max: 100` |
| Average solar intensity | `sensor.garmin_connect_average_solar_intensity` | % | header | |
| Solar time gained | `sensor.garmin_connect_solar_time_gained` | min | header | |
| Gear (dynamic) | e.g. `sensor.garmin_connect_my_running_shoes` | m | ring | Total distance of that piece of gear, `max` from its `maximum_meters` attribute |

## Menstrual cycle (disabled by default)

`sensor.garmin_connect_menstrual_cycle_day`, `…_menstrual_cycle_phase`,
`…_menstrual_cycle_type`, `…_menstrual_cycle_start`, `…_menstrual_period_length`,
`…_menstrual_days_until_next_phase`, `…_menstrual_fertile_window_start`,
`…_menstrual_fertile_window_end`, `…_menstrual_next_predicted_cycle_start`.

Use the cycle day with a ring (`max: 28`) and the phase as a header entity.

---

> Every entity above also exposes the standard Home Assistant attributes, so
> `attribute:` works on all of them (`last_updated`, `unit_of_measurement`, `icon`…).
