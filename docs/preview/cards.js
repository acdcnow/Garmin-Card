/**
 * Generated from the example YAML files by the preview generator.
 * Contains the card configuration of every example plus a realistic fake
 * `hass` state set, so the preview harness can render the examples with the
 * real card code.
 *
 * Cards: 21, dashboards: 2, states: 136
 */
window.PREVIEW_STATES = {
 "sensor.garmin_connect_steps": {
  "entity_id": "sensor.garmin_connect_steps",
  "state": "8432",
  "attributes": {
   "friendly_name": "Steps",
   "state_class": "total_increasing",
   "unit_of_measurement": "steps",
   "icon": "mdi:walk"
  }
 },
 "sensor.garmin_connect_daily_step_goal": {
  "entity_id": "sensor.garmin_connect_daily_step_goal",
  "state": "10000",
  "attributes": {
   "friendly_name": "Daily step goal",
   "unit_of_measurement": "steps",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_distance": {
  "entity_id": "sensor.garmin_connect_distance",
  "state": "6420",
  "attributes": {
   "friendly_name": "Distance",
   "device_class": "distance",
   "unit_of_measurement": "m"
  }
 },
 "sensor.garmin_connect_yesterday_steps": {
  "entity_id": "sensor.garmin_connect_yesterday_steps",
  "state": "11250",
  "attributes": {
   "friendly_name": "Yesterday steps",
   "unit_of_measurement": "steps",
   "icon": "mdi:walk"
  }
 },
 "sensor.garmin_connect_yesterday_distance": {
  "entity_id": "sensor.garmin_connect_yesterday_distance",
  "state": "8640",
  "attributes": {
   "friendly_name": "Yesterday distance",
   "device_class": "distance",
   "unit_of_measurement": "m"
  }
 },
 "sensor.garmin_connect_weekly_step_average": {
  "entity_id": "sensor.garmin_connect_weekly_step_average",
  "state": "9120",
  "attributes": {
   "friendly_name": "Weekly step average",
   "unit_of_measurement": "steps",
   "icon": "mdi:walk"
  }
 },
 "sensor.garmin_connect_weekly_distance_avg": {
  "entity_id": "sensor.garmin_connect_weekly_distance_avg",
  "state": "7240",
  "attributes": {
   "friendly_name": "Weekly distance average",
   "device_class": "distance",
   "unit_of_measurement": "m"
  }
 },
 "sensor.garmin_connect_floors_ascended": {
  "entity_id": "sensor.garmin_connect_floors_ascended",
  "state": "12",
  "attributes": {
   "friendly_name": "Floors ascended",
   "unit_of_measurement": "floors",
   "icon": "mdi:stairs-up"
  }
 },
 "sensor.garmin_connect_floors_ascended_goal": {
  "entity_id": "sensor.garmin_connect_floors_ascended_goal",
  "state": "20",
  "attributes": {
   "friendly_name": "Floors ascended goal",
   "unit_of_measurement": "floors",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_floors_descended": {
  "entity_id": "sensor.garmin_connect_floors_descended",
  "state": "9",
  "attributes": {
   "friendly_name": "Floors descended",
   "unit_of_measurement": "floors",
   "icon": "mdi:stairs-down"
  }
 },
 "sensor.garmin_connect_calories": {
  "entity_id": "sensor.garmin_connect_calories",
  "state": "1834",
  "attributes": {
   "friendly_name": "Calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:fire"
  }
 },
 "sensor.garmin_connect_active_calories": {
  "entity_id": "sensor.garmin_connect_active_calories",
  "state": "780",
  "attributes": {
   "friendly_name": "Active calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:fire"
  }
 },
 "sensor.garmin_connect_bmr_calories": {
  "entity_id": "sensor.garmin_connect_bmr_calories",
  "state": "1054",
  "attributes": {
   "friendly_name": "BMR calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:fire"
  }
 },
 "sensor.garmin_connect_burned_calories": {
  "entity_id": "sensor.garmin_connect_burned_calories",
  "state": "1834",
  "attributes": {
   "friendly_name": "Burned calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:fire"
  }
 },
 "sensor.garmin_connect_consumed_calories": {
  "entity_id": "sensor.garmin_connect_consumed_calories",
  "state": "1420",
  "attributes": {
   "friendly_name": "Consumed calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:food-apple"
  }
 },
 "sensor.garmin_connect_remaining_calories": {
  "entity_id": "sensor.garmin_connect_remaining_calories",
  "state": "366",
  "attributes": {
   "friendly_name": "Remaining calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:food-apple"
  }
 },
 "sensor.garmin_connect_resting_heart_rate": {
  "entity_id": "sensor.garmin_connect_resting_heart_rate",
  "state": "48",
  "attributes": {
   "friendly_name": "Resting heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_min_heart_rate": {
  "entity_id": "sensor.garmin_connect_min_heart_rate",
  "state": "44",
  "attributes": {
   "friendly_name": "Min heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-outline"
  }
 },
 "sensor.garmin_connect_max_heart_rate": {
  "entity_id": "sensor.garmin_connect_max_heart_rate",
  "state": "152",
  "attributes": {
   "friendly_name": "Max heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart"
  }
 },
 "sensor.garmin_connect_7_day_average_resting_heart_rate": {
  "entity_id": "sensor.garmin_connect_7_day_average_resting_heart_rate",
  "state": "50",
  "attributes": {
   "friendly_name": "7-day average resting heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_min_avg_heart_rate": {
  "entity_id": "sensor.garmin_connect_min_avg_heart_rate",
  "state": "62",
  "attributes": {
   "friendly_name": "Min average heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-outline"
  }
 },
 "sensor.garmin_connect_max_avg_heart_rate": {
  "entity_id": "sensor.garmin_connect_max_avg_heart_rate",
  "state": "128",
  "attributes": {
   "friendly_name": "Max average heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart"
  }
 },
 "sensor.garmin_connect_abnormal_heart_rate_alerts": {
  "entity_id": "sensor.garmin_connect_abnormal_heart_rate_alerts",
  "state": "0",
  "attributes": {
   "friendly_name": "Abnormal heart rate alerts",
   "state_class": "measurement",
   "icon": "mdi:alert"
  }
 },
 "sensor.garmin_connect_hrv_status": {
  "entity_id": "sensor.garmin_connect_hrv_status",
  "state": "balanced",
  "attributes": {
   "friendly_name": "HRV status",
   "icon": "mdi:heart-flash"
  }
 },
 "sensor.garmin_connect_hrv_weekly_average": {
  "entity_id": "sensor.garmin_connect_hrv_weekly_average",
  "state": "58",
  "attributes": {
   "friendly_name": "HRV weekly average",
   "unit_of_measurement": "ms",
   "icon": "mdi:heart-flash"
  }
 },
 "sensor.garmin_connect_hrv_last_night_average": {
  "entity_id": "sensor.garmin_connect_hrv_last_night_average",
  "state": "62",
  "attributes": {
   "friendly_name": "HRV last night average",
   "unit_of_measurement": "ms",
   "icon": "mdi:heart-flash"
  }
 },
 "sensor.garmin_connect_hrv_last_night_5min_high": {
  "entity_id": "sensor.garmin_connect_hrv_last_night_5min_high",
  "state": "88",
  "attributes": {
   "friendly_name": "HRV last night 5-min high",
   "unit_of_measurement": "ms",
   "icon": "mdi:heart-flash"
  }
 },
 "sensor.garmin_connect_hrv_baseline": {
  "entity_id": "sensor.garmin_connect_hrv_baseline",
  "state": "70",
  "attributes": {
   "friendly_name": "HRV baseline",
   "baseline": {
    "lowUpper": 42,
    "balancedLow": 44,
    "balancedUpper": 66
   },
   "unit_of_measurement": "ms",
   "icon": "mdi:heart-flash"
  }
 },
 "sensor.garmin_connect_average_stress_level": {
  "entity_id": "sensor.garmin_connect_average_stress_level",
  "state": "32",
  "attributes": {
   "friendly_name": "Average stress level",
   "state_class": "measurement",
   "icon": "mdi:emoticon-outline"
  }
 },
 "sensor.garmin_connect_max_stress_level": {
  "entity_id": "sensor.garmin_connect_max_stress_level",
  "state": "78",
  "attributes": {
   "friendly_name": "Max stress level",
   "state_class": "measurement",
   "icon": "mdi:emoticon-outline"
  }
 },
 "sensor.garmin_connect_stress_qualifier": {
  "entity_id": "sensor.garmin_connect_stress_qualifier",
  "state": "balanced",
  "attributes": {
   "friendly_name": "Stress qualifier",
   "icon": "mdi:emoticon-outline"
  }
 },
 "sensor.garmin_connect_stress_duration": {
  "entity_id": "sensor.garmin_connect_stress_duration",
  "state": "210",
  "attributes": {
   "friendly_name": "Stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:emoticon-outline"
  }
 },
 "sensor.garmin_connect_rest_stress_duration": {
  "entity_id": "sensor.garmin_connect_rest_stress_duration",
  "state": "420",
  "attributes": {
   "friendly_name": "Rest stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:emoticon-happy-outline"
  }
 },
 "sensor.garmin_connect_activity_stress_duration": {
  "entity_id": "sensor.garmin_connect_activity_stress_duration",
  "state": "90",
  "attributes": {
   "friendly_name": "Activity stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:run"
  }
 },
 "sensor.garmin_connect_low_stress_duration": {
  "entity_id": "sensor.garmin_connect_low_stress_duration",
  "state": "120",
  "attributes": {
   "friendly_name": "Low stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:emoticon-happy-outline"
  }
 },
 "sensor.garmin_connect_medium_stress_duration": {
  "entity_id": "sensor.garmin_connect_medium_stress_duration",
  "state": "70",
  "attributes": {
   "friendly_name": "Medium stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:emoticon-neutral-outline"
  }
 },
 "sensor.garmin_connect_high_stress_duration": {
  "entity_id": "sensor.garmin_connect_high_stress_duration",
  "state": "20",
  "attributes": {
   "friendly_name": "High stress duration",
   "unit_of_measurement": "min",
   "icon": "mdi:emoticon-sad-outline"
  }
 },
 "sensor.garmin_connect_sleep_score": {
  "entity_id": "sensor.garmin_connect_sleep_score",
  "state": "81",
  "attributes": {
   "friendly_name": "Sleep score",
   "state_class": "measurement",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_sleep_need": {
  "entity_id": "sensor.garmin_connect_sleep_need",
  "state": "480",
  "attributes": {
   "friendly_name": "Sleep need",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_sleep_duration": {
  "entity_id": "sensor.garmin_connect_sleep_duration",
  "state": "432",
  "attributes": {
   "friendly_name": "Sleep duration",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_total_sleep_duration": {
  "entity_id": "sensor.garmin_connect_total_sleep_duration",
  "state": "450",
  "attributes": {
   "friendly_name": "Total sleep duration",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_awake_time": {
  "entity_id": "sensor.garmin_connect_awake_time",
  "state": "18",
  "attributes": {
   "friendly_name": "Awake time",
   "unit_of_measurement": "min",
   "icon": "mdi:eye-outline"
  }
 },
 "sensor.garmin_connect_deep_sleep": {
  "entity_id": "sensor.garmin_connect_deep_sleep",
  "state": "78",
  "attributes": {
   "friendly_name": "Deep sleep",
   "unit_of_measurement": "min",
   "icon": "mdi:power-sleep"
  }
 },
 "sensor.garmin_connect_light_sleep": {
  "entity_id": "sensor.garmin_connect_light_sleep",
  "state": "240",
  "attributes": {
   "friendly_name": "Light sleep",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_rem_sleep": {
  "entity_id": "sensor.garmin_connect_rem_sleep",
  "state": "96",
  "attributes": {
   "friendly_name": "REM sleep",
   "unit_of_measurement": "min",
   "icon": "mdi:weather-night"
  }
 },
 "sensor.garmin_connect_nap_time": {
  "entity_id": "sensor.garmin_connect_nap_time",
  "state": "0",
  "attributes": {
   "friendly_name": "Nap time",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_bedtime": {
  "entity_id": "sensor.garmin_connect_bedtime",
  "state": "2026-09-28T23:12:00+02:00",
  "attributes": {
   "friendly_name": "Bedtime",
   "device_class": "timestamp",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_wake_time": {
  "entity_id": "sensor.garmin_connect_wake_time",
  "state": "2026-09-29T06:48:00+02:00",
  "attributes": {
   "friendly_name": "Wake time",
   "device_class": "timestamp",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_optimal_bedtime": {
  "entity_id": "sensor.garmin_connect_optimal_bedtime",
  "state": "2026-09-28T22:45:00+02:00",
  "attributes": {
   "friendly_name": "Optimal bedtime",
   "device_class": "timestamp",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_optimal_wake_time": {
  "entity_id": "sensor.garmin_connect_optimal_wake_time",
  "state": "2026-09-29T06:15:00+02:00",
  "attributes": {
   "friendly_name": "Optimal wake time",
   "device_class": "timestamp",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_unmeasurable_sleep": {
  "entity_id": "sensor.garmin_connect_unmeasurable_sleep",
  "state": "12",
  "attributes": {
   "friendly_name": "Unmeasurable sleep",
   "unit_of_measurement": "min",
   "icon": "mdi:sleep"
  }
 },
 "sensor.garmin_connect_body_battery": {
  "entity_id": "sensor.garmin_connect_body_battery",
  "state": "72",
  "attributes": {
   "friendly_name": "Body battery",
   "unit_of_measurement": "%",
   "icon": "mdi:battery-heart"
  }
 },
 "sensor.garmin_connect_body_battery_charged": {
  "entity_id": "sensor.garmin_connect_body_battery_charged",
  "state": "45",
  "attributes": {
   "friendly_name": "Body battery charged",
   "state_class": "measurement",
   "icon": "mdi:battery-plus"
  }
 },
 "sensor.garmin_connect_body_battery_drained": {
  "entity_id": "sensor.garmin_connect_body_battery_drained",
  "state": "38",
  "attributes": {
   "friendly_name": "Body battery drained",
   "state_class": "measurement",
   "icon": "mdi:battery-minus"
  }
 },
 "sensor.garmin_connect_body_battery_highest": {
  "entity_id": "sensor.garmin_connect_body_battery_highest",
  "state": "88",
  "attributes": {
   "friendly_name": "Body battery highest",
   "state_class": "measurement",
   "icon": "mdi:battery-heart"
  }
 },
 "sensor.garmin_connect_body_battery_lowest": {
  "entity_id": "sensor.garmin_connect_body_battery_lowest",
  "state": "21",
  "attributes": {
   "friendly_name": "Body battery lowest",
   "state_class": "measurement",
   "icon": "mdi:battery-heart"
  }
 },
 "sensor.garmin_connect_training_readiness": {
  "entity_id": "sensor.garmin_connect_training_readiness",
  "state": "64",
  "attributes": {
   "friendly_name": "Training readiness",
   "level": "moderate",
   "sleep_score": 81,
   "recovery_score": 68,
   "hrv_status": "balanced",
   "acute_load": 412,
   "unit_of_measurement": "%",
   "icon": "mdi:lightning-bolt"
  }
 },
 "sensor.garmin_connect_morning_training_readiness": {
  "entity_id": "sensor.garmin_connect_morning_training_readiness",
  "state": "71",
  "attributes": {
   "friendly_name": "Morning training readiness",
   "unit_of_measurement": "%",
   "icon": "mdi:lightning-bolt"
  }
 },
 "sensor.garmin_connect_training_status": {
  "entity_id": "sensor.garmin_connect_training_status",
  "state": "productive",
  "attributes": {
   "friendly_name": "Training status",
   "icon": "mdi:chart-line"
  }
 },
 "sensor.garmin_connect_recovery_time": {
  "entity_id": "sensor.garmin_connect_recovery_time",
  "state": "1320",
  "attributes": {
   "friendly_name": "Recovery time",
   "unit_of_measurement": "min",
   "icon": "mdi:timer-sand"
  }
 },
 "sensor.garmin_connect_vo2_max": {
  "entity_id": "sensor.garmin_connect_vo2_max",
  "state": "47",
  "attributes": {
   "friendly_name": "VO2 max",
   "unit_of_measurement": "mL/(kgÂ·min)",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_endurance_score": {
  "entity_id": "sensor.garmin_connect_endurance_score",
  "state": "4620",
  "attributes": {
   "friendly_name": "Endurance score",
   "state_class": "measurement",
   "icon": "mdi:run"
  }
 },
 "sensor.garmin_connect_hill_score": {
  "entity_id": "sensor.garmin_connect_hill_score",
  "state": "63",
  "attributes": {
   "friendly_name": "Hill score",
   "state_class": "measurement",
   "icon": "mdi:image-filter-hdr"
  }
 },
 "sensor.garmin_connect_fitness_age": {
  "entity_id": "sensor.garmin_connect_fitness_age",
  "state": "41",
  "attributes": {
   "friendly_name": "Fitness age",
   "unit_of_measurement": "years",
   "icon": "mdi:calendar-heart"
  }
 },
 "sensor.garmin_connect_achievable_fitness_age": {
  "entity_id": "sensor.garmin_connect_achievable_fitness_age",
  "state": "38",
  "attributes": {
   "friendly_name": "Achievable fitness age",
   "unit_of_measurement": "years",
   "icon": "mdi:calendar-heart"
  }
 },
 "sensor.garmin_connect_previous_fitness_age": {
  "entity_id": "sensor.garmin_connect_previous_fitness_age",
  "state": "42",
  "attributes": {
   "friendly_name": "Previous fitness age",
   "unit_of_measurement": "years",
   "icon": "mdi:calendar-heart"
  }
 },
 "sensor.garmin_connect_chronological_age": {
  "entity_id": "sensor.garmin_connect_chronological_age",
  "state": "47",
  "attributes": {
   "friendly_name": "Chronological age",
   "unit_of_measurement": "years",
   "icon": "mdi:calendar-heart"
  }
 },
 "sensor.garmin_connect_lactate_threshold_heart_rate": {
  "entity_id": "sensor.garmin_connect_lactate_threshold_heart_rate",
  "state": "168",
  "attributes": {
   "friendly_name": "Lactate threshold heart rate",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_lactate_threshold_speed": {
  "entity_id": "sensor.garmin_connect_lactate_threshold_speed",
  "state": "3.42",
  "attributes": {
   "friendly_name": "Lactate threshold speed",
   "unit_of_measurement": "m/s",
   "icon": "mdi:speedometer"
  }
 },
 "sensor.garmin_connect_power_to_weight_running": {
  "entity_id": "sensor.garmin_connect_power_to_weight_running",
  "state": "4.12",
  "attributes": {
   "friendly_name": "Power to Weight Running",
   "unit_of_measurement": "W/kg",
   "icon": "mdi:lightning-bolt"
  }
 },
 "sensor.garmin_connect_functional_threshold_power_cycling": {
  "entity_id": "sensor.garmin_connect_functional_threshold_power_cycling",
  "state": "268",
  "attributes": {
   "friendly_name": "FTP Cycling",
   "unit_of_measurement": "W",
   "icon": "mdi:bike-fast"
  }
 },
 "sensor.garmin_connect_weight": {
  "entity_id": "sensor.garmin_connect_weight",
  "state": "82.4",
  "attributes": {
   "friendly_name": "Weight",
   "unit_of_measurement": "kg",
   "icon": "mdi:scale-bathroom"
  }
 },
 "sensor.garmin_connect_bmi": {
  "entity_id": "sensor.garmin_connect_bmi",
  "state": "24.1",
  "attributes": {
   "friendly_name": "BMI",
   "state_class": "measurement",
   "icon": "mdi:human-male-height"
  }
 },
 "sensor.garmin_connect_body_fat": {
  "entity_id": "sensor.garmin_connect_body_fat",
  "state": "21.5",
  "attributes": {
   "friendly_name": "Body fat",
   "unit_of_measurement": "%",
   "icon": "mdi:percent"
  }
 },
 "sensor.garmin_connect_body_water": {
  "entity_id": "sensor.garmin_connect_body_water",
  "state": "55.2",
  "attributes": {
   "friendly_name": "Body water",
   "unit_of_measurement": "%",
   "icon": "mdi:water-percent"
  }
 },
 "sensor.garmin_connect_muscle_mass": {
  "entity_id": "sensor.garmin_connect_muscle_mass",
  "state": "34.8",
  "attributes": {
   "friendly_name": "Muscle mass",
   "unit_of_measurement": "kg",
   "icon": "mdi:arm-flex"
  }
 },
 "sensor.garmin_connect_bone_mass": {
  "entity_id": "sensor.garmin_connect_bone_mass",
  "state": "3.4",
  "attributes": {
   "friendly_name": "Bone mass",
   "unit_of_measurement": "kg",
   "icon": "mdi:human-male"
  }
 },
 "sensor.garmin_connect_visceral_fat": {
  "entity_id": "sensor.garmin_connect_visceral_fat",
  "state": "9",
  "attributes": {
   "friendly_name": "Visceral fat",
   "state_class": "measurement",
   "icon": "mdi:percent"
  }
 },
 "sensor.garmin_connect_metabolic_age": {
  "entity_id": "sensor.garmin_connect_metabolic_age",
  "state": "39",
  "attributes": {
   "friendly_name": "Metabolic age",
   "unit_of_measurement": "years",
   "icon": "mdi:calendar-heart"
  }
 },
 "sensor.garmin_connect_physique_rating": {
  "entity_id": "sensor.garmin_connect_physique_rating",
  "state": "5",
  "attributes": {
   "friendly_name": "Physique rating",
   "state_class": "measurement",
   "icon": "mdi:human-male"
  }
 },
 "sensor.garmin_connect_hydration": {
  "entity_id": "sensor.garmin_connect_hydration",
  "state": "1450",
  "attributes": {
   "friendly_name": "Hydration",
   "unit_of_measurement": "ml",
   "icon": "mdi:cup-water"
  }
 },
 "sensor.garmin_connect_hydration_goal": {
  "entity_id": "sensor.garmin_connect_hydration_goal",
  "state": "2500",
  "attributes": {
   "friendly_name": "Hydration goal",
   "unit_of_measurement": "ml",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_hydration_daily_average": {
  "entity_id": "sensor.garmin_connect_hydration_daily_average",
  "state": "1780",
  "attributes": {
   "friendly_name": "Hydration daily average",
   "unit_of_measurement": "ml",
   "icon": "mdi:cup-water"
  }
 },
 "sensor.garmin_connect_hydration_sweat_loss": {
  "entity_id": "sensor.garmin_connect_hydration_sweat_loss",
  "state": "620",
  "attributes": {
   "friendly_name": "Hydration sweat loss",
   "unit_of_measurement": "ml",
   "icon": "mdi:water-percent"
  }
 },
 "sensor.garmin_connect_hydration_activity_intake": {
  "entity_id": "sensor.garmin_connect_hydration_activity_intake",
  "state": "400",
  "attributes": {
   "friendly_name": "Hydration activity intake",
   "unit_of_measurement": "ml",
   "icon": "mdi:cup-water"
  }
 },
 "sensor.garmin_connect_nutrition_consumed_calories": {
  "entity_id": "sensor.garmin_connect_nutrition_consumed_calories",
  "state": "1840",
  "attributes": {
   "friendly_name": "Nutrition consumed calories",
   "meals": [
    {
     "name": "Breakfast",
     "calories": 420
    },
    {
     "name": "Lunch",
     "calories": 780
    },
    {
     "name": "Snack",
     "calories": 640
    }
   ],
   "unit_of_measurement": "kcal",
   "icon": "mdi:food-apple"
  }
 },
 "sensor.garmin_connect_nutrition_calorie_goal": {
  "entity_id": "sensor.garmin_connect_nutrition_calorie_goal",
  "state": "2200",
  "attributes": {
   "friendly_name": "Nutrition calorie goal",
   "unit_of_measurement": "kcal",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_nutrition_consumed_protein": {
  "entity_id": "sensor.garmin_connect_nutrition_consumed_protein",
  "state": "96",
  "attributes": {
   "friendly_name": "Nutrition consumed protein",
   "unit_of_measurement": "g",
   "icon": "mdi:food-steak"
  }
 },
 "sensor.garmin_connect_nutrition_protein_goal": {
  "entity_id": "sensor.garmin_connect_nutrition_protein_goal",
  "state": "140",
  "attributes": {
   "friendly_name": "Nutrition protein goal",
   "unit_of_measurement": "g",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_nutrition_consumed_carbohydrates": {
  "entity_id": "sensor.garmin_connect_nutrition_consumed_carbohydrates",
  "state": "210",
  "attributes": {
   "friendly_name": "Nutrition consumed carbohydrates",
   "unit_of_measurement": "g",
   "icon": "mdi:bread-slice"
  }
 },
 "sensor.garmin_connect_nutrition_carbohydrates_goal": {
  "entity_id": "sensor.garmin_connect_nutrition_carbohydrates_goal",
  "state": "250",
  "attributes": {
   "friendly_name": "Nutrition carbohydrates goal",
   "unit_of_measurement": "g",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_nutrition_consumed_fat": {
  "entity_id": "sensor.garmin_connect_nutrition_consumed_fat",
  "state": "58",
  "attributes": {
   "friendly_name": "Nutrition consumed fat",
   "unit_of_measurement": "g",
   "icon": "mdi:oil"
  }
 },
 "sensor.garmin_connect_nutrition_fat_goal": {
  "entity_id": "sensor.garmin_connect_nutrition_fat_goal",
  "state": "70",
  "attributes": {
   "friendly_name": "Nutrition fat goal",
   "unit_of_measurement": "g",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_nutrition_remaining_calories": {
  "entity_id": "sensor.garmin_connect_nutrition_remaining_calories",
  "state": "360",
  "attributes": {
   "friendly_name": "Nutrition remaining calories",
   "unit_of_measurement": "kcal",
   "icon": "mdi:food-apple"
  }
 },
 "sensor.garmin_connect_nutrition_logged_entries": {
  "entity_id": "sensor.garmin_connect_nutrition_logged_entries",
  "state": "3",
  "attributes": {
   "friendly_name": "Nutrition logged entries",
   "state_class": "measurement",
   "icon": "mdi:food-apple"
  }
 },
 "sensor.garmin_connect_intensity_minutes": {
  "entity_id": "sensor.garmin_connect_intensity_minutes",
  "state": "96",
  "attributes": {
   "friendly_name": "Intensity minutes",
   "moderate_minutes": 60,
   "vigorous_minutes": 18,
   "goal": 150,
   "unit_of_measurement": "min",
   "icon": "mdi:lightning-bolt"
  }
 },
 "sensor.garmin_connect_intensity_minutes_goal": {
  "entity_id": "sensor.garmin_connect_intensity_minutes_goal",
  "state": "150",
  "attributes": {
   "friendly_name": "Intensity minutes goal",
   "unit_of_measurement": "min",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_moderate_intensity_minutes": {
  "entity_id": "sensor.garmin_connect_moderate_intensity_minutes",
  "state": "60",
  "attributes": {
   "friendly_name": "Moderate intensity minutes",
   "unit_of_measurement": "min",
   "icon": "mdi:walk"
  }
 },
 "sensor.garmin_connect_vigorous_intensity_minutes": {
  "entity_id": "sensor.garmin_connect_vigorous_intensity_minutes",
  "state": "18",
  "attributes": {
   "friendly_name": "Vigorous intensity minutes",
   "unit_of_measurement": "min",
   "icon": "mdi:run"
  }
 },
 "sensor.garmin_connect_latest_spo2": {
  "entity_id": "sensor.garmin_connect_latest_spo2",
  "state": "96",
  "attributes": {
   "friendly_name": "Latest SpO2",
   "unit_of_measurement": "%",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_average_spo2": {
  "entity_id": "sensor.garmin_connect_average_spo2",
  "state": "95",
  "attributes": {
   "friendly_name": "Average SpO2",
   "unit_of_measurement": "%",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_lowest_spo2": {
  "entity_id": "sensor.garmin_connect_lowest_spo2",
  "state": "92",
  "attributes": {
   "friendly_name": "Lowest SpO2",
   "unit_of_measurement": "%",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_latest_spo2_time": {
  "entity_id": "sensor.garmin_connect_latest_spo2_time",
  "state": "2026-09-29T05:42:00+02:00",
  "attributes": {
   "friendly_name": "Latest SpO2 time",
   "device_class": "timestamp",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_latest_respiration": {
  "entity_id": "sensor.garmin_connect_latest_respiration",
  "state": "14",
  "attributes": {
   "friendly_name": "Latest respiration",
   "unit_of_measurement": "brpm",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_average_sleep_respiration": {
  "entity_id": "sensor.garmin_connect_average_sleep_respiration",
  "state": "13",
  "attributes": {
   "friendly_name": "Average sleep respiration",
   "unit_of_measurement": "brpm",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_lowest_respiration": {
  "entity_id": "sensor.garmin_connect_lowest_respiration",
  "state": "11",
  "attributes": {
   "friendly_name": "Lowest respiration",
   "unit_of_measurement": "brpm",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_highest_respiration": {
  "entity_id": "sensor.garmin_connect_highest_respiration",
  "state": "19",
  "attributes": {
   "friendly_name": "Highest respiration",
   "unit_of_measurement": "brpm",
   "icon": "mdi:lungs"
  }
 },
 "sensor.garmin_connect_skin_temperature_change": {
  "entity_id": "sensor.garmin_connect_skin_temperature_change",
  "state": "0.3",
  "attributes": {
   "friendly_name": "Skin temperature change",
   "calibration_days": 19,
   "unit_of_measurement": "Â°C",
   "icon": "mdi:thermometer"
  }
 },
 "sensor.garmin_connect_avg_altitude": {
  "entity_id": "sensor.garmin_connect_avg_altitude",
  "state": "186",
  "attributes": {
   "friendly_name": "Average altitude",
   "unit_of_measurement": "m",
   "icon": "mdi:image-filter-hdr"
  }
 },
 "sensor.garmin_connect_active_goals": {
  "entity_id": "sensor.garmin_connect_active_goals",
  "state": "2",
  "attributes": {
   "friendly_name": "Active goals",
   "goals": [
    {
     "name": "Run 100 km this month",
     "type": "distance",
     "target_value": 100000,
     "current_value": 51200,
     "progress_percent": 51
    }
   ],
   "state_class": "measurement",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_future_goals": {
  "entity_id": "sensor.garmin_connect_future_goals",
  "state": "3",
  "attributes": {
   "friendly_name": "Future goals",
   "state_class": "measurement",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_goals_history": {
  "entity_id": "sensor.garmin_connect_goals_history",
  "state": "7",
  "attributes": {
   "friendly_name": "Goals history",
   "state_class": "measurement",
   "icon": "mdi:target"
  }
 },
 "sensor.garmin_connect_badges": {
  "entity_id": "sensor.garmin_connect_badges",
  "state": "86",
  "attributes": {
   "friendly_name": "Badges",
   "badges": [
    {
     "name": "Weekend 5K",
     "points": 5,
     "earned_date": "2026-09-21"
    }
   ],
   "state_class": "measurement",
   "icon": "mdi:medal"
  }
 },
 "sensor.garmin_connect_user_points": {
  "entity_id": "sensor.garmin_connect_user_points",
  "state": "12480",
  "attributes": {
   "friendly_name": "User points",
   "state_class": "measurement",
   "icon": "mdi:star"
  }
 },
 "sensor.garmin_connect_user_level": {
  "entity_id": "sensor.garmin_connect_user_level",
  "state": "4",
  "attributes": {
   "friendly_name": "User level",
   "state_class": "measurement",
   "icon": "mdi:star"
  }
 },
 "sensor.garmin_connect_last_activity": {
  "entity_id": "sensor.garmin_connect_last_activity",
  "state": "Morning Run",
  "attributes": {
   "friendly_name": "Last activity",
   "activityId": 12345678901,
   "distance": 7312,
   "duration": 2410,
   "activityType": "running",
   "startTime": "2026-09-29T06:12:00+02:00",
   "averageHR": 142,
   "calories": 486,
   "icon": "mdi:run-fast"
  }
 },
 "sensor.garmin_connect_last_activities": {
  "entity_id": "sensor.garmin_connect_last_activities",
  "state": "4",
  "attributes": {
   "friendly_name": "Last activities",
   "last_activities": [],
   "state_class": "measurement",
   "icon": "mdi:run-fast"
  }
 },
 "sensor.garmin_connect_last_activity_route": {
  "entity_id": "sensor.garmin_connect_last_activity_route",
  "state": "1840",
  "attributes": {
   "friendly_name": "Last activity route",
   "has_polyline": true,
   "activity_name": "Morning Run",
   "state_class": "measurement",
   "icon": "mdi:map-marker-path"
  }
 },
 "sensor.garmin_connect_last_workout": {
  "entity_id": "sensor.garmin_connect_last_workout",
  "state": "Threshold Run",
  "attributes": {
   "friendly_name": "Last workout",
   "icon": "mdi:dumbbell"
  }
 },
 "sensor.garmin_connect_last_workouts": {
  "entity_id": "sensor.garmin_connect_last_workouts",
  "state": "2",
  "attributes": {
   "friendly_name": "Last workouts",
   "state_class": "measurement",
   "icon": "mdi:dumbbell"
  }
 },
 "sensor.garmin_connect_next_scheduled_workout": {
  "entity_id": "sensor.garmin_connect_next_scheduled_workout",
  "state": "Threshold Run 8x400m",
  "attributes": {
   "friendly_name": "Next scheduled workout",
   "icon": "mdi:calendar-clock"
  }
 },
 "sensor.garmin_connect_today_s_scheduled_workout": {
  "entity_id": "sensor.garmin_connect_today_s_scheduled_workout",
  "state": "Base Run 45min",
  "attributes": {
   "friendly_name": "Today's scheduled workout",
   "icon": "mdi:calendar-today"
  }
 },
 "sensor.garmin_connect_training_plan_goal_event": {
  "entity_id": "sensor.garmin_connect_training_plan_goal_event",
  "state": "Vienna City Marathon",
  "attributes": {
   "friendly_name": "Training plan goal event",
   "days_until_event": 38,
   "distance": 42195,
   "date": "2026-11-06",
   "predicted_time": 13080,
   "icon": "mdi:flag-checkered"
  }
 },
 "sensor.garmin_connect_last_synced": {
  "entity_id": "sensor.garmin_connect_last_synced",
  "state": "2026-09-29T07:58:00+02:00",
  "attributes": {
   "friendly_name": "Last synced",
   "device_class": "timestamp",
   "icon": "mdi:sync"
  }
 },
 "sensor.garmin_connect_blood_pressure_systolic": {
  "entity_id": "sensor.garmin_connect_blood_pressure_systolic",
  "state": "118",
  "attributes": {
   "friendly_name": "Blood pressure systolic",
   "diastolic": 76,
   "pulse": 62,
   "category_code": 1,
   "unit_of_measurement": "mmHg",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_blood_pressure_diastolic": {
  "entity_id": "sensor.garmin_connect_blood_pressure_diastolic",
  "state": "76",
  "attributes": {
   "friendly_name": "Blood pressure diastolic",
   "unit_of_measurement": "mmHg",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_blood_pressure_pulse": {
  "entity_id": "sensor.garmin_connect_blood_pressure_pulse",
  "state": "62",
  "attributes": {
   "friendly_name": "Blood pressure pulse",
   "unit_of_measurement": "bpm",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_blood_pressure_category": {
  "entity_id": "sensor.garmin_connect_blood_pressure_category",
  "state": "Normal",
  "attributes": {
   "friendly_name": "Blood pressure category",
   "icon": "mdi:heart-pulse"
  }
 },
 "sensor.garmin_connect_devices": {
  "entity_id": "sensor.garmin_connect_devices",
  "state": "3",
  "attributes": {
   "friendly_name": "Devices",
   "devices": [],
   "last_used_device": "fenix 7",
   "state_class": "measurement",
   "icon": "mdi:watch"
  }
 },
 "sensor.garmin_connect_connected_sensors": {
  "entity_id": "sensor.garmin_connect_connected_sensors",
  "state": "4",
  "attributes": {
   "friendly_name": "Connected sensors",
   "sensors": [],
   "state_class": "measurement",
   "icon": "mdi:bluetooth-connect"
  }
 },
 "sensor.garmin_connect_solar_intensity": {
  "entity_id": "sensor.garmin_connect_solar_intensity",
  "state": "78",
  "attributes": {
   "friendly_name": "Solar intensity",
   "devices": [],
   "unit_of_measurement": "%",
   "icon": "mdi:white-balance-sunny"
  }
 },
 "sensor.garmin_connect_average_solar_intensity": {
  "entity_id": "sensor.garmin_connect_average_solar_intensity",
  "state": "64",
  "attributes": {
   "friendly_name": "Average solar intensity",
   "unit_of_measurement": "%",
   "icon": "mdi:white-balance-sunny"
  }
 },
 "sensor.garmin_connect_solar_time_gained": {
  "entity_id": "sensor.garmin_connect_solar_time_gained",
  "state": "42",
  "attributes": {
   "friendly_name": "Solar time gained",
   "unit_of_measurement": "min",
   "icon": "mdi:white-balance-sunny"
  }
 },
 "sensor.fenix_7_battery": {
  "entity_id": "sensor.fenix_7_battery",
  "state": "62",
  "attributes": {
   "friendly_name": "fenix 7 battery",
   "unit_of_measurement": "%",
   "icon": "mdi:battery-60"
  }
 },
 "sensor.garmin_connect_my_running_shoes": {
  "entity_id": "sensor.garmin_connect_my_running_shoes",
  "state": "512000",
  "attributes": {
   "friendly_name": "My Running Shoes",
   "gear_uuid": "8ba0a5f7-1e4d-4d1e-9a20-9d2f5ea45f5e",
   "total_activities": 42,
   "gear_make_name": "Hoka",
   "gear_model_name": "Speedgoat 6",
   "maximum_meters": 800000,
   "default_for_activity": [
    "running"
   ],
   "unit_of_measurement": "m",
   "icon": "mdi:shoe-sneaker"
  }
 },
 "sensor.time": {
  "entity_id": "sensor.time",
  "state": "08:14",
  "attributes": {
   "friendly_name": "Time",
   "icon": "mdi:clock"
  }
 }
};

window.PREVIEW_CARDS = [
 {
  "id": "minimal",
  "source": "examples/cards/01-minimal.yaml",
  "title": "minimal",
  "layout": "card",
  "config": {
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal"
    },
    {
     "entity": "sensor.garmin_connect_distance",
     "max": 10000
    },
    {
     "entity": "sensor.garmin_connect_sleep_score"
    }
   ]
  }
 },
 {
  "id": "daily-activity",
  "source": "examples/cards/02-daily-activity.yaml",
  "title": "daily activity",
  "layout": "card",
  "config": {
   "title": "Activity",
   "show_units": true,
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_distance",
     "name": "Distance",
     "max": 10000
    },
    {
     "entity": "sensor.garmin_connect_calories",
     "name": "Calories",
     "max": 2500,
     "color": "#ff7043"
    },
    {
     "entity": "sensor.garmin_connect_active_calories",
     "name": "Active",
     "max": 1000,
     "color": "#f4511e"
    },
    {
     "entity": "sensor.garmin_connect_floors_ascended",
     "name": "Floors",
     "max_entity": "sensor.garmin_connect_floors_ascended_goal"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "name": "Intensity",
     "max_attribute": "goal",
     "color_stops": {
      "0": "#607d8b",
      "50": "#ffb300",
      "80": "#43a047"
     }
    }
   ]
  }
 },
 {
  "id": "steps-and-goals",
  "source": "examples/cards/03-steps-and-goals.yaml",
  "title": "steps and goals",
  "layout": "card",
  "config": {
   "title": "Steps",
   "header": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_yesterday_steps",
     "name": "Yesterday"
    },
    {
     "entity": "sensor.garmin_connect_weekly_step_average",
     "name": "Ø 7 days"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "name": "Intensity",
     "max_attribute": "goal"
    },
    {
     "entity": "sensor.garmin_connect_active_calories",
     "name": "Active kcal",
     "max": 1000
    }
   ]
  }
 },
 {
  "id": "sleep",
  "source": "examples/cards/04-sleep.yaml",
  "title": "sleep",
  "layout": "card",
  "config": {
   "title": "Sleep",
   "show_units": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_bedtime",
     "name": "Bedtime"
    },
    {
     "entity": "sensor.garmin_connect_wake_time",
     "name": "Wake"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "name": "Score"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_sleep_duration",
     "name": "Sleep",
     "max_entity": "sensor.garmin_connect_sleep_need",
     "color": "#7e57c2"
    },
    {
     "entity": "sensor.garmin_connect_deep_sleep",
     "name": "Deep",
     "max": 120,
     "color": "#3949ab"
    },
    {
     "entity": "sensor.garmin_connect_rem_sleep",
     "name": "REM",
     "max": 120,
     "color": "#00acc1"
    },
    {
     "entity": "sensor.garmin_connect_light_sleep",
     "name": "Light",
     "max": 300,
     "color": "#26a69a"
    },
    {
     "entity": "sensor.garmin_connect_awake_time",
     "name": "Awake",
     "max": 60,
     "color": "#ffb300"
    }
   ]
  }
 },
 {
  "id": "heart-hrv-spo2",
  "source": "examples/cards/05-heart-hrv-spo2.yaml",
  "title": "heart hrv spo2",
  "layout": "card",
  "config": {
   "title": "Heart health",
   "show_units_header": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_resting_heart_rate",
     "icon_color": "#e53935"
    },
    {
     "entity": "sensor.garmin_connect_hrv_status",
     "name": "HRV status"
    },
    {
     "entity": "sensor.garmin_connect_latest_spo2",
     "icon_color": "#1e88e5"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_hrv_last_night_average",
     "name": "HRV",
     "max": 100,
     "color": "#8e24aa"
    },
    {
     "entity": "sensor.garmin_connect_hrv_weekly_average",
     "name": "HRV Ø 7",
     "max": 100,
     "color": "#ab47bc"
    },
    {
     "entity": "sensor.garmin_connect_latest_spo2",
     "name": "SpO2",
     "max": 100,
     "color": "#1e88e5",
     "color_stops": {
      "0": "#e53935",
      "90": "#fb8c00",
      "95": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_latest_respiration",
     "name": "Respiration",
     "max": 25,
     "color": "#00acc1"
    }
   ]
  }
 },
 {
  "id": "body-battery-and-stress",
  "source": "examples/cards/06-body-battery-and-stress.yaml",
  "title": "body battery and stress",
  "layout": "card",
  "config": {
   "title": "Energy",
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_body_battery_charged",
     "name": "+ charged"
    },
    {
     "entity": "sensor.garmin_connect_body_battery_drained",
     "name": "− drained"
    },
    {
     "entity": "sensor.garmin_connect_stress_qualifier"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_body_battery",
     "name": "Body battery",
     "max": 100,
     "color_stops": {
      "0": "#e53935",
      "25": "#fb8c00",
      "50": "#fdd835",
      "75": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_average_stress_level",
     "name": "Stress",
     "max": 100,
     "color_stops": {
      "0": "#43a047",
      "25": "#fdd835",
      "50": "#fb8c00",
      "75": "#e53935"
     }
    },
    {
     "entity": "sensor.garmin_connect_rest_stress_duration",
     "name": "Rest",
     "max": 720,
     "color": "#26a69a"
    },
    {
     "entity": "sensor.garmin_connect_activity_stress_duration",
     "name": "Activity",
     "max": 720,
     "color": "#ff7043"
    }
   ]
  }
 },
 {
  "id": "training-readiness",
  "source": "examples/cards/07-training-readiness.yaml",
  "title": "training readiness",
  "layout": "card",
  "config": {
   "title": "Training",
   "show_units": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_training_status",
     "name": "Status"
    },
    {
     "entity": "sensor.garmin_connect_fitness_age",
     "name": "Fitness age"
    },
    {
     "entity": "sensor.garmin_connect_lactate_threshold_heart_rate",
     "name": "LTHR"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_training_readiness",
     "name": "Readiness",
     "max": 100,
     "color_stops": {
      "0": "#e53935",
      "40": "#fb8c00",
      "60": "#fdd835",
      "80": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_morning_training_readiness",
     "name": "Morning",
     "max": 100,
     "color": "#5c6bc0"
    },
    {
     "entity": "sensor.garmin_connect_recovery_time",
     "name": "Recovery",
     "max": 1440,
     "color": "#8d6e63"
    },
    {
     "entity": "sensor.garmin_connect_vo2_max",
     "name": "VO2 max",
     "max": 60,
     "color": "#00897b"
    },
    {
     "entity": "sensor.garmin_connect_endurance_score",
     "name": "Endurance",
     "max": 5000,
     "color": "#00acc1"
    },
    {
     "entity": "sensor.garmin_connect_hill_score",
     "name": "Hill",
     "max": 100,
     "color": "#6d4c41"
    }
   ]
  }
 },
 {
  "id": "body-composition",
  "source": "examples/cards/08-body-composition.yaml",
  "title": "body composition",
  "layout": "card",
  "config": {
   "title": "Body",
   "show_units": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_metabolic_age",
     "name": "Metab. age"
    },
    {
     "entity": "sensor.garmin_connect_bone_mass"
    },
    {
     "entity": "sensor.garmin_connect_visceral_fat"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_weight",
     "name": "Weight",
     "max": 90,
     "color": "#5c6bc0"
    },
    {
     "entity": "sensor.garmin_connect_bmi",
     "name": "BMI",
     "max": 35,
     "color_stops": {
      "0": "#42a5f5",
      "25": "#43a047",
      "35": "#e53935"
     }
    },
    {
     "entity": "sensor.garmin_connect_body_fat",
     "name": "Body fat",
     "max": 40,
     "color": "#ef6c00"
    },
    {
     "entity": "sensor.garmin_connect_muscle_mass",
     "name": "Muscle",
     "max": 45,
     "color": "#00897b"
    },
    {
     "entity": "sensor.garmin_connect_body_water",
     "name": "Water",
     "max": 70,
     "color": "#03a9f4"
    },
    {
     "entity": "sensor.garmin_connect_fitness_age",
     "name": "Fitness age",
     "max": 60,
     "color": "#7cb342"
    }
   ]
  }
 },
 {
  "id": "hydration-and-nutrition",
  "source": "examples/cards/09-hydration-and-nutrition.yaml",
  "title": "hydration and nutrition",
  "layout": "card",
  "config": {
   "title": "Fuel",
   "show_units": true,
   "entities": [
    {
     "entity": "sensor.garmin_connect_hydration",
     "name": "Water",
     "max_entity": "sensor.garmin_connect_hydration_goal",
     "color": "#03a9f4",
     "tap_action": {
      "action": "perform-action",
      "perform_action": "garmin_connect.add_hydration",
      "data": {
       "value_in_ml": 250
      },
      "target": {
       "entity_id": "sensor.garmin_connect_hydration"
      }
     }
    },
    {
     "entity": "sensor.garmin_connect_hydration_sweat_loss",
     "name": "Sweat loss",
     "max": 1500,
     "color": "#0288d1"
    },
    {
     "entity": "sensor.garmin_connect_nutrition_consumed_calories",
     "name": "Calories",
     "max_entity": "sensor.garmin_connect_nutrition_calorie_goal",
     "color": "#ef6c00"
    },
    {
     "entity": "sensor.garmin_connect_nutrition_consumed_protein",
     "name": "Protein",
     "max_entity": "sensor.garmin_connect_nutrition_protein_goal",
     "color": "#8e24aa"
    },
    {
     "entity": "sensor.garmin_connect_nutrition_consumed_carbohydrates",
     "name": "Carbs",
     "max_entity": "sensor.garmin_connect_nutrition_carbohydrates_goal",
     "color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_nutrition_consumed_fat",
     "name": "Fat",
     "max_entity": "sensor.garmin_connect_nutrition_fat_goal",
     "color": "#fdd835"
    }
   ]
  }
 },
 {
  "id": "last-activity",
  "source": "examples/cards/10-last-activity.yaml",
  "title": "last activity",
  "layout": "card",
  "config": {
   "title": "Last activity",
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_last_activity",
     "name": "Last run",
     "icon": "mdi:run-fast"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_last_activity",
     "attribute": "distance",
     "name": "Distance",
     "units": "m",
     "max": 10000,
     "show_units": true,
     "color": "#e91e63"
    },
    {
     "entity": "sensor.garmin_connect_last_activity",
     "attribute": "duration",
     "name": "Duration",
     "units": "s",
     "max": 7200,
     "show_units": true,
     "color": "#9c27b0"
    },
    {
     "entity": "sensor.garmin_connect_last_activity",
     "attribute": "calories",
     "name": "Energy",
     "units": "kcal",
     "max": 800,
     "show_units": true,
     "tap_action": {
      "action": "more-info"
     },
     "hold_action": {
      "action": "url",
      "url_path": "https://connect.garmin.com/modern/"
     },
     "double_tap_action": {
      "action": "navigate",
      "navigation_path": "/lovelace/fitness"
     }
    }
   ]
  }
 },
 {
  "id": "goals-and-badges",
  "source": "examples/cards/11-goals-and-badges.yaml",
  "title": "goals and badges",
  "layout": "card",
  "config": {
   "title": "Goals",
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_user_level",
     "name": "Level"
    },
    {
     "entity": "sensor.garmin_connect_badges",
     "name": "Badges"
    },
    {
     "entity": "sensor.garmin_connect_last_synced",
     "name": "Synced"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_active_goals",
     "name": "Active goals",
     "max": 5,
     "color": "#00acc1"
    },
    {
     "entity": "sensor.garmin_connect_future_goals",
     "name": "Future goals",
     "max": 5,
     "color": "#7cb342"
    },
    {
     "entity": "sensor.garmin_connect_goals_history",
     "name": "Completed",
     "max": 10,
     "color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_training_plan_goal_event",
     "attribute": "days_until_event",
     "name": "Race in",
     "units": "days",
     "max": 100,
     "show_units": true,
     "color": "#e53935"
    },
    {
     "entity": "sensor.garmin_connect_user_points",
     "name": "Points",
     "max": 50000,
     "color": "#ffb300"
    }
   ]
  }
 },
 {
  "id": "health-and-blood-pressure",
  "source": "examples/cards/12-health-and-blood-pressure.yaml",
  "title": "health and blood pressure",
  "layout": "card",
  "config": {
   "title": "Health",
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_blood_pressure_category",
     "name": "Category"
    },
    {
     "entity": "sensor.garmin_connect_average_spo2",
     "name": "SpO2 Ø"
    },
    {
     "entity": "sensor.garmin_connect_average_sleep_respiration",
     "name": "Respiration"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_blood_pressure_systolic",
     "attribute": "diastolic",
     "name": "Diastolic",
     "max": 150,
     "color": "#26a69a"
    },
    {
     "entity": "sensor.garmin_connect_blood_pressure_systolic",
     "attribute": "pulse",
     "name": "Pulse",
     "max": 150,
     "color": "#e53935"
    },
    {
     "entity": "sensor.garmin_connect_blood_pressure_systolic",
     "name": "Systolic",
     "max": 200,
     "color": "#8e24aa"
    },
    {
     "entity": "sensor.garmin_connect_lowest_spo2",
     "name": "SpO2 min",
     "max": 100,
     "color_stops": {
      "0": "#e53935",
      "90": "#fb8c00",
      "95": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_skin_temperature_change",
     "attribute": "calibration_days",
     "name": "Calibration",
     "units": "days",
     "max": 21,
     "show_units": true,
     "color": "#5c6bc0"
    }
   ]
  }
 },
 {
  "id": "gear-and-battery",
  "source": "examples/cards/13-gear-and-battery.yaml",
  "title": "gear and battery",
  "layout": "card",
  "config": {
   "title": "Gear",
   "battery_entity": "sensor.fenix_7_battery",
   "battery_colors": {
    "high": "#10a13c",
    "medium": "#dee023",
    "low": "#da3116"
   },
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_devices",
     "name": "Devices"
    },
    {
     "entity": "sensor.garmin_connect_connected_sensors",
     "name": "Sensors"
    },
    {
     "entity": "sensor.garmin_connect_solar_intensity",
     "show_units": true
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_my_running_shoes",
     "attribute": "total_activities",
     "name": "Runs in shoes",
     "max": 100,
     "color": "#8d6e63"
    },
    {
     "entity": "sensor.garmin_connect_my_running_shoes",
     "name": "Shoe mileage",
     "max": 800000,
     "show_units": true,
     "color_stops": {
      "0": "#43a047",
      "75": "#fb8c00",
      "95": "#e53935"
     },
     "tap_action": {
      "action": "more-info"
     }
    }
   ]
  }
 },
 {
  "id": "everything",
  "source": "examples/cards/14-everything.yaml",
  "title": "everything",
  "layout": "card",
  "config": {
   "title": "Markus",
   "battery_entity": "sensor.fenix_7_battery",
   "layout": "rings",
   "columns": 4,
   "ring_size": 45,
   "show_units": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_resting_heart_rate",
     "icon_color": "#e53935"
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "icon_color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "icon_color": "#7e57c2"
    },
    {
     "entity": "sensor.garmin_connect_hrv_status",
     "name": "HRV"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "name": "Intensity",
     "max_attribute": "goal",
     "color_stops": {
      "0": "#607d8b",
      "50": "#ffb300",
      "80": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_last_activity",
     "attribute": "distance",
     "name": "Last run",
     "units": "m",
     "max": 10000,
     "color": "#e91e63"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "name": "Sleep",
     "max": 100,
     "color_stops": {
      "0": "#e53935",
      "60": "#fb8c00",
      "80": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_hydration",
     "name": "Water",
     "max_entity": "sensor.garmin_connect_hydration_goal",
     "color": "#03a9f4"
    },
    {
     "entity": "sensor.garmin_connect_training_readiness",
     "name": "Readiness",
     "icon": "mdi:lightning-bolt",
     "max": 100,
     "color": "#7cb342"
    },
    {
     "entity": "sensor.garmin_connect_floors_ascended",
     "name": "Floors",
     "max_entity": "sensor.garmin_connect_floors_ascended_goal",
     "color": "#8d6e63",
     "tap_action": {
      "action": "more-info"
     },
     "hold_action": {
      "action": "navigate",
      "navigation_path": "/lovelace/fitness"
     }
    },
    {
     "entity": "sensor.garmin_connect_last_activity",
     "attribute": "duration",
     "name": "Duration",
     "units": "s",
     "max": 7200,
     "color": "#9c27b0"
    }
   ]
  }
 },
 {
  "id": "bars",
  "source": "examples/designs/bars.yaml",
  "title": "bars",
  "layout": "card",
  "config": {
   "title": "Today",
   "layout": "bars",
   "show_units": true,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_resting_heart_rate"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "name": "Steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_distance",
     "name": "Distance",
     "max": 10000,
     "color": "#00b294"
    },
    {
     "entity": "sensor.garmin_connect_calories",
     "name": "Calories",
     "max": 2500,
     "color": "#ff7043"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "name": "Intensity minutes",
     "max_attribute": "goal",
     "color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_hydration",
     "name": "Hydration",
     "max_entity": "sensor.garmin_connect_hydration_goal",
     "color": "#03a9f4"
    }
   ]
  }
 },
 {
  "id": "colors-and-themes",
  "source": "examples/designs/colors-and-themes.yaml",
  "title": "colors and themes",
  "layout": "card",
  "config": {
   "title": "Colorful",
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "name": "Steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "name": "Battery",
     "max": 100,
     "color": "#14308D"
    },
    {
     "entity": "sensor.garmin_connect_average_stress_level",
     "name": "Stress",
     "max": 100,
     "color_stops": {
      "0": "#43a047",
      "25": "#fdd835",
      "50": "#fb8c00",
      "75": "#e53935"
     }
    },
    {
     "entity": "sensor.garmin_connect_latest_spo2",
     "name": "SpO2",
     "max": 100,
     "color_stops": {
      "0": "#e53935",
      "90": "#fb8c00",
      "95": "#43a047"
     }
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "name": "Sleep",
     "max": 100,
     "icon_color": "#7e57c2"
    }
   ]
  }
 },
 {
  "id": "compact-tile",
  "source": "examples/designs/compact-tile.yaml",
  "title": "compact tile",
  "layout": "card",
  "config": {
   "header": false,
   "columns": 2,
   "ring_size": 30,
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "name": "Steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "name": "Battery",
     "max": 100,
     "color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "name": "Sleep",
     "max": 100,
     "color": "#7e57c2"
    },
    {
     "entity": "sensor.garmin_connect_training_readiness",
     "name": "Ready",
     "max": 100,
     "color": "#ffb300"
    }
   ]
  }
 },
 {
  "id": "header-first",
  "source": "examples/designs/header-first.yaml",
  "title": "header first",
  "layout": "card",
  "config": {
   "title": "Markus",
   "battery_entity": "sensor.fenix_7_battery",
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_resting_heart_rate",
     "show_units": true,
     "icon_color": "#e53935"
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "show_units": true,
     "icon_color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "icon_color": "#7e57c2"
    },
    {
     "entity": "sensor.garmin_connect_steps",
     "show_units": true,
     "icon_color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_last_activity",
     "name": "Last activity"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "name": "Step goal",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "name": "Intensity",
     "max_attribute": "goal",
     "color": "#43a047"
    }
   ]
  }
 },
 {
  "id": "rings-auto-columns",
  "source": "examples/designs/rings-auto-columns.yaml",
  "title": "rings auto columns",
  "layout": "card",
  "config": {
   "title": "Today",
   "show_units": true,
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal",
     "color": "deepskyblue"
    },
    {
     "entity": "sensor.garmin_connect_distance",
     "max": 10000,
     "color": "#00b294"
    },
    {
     "entity": "sensor.garmin_connect_calories",
     "max": 2500,
     "color": "#ff7043"
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "max_attribute": "goal",
     "color": "#43a047"
    },
    {
     "entity": "sensor.garmin_connect_floors_ascended",
     "max_entity": "sensor.garmin_connect_floors_ascended_goal",
     "color": "#8d6e63"
    }
   ]
  }
 },
 {
  "id": "rings-dense",
  "source": "examples/designs/rings-dense.yaml",
  "title": "rings dense",
  "layout": "card",
  "config": {
   "header": false,
   "layout": "rings",
   "columns": 3,
   "ring_size": 34,
   "entities": [
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "name": "Sleep",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_training_readiness",
     "name": "Ready",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "name": "Battery",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_average_stress_level",
     "name": "Stress",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_latest_spo2",
     "name": "SpO2",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_hrv_last_night_average",
     "name": "HRV",
     "max": 100
    }
   ]
  }
 },
 {
  "id": "rings-wide",
  "source": "examples/designs/rings-wide.yaml",
  "title": "rings wide",
  "layout": "card",
  "config": {
   "title": "All metrics",
   "show_units": true,
   "columns": 4,
   "ring_size": 40,
   "header_entities": [
    {
     "entity": "sensor.garmin_connect_training_status",
     "name": "Status"
    }
   ],
   "entities": [
    {
     "entity": "sensor.garmin_connect_steps",
     "max_entity": "sensor.garmin_connect_daily_step_goal"
    },
    {
     "entity": "sensor.garmin_connect_distance",
     "max": 10000
    },
    {
     "entity": "sensor.garmin_connect_calories",
     "max": 2500
    },
    {
     "entity": "sensor.garmin_connect_intensity_minutes",
     "max_attribute": "goal"
    },
    {
     "entity": "sensor.garmin_connect_sleep_score",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_body_battery",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_training_readiness",
     "max": 100
    },
    {
     "entity": "sensor.garmin_connect_hydration",
     "max_entity": "sensor.garmin_connect_hydration_goal"
    }
   ]
  }
 }
];

window.PREVIEW_DASHBOARDS = [
 {
  "id": "fitness-dashboard",
  "source": "examples/dashboards/fitness-dashboard.yaml",
  "title": "fitness dashboard",
  "views": [
   {
    "title": "Fitness",
    "path": "fitness",
    "icon": "mdi:watch",
    "type": "sections",
    "max_columns": 4,
    "sections": [
     {
      "type": "grid",
      "cards": [
       {
        "type": "heading",
        "heading": "Today",
        "icon": "mdi:walk"
       },
       {
        "type": "custom:garmin-card",
        "title": "Markus",
        "battery_entity": "sensor.fenix_7_battery",
        "show_units": true,
        "header_entities": [
         {
          "entity": "sensor.garmin_connect_resting_heart_rate",
          "icon_color": "#e53935"
         },
         {
          "entity": "sensor.garmin_connect_body_battery",
          "icon_color": "#43a047"
         },
         {
          "entity": "sensor.garmin_connect_sleep_score",
          "icon_color": "#7e57c2"
         }
        ],
        "entities": [
         {
          "entity": "sensor.garmin_connect_steps",
          "max_entity": "sensor.garmin_connect_daily_step_goal",
          "color": "deepskyblue"
         },
         {
          "entity": "sensor.garmin_connect_distance",
          "name": "Distance",
          "max": 10000,
          "color": "#00b294"
         },
         {
          "entity": "sensor.garmin_connect_calories",
          "name": "Calories",
          "max": 2500,
          "color": "#ff7043"
         },
         {
          "entity": "sensor.garmin_connect_intensity_minutes",
          "name": "Intensity",
          "max_attribute": "goal",
          "color_stops": {
           "0": "#607d8b",
           "50": "#ffb300",
           "80": "#43a047"
          }
         },
         {
          "entity": "sensor.garmin_connect_floors_ascended",
          "name": "Floors",
          "max_entity": "sensor.garmin_connect_floors_ascended_goal",
          "color": "#8d6e63"
         }
        ]
       },
       {
        "type": "custom:garmin-card",
        "title": "Scores",
        "layout": "bars",
        "header": false,
        "entities": [
         {
          "entity": "sensor.garmin_connect_sleep_score",
          "name": "Sleep score",
          "max": 100,
          "color": "#7e57c2"
         },
         {
          "entity": "sensor.garmin_connect_training_readiness",
          "name": "Training readiness",
          "max": 100,
          "show_units": true,
          "color": "#007cc0"
         },
         {
          "entity": "sensor.garmin_connect_body_battery",
          "name": "Body battery",
          "max": 100,
          "show_units": true,
          "color": "#10a13c"
         },
         {
          "entity": "sensor.garmin_connect_average_stress_level",
          "name": "Stress level",
          "max": 100,
          "color": "#ff9800"
         }
        ]
       }
      ]
     },
     {
      "type": "grid",
      "cards": [
       {
        "type": "heading",
        "heading": "Sleep",
        "icon": "mdi:sleep"
       },
       {
        "type": "custom:garmin-card",
        "title": "Last night",
        "show_units": true,
        "header_entities": [
         {
          "entity": "sensor.garmin_connect_bedtime",
          "name": "Bedtime"
         },
         {
          "entity": "sensor.garmin_connect_wake_time",
          "name": "Wake"
         }
        ],
        "entities": [
         {
          "entity": "sensor.garmin_connect_sleep_duration",
          "name": "Sleep",
          "max_entity": "sensor.garmin_connect_sleep_need",
          "color": "#7e57c2"
         },
         {
          "entity": "sensor.garmin_connect_deep_sleep",
          "name": "Deep",
          "max": 120,
          "color": "#3949ab"
         },
         {
          "entity": "sensor.garmin_connect_rem_sleep",
          "name": "REM",
          "max": 120,
          "color": "#00acc1"
         },
         {
          "entity": "sensor.garmin_connect_light_sleep",
          "name": "Light",
          "max": 300,
          "color": "#26a69a"
         },
         {
          "entity": "sensor.garmin_connect_awake_time",
          "name": "Awake",
          "max": 60,
          "color": "#ffb300"
         }
        ]
       },
       {
        "type": "custom:garmin-card",
        "title": "Recovery",
        "header": false,
        "columns": 2,
        "show_units": true,
        "entities": [
         {
          "entity": "sensor.garmin_connect_hrv_last_night_average",
          "name": "HRV",
          "max": 100,
          "color": "#8e24aa"
         },
         {
          "entity": "sensor.garmin_connect_recovery_time",
          "name": "Recovery",
          "max": 1440,
          "color": "#8d6e63"
         }
        ]
       }
      ]
     },
     {
      "type": "grid",
      "cards": [
       {
        "type": "heading",
        "heading": "Training",
        "icon": "mdi:run"
       },
       {
        "type": "custom:garmin-card",
        "title": "Fitness",
        "show_units": true,
        "header_entities": [
         {
          "entity": "sensor.garmin_connect_training_status",
          "name": "Status"
         },
         {
          "entity": "sensor.garmin_connect_fitness_age",
          "name": "Fitness age"
         }
        ],
        "entities": [
         {
          "entity": "sensor.garmin_connect_training_readiness",
          "name": "Readiness",
          "max": 100,
          "color_stops": {
           "0": "#e53935",
           "40": "#fb8c00",
           "60": "#fdd835",
           "80": "#43a047"
          }
         },
         {
          "entity": "sensor.garmin_connect_vo2_max",
          "name": "VO2 max",
          "max": 60,
          "color": "#00897b"
         },
         {
          "entity": "sensor.garmin_connect_endurance_score",
          "name": "Endurance",
          "max": 5000,
          "color": "#00acc1"
         },
         {
          "entity": "sensor.garmin_connect_hill_score",
          "name": "Hill",
          "max": 100,
          "color": "#6d4c41"
         }
        ]
       },
       {
        "type": "custom:garmin-card",
        "title": "Last activity",
        "layout": "bars",
        "header_entities": [
         {
          "entity": "sensor.garmin_connect_last_activity",
          "name": "Activity",
          "icon": "mdi:run-fast"
         },
         {
          "entity": "sensor.garmin_connect_next_scheduled_workout",
          "name": "Next"
         }
        ],
        "entities": [
         {
          "entity": "sensor.garmin_connect_last_activity",
          "attribute": "distance",
          "name": "Distance",
          "units": "m",
          "max": 10000,
          "show_units": true,
          "color": "#9c27b0"
         },
         {
          "entity": "sensor.garmin_connect_last_activity",
          "attribute": "duration",
          "name": "Duration",
          "units": "s",
          "max": 7200,
          "show_units": true,
          "color": "#5c6bc0"
         }
        ]
       }
      ]
     },
     {
      "type": "grid",
      "cards": [
       {
        "type": "heading",
        "heading": "Body",
        "icon": "mdi:scale-bathroom"
       },
       {
        "type": "custom:garmin-card",
        "title": "Body",
        "show_units": true,
        "header_entities": [
         {
          "entity": "sensor.garmin_connect_metabolic_age",
          "name": "Metab. age"
         },
         {
          "entity": "sensor.garmin_connect_bone_mass"
         }
        ],
        "entities": [
         {
          "entity": "sensor.garmin_connect_weight",
          "name": "Weight",
          "max": 90,
          "color": "#5c6bc0"
         },
         {
          "entity": "sensor.garmin_connect_body_fat",
          "name": "Body fat",
          "max": 40,
          "color": "#ef6c00"
         },
         {
          "entity": "sensor.garmin_connect_muscle_mass",
          "name": "Muscle",
          "max": 45,
          "color": "#00897b"
         },
         {
          "entity": "sensor.garmin_connect_hydration",
          "name": "Water",
          "max_entity": "sensor.garmin_connect_hydration_goal",
          "color": "#03a9f4"
         }
        ]
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "masonry-dashboard",
  "source": "examples/dashboards/masonry-dashboard.yaml",
  "title": "masonry dashboard",
  "views": [
   {
    "title": "Fitness",
    "path": "fitness",
    "icon": "mdi:watch",
    "cards": [
     {
      "type": "custom:garmin-card",
      "title": "Today",
      "battery_entity": "sensor.fenix_7_battery",
      "show_units": true,
      "header_entities": [
       {
        "entity": "sensor.garmin_connect_resting_heart_rate",
        "icon_color": "#e53935"
       },
       {
        "entity": "sensor.garmin_connect_body_battery",
        "icon_color": "#43a047"
       },
       {
        "entity": "sensor.garmin_connect_sleep_score",
        "icon_color": "#7e57c2"
       }
      ],
      "entities": [
       {
        "entity": "sensor.garmin_connect_steps",
        "max_entity": "sensor.garmin_connect_daily_step_goal",
        "color": "deepskyblue"
       },
       {
        "entity": "sensor.garmin_connect_distance",
        "name": "Distance",
        "max": 10000,
        "color": "#00b294"
       },
       {
        "entity": "sensor.garmin_connect_intensity_minutes",
        "name": "Intensity",
        "max_attribute": "goal",
        "color": "#43a047"
       }
      ]
     },
     {
      "type": "custom:garmin-card",
      "title": "Sleep",
      "show_units": true,
      "entities": [
       {
        "entity": "sensor.garmin_connect_sleep_duration",
        "name": "Sleep",
        "max_entity": "sensor.garmin_connect_sleep_need",
        "color": "#7e57c2"
       },
       {
        "entity": "sensor.garmin_connect_sleep_score",
        "name": "Score",
        "max": 100,
        "color_stops": {
         "0": "#e53935",
         "60": "#fb8c00",
         "80": "#43a047"
        }
       }
      ]
     },
     {
      "type": "custom:garmin-card",
      "title": "Training",
      "layout": "bars",
      "show_units": true,
      "header_entities": [
       {
        "entity": "sensor.garmin_connect_training_status",
        "name": "Status"
       }
      ],
      "entities": [
       {
        "entity": "sensor.garmin_connect_training_readiness",
        "name": "Training readiness",
        "max": 100,
        "color": "#007cc0"
       },
       {
        "entity": "sensor.garmin_connect_hrv_last_night_average",
        "name": "HRV last night",
        "max": 100,
        "color": "#8e24aa"
       },
       {
        "entity": "sensor.garmin_connect_recovery_time",
        "name": "Recovery time",
        "max": 1440,
        "color": "#8d6e63"
       },
       {
        "entity": "sensor.garmin_connect_vo2_max",
        "name": "VO2 max",
        "max": 60,
        "color": "#00897b"
       }
      ]
     },
     {
      "type": "custom:garmin-card",
      "title": "Hydration",
      "header": false,
      "layout": "bars",
      "entities": [
       {
        "entity": "sensor.garmin_connect_hydration",
        "name": "Water",
        "max_entity": "sensor.garmin_connect_hydration_goal",
        "show_units": true,
        "color": "#03a9f4"
       },
       {
        "entity": "sensor.garmin_connect_hydration_sweat_loss",
        "name": "Sweat loss",
        "max": 1500,
        "show_units": true,
        "color": "#0288d1"
       }
      ]
     }
    ]
   }
  ]
 }
];
