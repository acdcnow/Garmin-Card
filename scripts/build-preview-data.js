/**
 * Builds docs/preview/cards.js from the example YAML files plus a realistic
 * fake Home Assistant state set, so the preview harness can render every
 * example with the real card code.
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "docs", "preview", "cards.js");

/* ------------------------------------------------------------------ states */

const st = (state, name, unit, icon, extra = {}) => {
  const attributes = { friendly_name: name, ...extra };
  if (unit) attributes.unit_of_measurement = unit;
  else if (typeof state === "number") attributes.state_class = "measurement";
  if (icon) attributes.icon = icon;
  return { state: String(state), attributes };
};

const GARMIN = {
  // activity & steps
  steps: st(8432, "Steps", "steps", "mdi:walk", { state_class: "total_increasing" }),
  daily_step_goal: st(10000, "Daily step goal", "steps", "mdi:target"),
  distance: st(6420, "Distance", "m", undefined, { device_class: "distance" }, "mdi:map-marker-distance"),
  yesterday_steps: st(11250, "Yesterday steps", "steps", "mdi:walk"),
  yesterday_distance: st(8640, "Yesterday distance", "m", undefined, { device_class: "distance" }, "mdi:map-marker-distance"),
  weekly_step_average: st(9120, "Weekly step average", "steps", "mdi:walk"),
  weekly_distance_avg: st(7240, "Weekly distance average", "m", undefined, { device_class: "distance" }, "mdi:map-marker-distance"),
  floors_ascended: st(12, "Floors ascended", "floors", "mdi:stairs-up"),
  floors_ascended_goal: st(20, "Floors ascended goal", "floors", "mdi:target"),
  floors_descended: st(9, "Floors descended", "floors", "mdi:stairs-down"),
  // calories
  calories: st(1834, "Calories", "kcal", "mdi:fire"),
  active_calories: st(780, "Active calories", "kcal", "mdi:fire"),
  bmr_calories: st(1054, "BMR calories", "kcal", "mdi:fire"),
  burned_calories: st(1834, "Burned calories", "kcal", "mdi:fire"),
  consumed_calories: st(1420, "Consumed calories", "kcal", "mdi:food-apple"),
  remaining_calories: st(366, "Remaining calories", "kcal", "mdi:food-apple"),
  // heart rate
  resting_heart_rate: st(48, "Resting heart rate", "bpm", "mdi:heart-pulse"),
  min_heart_rate: st(44, "Min heart rate", "bpm", "mdi:heart-outline"),
  max_heart_rate: st(152, "Max heart rate", "bpm", "mdi:heart"),
  "7_day_average_resting_heart_rate": st(50, "7-day average resting heart rate", "bpm", "mdi:heart-pulse"),
  min_avg_heart_rate: st(62, "Min average heart rate", "bpm", "mdi:heart-outline"),
  max_avg_heart_rate: st(128, "Max average heart rate", "bpm", "mdi:heart"),
  abnormal_heart_rate_alerts: st(0, "Abnormal heart rate alerts", undefined, "mdi:alert"),
  // hrv
  hrv_status: st("balanced", "HRV status", undefined, "mdi:heart-flash"),
  hrv_weekly_average: st(58, "HRV weekly average", "ms", "mdi:heart-flash"),
  hrv_last_night_average: st(62, "HRV last night average", "ms", "mdi:heart-flash"),
  hrv_last_night_5min_high: st(88, "HRV last night 5-min high", "ms", "mdi:heart-flash"),
  hrv_baseline: st(70, "HRV baseline", "ms", "mdi:heart-flash", { baseline: { lowUpper: 42, balancedLow: 44, balancedUpper: 66 } }),
  // stress
  average_stress_level: st(32, "Average stress level", undefined, "mdi:emoticon-outline"),
  max_stress_level: st(78, "Max stress level", undefined, "mdi:emoticon-outline"),
  stress_qualifier: st("balanced", "Stress qualifier", undefined, "mdi:emoticon-outline"),
  stress_duration: st(210, "Stress duration", "min", "mdi:emoticon-outline"),
  rest_stress_duration: st(420, "Rest stress duration", "min", "mdi:emoticon-happy-outline"),
  activity_stress_duration: st(90, "Activity stress duration", "min", "mdi:run"),
  low_stress_duration: st(120, "Low stress duration", "min", "mdi:emoticon-happy-outline"),
  medium_stress_duration: st(70, "Medium stress duration", "min", "mdi:emoticon-neutral-outline"),
  high_stress_duration: st(20, "High stress duration", "min", "mdi:emoticon-sad-outline"),
  // sleep
  sleep_score: st(81, "Sleep score", undefined, "mdi:sleep"),
  sleep_need: st(480, "Sleep need", "min", "mdi:sleep"),
  sleep_duration: st(432, "Sleep duration", "min", "mdi:sleep"),
  total_sleep_duration: st(450, "Total sleep duration", "min", "mdi:sleep"),
  awake_time: st(18, "Awake time", "min", "mdi:eye-outline"),
  deep_sleep: st(78, "Deep sleep", "min", "mdi:power-sleep"),
  light_sleep: st(240, "Light sleep", "min", "mdi:sleep"),
  rem_sleep: st(96, "REM sleep", "min", "mdi:weather-night"),
  nap_time: st(0, "Nap time", "min", "mdi:sleep"),
  bedtime: st("2026-09-28T23:12:00+02:00", "Bedtime", undefined, "mdi:sleep", { device_class: "timestamp" }),
  wake_time: st("2026-09-29T06:48:00+02:00", "Wake time", undefined, "mdi:sleep", { device_class: "timestamp" }),
  optimal_bedtime: st("2026-09-28T22:45:00+02:00", "Optimal bedtime", undefined, "mdi:sleep", { device_class: "timestamp" }),
  optimal_wake_time: st("2026-09-29T06:15:00+02:00", "Optimal wake time", undefined, "mdi:sleep", { device_class: "timestamp" }),
  unmeasurable_sleep: st(12, "Unmeasurable sleep", "min", "mdi:sleep"),
  // body battery
  body_battery: st(72, "Body battery", "%", "mdi:battery-heart"),
  body_battery_charged: st(45, "Body battery charged", undefined, "mdi:battery-plus"),
  body_battery_drained: st(38, "Body battery drained", undefined, "mdi:battery-minus"),
  body_battery_highest: st(88, "Body battery highest", undefined, "mdi:battery-heart"),
  body_battery_lowest: st(21, "Body battery lowest", undefined, "mdi:battery-heart"),
  // training
  training_readiness: st(64, "Training readiness", "%", "mdi:lightning-bolt", {
    level: "moderate", sleep_score: 81, recovery_score: 68, hrv_status: "balanced", acute_load: 412,
  }),
  morning_training_readiness: st(71, "Morning training readiness", "%", "mdi:lightning-bolt"),
  training_status: st("productive", "Training status", undefined, "mdi:chart-line"),
  recovery_time: st(1320, "Recovery time", "min", "mdi:timer-sand"),
  vo2_max: st(47, "VO2 max", "mL/(kgÂ·min)", "mdi:lungs"),
  endurance_score: st(4620, "Endurance score", undefined, "mdi:run"),
  hill_score: st(63, "Hill score", undefined, "mdi:image-filter-hdr"),
  fitness_age: st(41, "Fitness age", "years", "mdi:calendar-heart"),
  achievable_fitness_age: st(38, "Achievable fitness age", "years", "mdi:calendar-heart"),
  previous_fitness_age: st(42, "Previous fitness age", "years", "mdi:calendar-heart"),
  chronological_age: st(47, "Chronological age", "years", "mdi:calendar-heart"),
  lactate_threshold_heart_rate: st(168, "Lactate threshold heart rate", "bpm", "mdi:heart-pulse"),
  lactate_threshold_speed: st(3.42, "Lactate threshold speed", "m/s", "mdi:speedometer"),
  power_to_weight_running: st(4.12, "Power to Weight Running", "W/kg", "mdi:lightning-bolt"),
  functional_threshold_power_cycling: st(268, "FTP Cycling", "W", "mdi:bike-fast"),
  // body composition
  weight: st(82.4, "Weight", "kg", "mdi:scale-bathroom"),
  bmi: st(24.1, "BMI", undefined, "mdi:human-male-height"),
  body_fat: st(21.5, "Body fat", "%", "mdi:percent"),
  body_water: st(55.2, "Body water", "%", "mdi:water-percent"),
  muscle_mass: st(34.8, "Muscle mass", "kg", "mdi:arm-flex"),
  bone_mass: st(3.4, "Bone mass", "kg", "mdi:human-male"),
  visceral_fat: st(9, "Visceral fat", undefined, "mdi:percent"),
  metabolic_age: st(39, "Metabolic age", "years", "mdi:calendar-heart"),
  physique_rating: st(5, "Physique rating", undefined, "mdi:human-male"),
  // hydration & nutrition
  hydration: st(1450, "Hydration", "ml", "mdi:cup-water"),
  hydration_goal: st(2500, "Hydration goal", "ml", "mdi:target"),
  hydration_daily_average: st(1780, "Hydration daily average", "ml", "mdi:cup-water"),
  hydration_sweat_loss: st(620, "Hydration sweat loss", "ml", "mdi:water-percent"),
  hydration_activity_intake: st(400, "Hydration activity intake", "ml", "mdi:cup-water"),
  nutrition_consumed_calories: st(1840, "Nutrition consumed calories", "kcal", "mdi:food-apple", {
    meals: [{ name: "Breakfast", calories: 420 }, { name: "Lunch", calories: 780 }, { name: "Snack", calories: 640 }],
  }),
  nutrition_calorie_goal: st(2200, "Nutrition calorie goal", "kcal", "mdi:target"),
  nutrition_consumed_protein: st(96, "Nutrition consumed protein", "g", "mdi:food-steak"),
  nutrition_protein_goal: st(140, "Nutrition protein goal", "g", "mdi:target"),
  nutrition_consumed_carbohydrates: st(210, "Nutrition consumed carbohydrates", "g", "mdi:bread-slice"),
  nutrition_carbohydrates_goal: st(250, "Nutrition carbohydrates goal", "g", "mdi:target"),
  nutrition_consumed_fat: st(58, "Nutrition consumed fat", "g", "mdi:oil"),
  nutrition_fat_goal: st(70, "Nutrition fat goal", "g", "mdi:target"),
  nutrition_remaining_calories: st(360, "Nutrition remaining calories", "kcal", "mdi:food-apple"),
  nutrition_logged_entries: st(3, "Nutrition logged entries", undefined, "mdi:food-apple"),
  // intensity
  intensity_minutes: st(96, "Intensity minutes", "min", "mdi:lightning-bolt", { moderate_minutes: 60, vigorous_minutes: 18, goal: 150 }),
  intensity_minutes_goal: st(150, "Intensity minutes goal", "min", "mdi:target"),
  moderate_intensity_minutes: st(60, "Moderate intensity minutes", "min", "mdi:walk"),
  vigorous_intensity_minutes: st(18, "Vigorous intensity minutes", "min", "mdi:run"),
  // health monitoring
  latest_spo2: st(96, "Latest SpO2", "%", "mdi:lungs"),
  average_spo2: st(95, "Average SpO2", "%", "mdi:lungs"),
  lowest_spo2: st(92, "Lowest SpO2", "%", "mdi:lungs"),
  latest_spo2_time: st("2026-09-29T05:42:00+02:00", "Latest SpO2 time", undefined, "mdi:lungs", { device_class: "timestamp" }),
  latest_respiration: st(14, "Latest respiration", "brpm", "mdi:lungs"),
  average_sleep_respiration: st(13, "Average sleep respiration", "brpm", "mdi:lungs"),
  lowest_respiration: st(11, "Lowest respiration", "brpm", "mdi:lungs"),
  highest_respiration: st(19, "Highest respiration", "brpm", "mdi:lungs"),
  skin_temperature_change: st(0.3, "Skin temperature change", "Â°C", "mdi:thermometer", { calibration_days: 19 }),
  avg_altitude: st(186, "Average altitude", "m", "mdi:image-filter-hdr"),
  // goals & achievements
  active_goals: st(2, "Active goals", undefined, "mdi:target", {
    goals: [{ name: "Run 100 km this month", type: "distance", target_value: 100000, current_value: 51200, progress_percent: 51 }],
  }),
  future_goals: st(3, "Future goals", undefined, "mdi:target"),
  goals_history: st(7, "Goals history", undefined, "mdi:target"),
  badges: st(86, "Badges", undefined, "mdi:medal", { badges: [{ name: "Weekend 5K", points: 5, earned_date: "2026-09-21" }] }),
  user_points: st(12480, "User points", undefined, "mdi:star"),
  user_level: st(4, "User level", undefined, "mdi:star"),
  // activity tracking
  last_activity: st("Morning Run", "Last activity", undefined, "mdi:run-fast", {
    activityId: 12345678901, distance: 7312, duration: 2410, activityType: "running",
    startTime: "2026-09-29T06:12:00+02:00", averageHR: 142, calories: 486,
  }),
  last_activities: st(4, "Last activities", undefined, "mdi:run-fast", { last_activities: [] }),
  last_activity_route: st(1840, "Last activity route", undefined, "mdi:map-marker-path", { has_polyline: true, activity_name: "Morning Run" }),
  last_workout: st("Threshold Run", "Last workout", undefined, "mdi:dumbbell"),
  last_workouts: st(2, "Last workouts", undefined, "mdi:dumbbell"),
  next_scheduled_workout: st("Threshold Run 8x400m", "Next scheduled workout", undefined, "mdi:calendar-clock"),
  "today_s_scheduled_workout": st("Base Run 45min", "Today's scheduled workout", undefined, "mdi:calendar-today"),
  training_plan_goal_event: st("Vienna City Marathon", "Training plan goal event", undefined, "mdi:flag-checkered", {
    days_until_event: 38, distance: 42195, date: "2026-11-06", predicted_time: 13080,
  }),
  last_synced: st("2026-09-29T07:58:00+02:00", "Last synced", undefined, "mdi:sync", { device_class: "timestamp" }),
  // blood pressure
  blood_pressure_systolic: st(118, "Blood pressure systolic", "mmHg", "mdi:heart-pulse", { diastolic: 76, pulse: 62, category_code: 1 }),
  blood_pressure_diastolic: st(76, "Blood pressure diastolic", "mmHg", "mdi:heart-pulse"),
  blood_pressure_pulse: st(62, "Blood pressure pulse", "bpm", "mdi:heart-pulse"),
  blood_pressure_category: st("Normal", "Blood pressure category", undefined, "mdi:heart-pulse"),
  // gear, devices, solar
  devices: st(3, "Devices", undefined, "mdi:watch", { devices: [], last_used_device: "fenix 7" }),
  connected_sensors: st(4, "Connected sensors", undefined, "mdi:bluetooth-connect", { sensors: [] }),
  solar_intensity: st(78, "Solar intensity", "%", "mdi:white-balance-sunny", { devices: [] }),
  average_solar_intensity: st(64, "Average solar intensity", "%", "mdi:white-balance-sunny"),
  solar_time_gained: st(42, "Solar time gained", "min", "mdi:white-balance-sunny"),
};

const EXTRA = {
  "sensor.fenix_7_battery": st(62, "fenix 7 battery", "%", "mdi:battery-60"),
  "sensor.garmin_connect_my_running_shoes": st(512000, "My Running Shoes", "m", "mdi:shoe-sneaker", {
    gear_uuid: "8ba0a5f7-1e4d-4d1e-9a20-9d2f5ea45f5e",
    total_activities: 42,
    gear_make_name: "Hoka",
    gear_model_name: "Speedgoat 6",
    maximum_meters: 800000,
    default_for_activity: ["running"],
  }),
  "sensor.time": st("08:14", "Time", undefined, "mdi:clock"),
};

const states = {};
Object.entries(GARMIN).forEach(([key, value]) => {
  states[`sensor.garmin_connect_${key}`] = { entity_id: `sensor.garmin_connect_${key}`, ...value };
});
Object.entries(EXTRA).forEach(([entityId, value]) => {
  states[entityId] = { entity_id: entityId, ...value };
});

/* ------------------------------------------------------------------ configs */

const read = (file) => yaml.load(fs.readFileSync(path.join(REPO, file), "utf8"));
const list = (dir) =>
  fs
    .readdirSync(path.join(REPO, dir))
    .filter((name) => /\.ya?ml$/.test(name))
    .sort()
    .map((name) => `${dir}/${name}`);

const cleanConfig = (config) => {
  const copy = { ...config };
  delete copy.type;
  delete copy.view_layout;
  delete copy.grid_options;
  return copy;
};

const cards = [];
list("examples/cards").forEach((file) => {
  const config = read(file);
  cards.push({
    id: path.basename(file, ".yaml").replace(/^\d+-/, ""),
    source: file,
    title: path.basename(file, ".yaml").replace(/^\d+-/, "").replace(/-/g, " "),
    layout: "card",
    config: cleanConfig(config),
  });
});
list("examples/designs").forEach((file) => {
  cards.push({
    id: path.basename(file, ".yaml").replace(/^\d+-/, ""),
    source: file,
    title: path.basename(file, ".yaml").replace(/-/g, " "),
    layout: "card",
    config: cleanConfig(read(file)),
  });
});

const dashboards = list("examples/dashboards").map((file) => ({
  id: path.basename(file, ".yaml"),
  source: file,
  title: path.basename(file, ".yaml").replace(/-/g, " "),
  views: read(file).views,
}));

/* ------------------------------------------------------- referenced entities */

const referenced = new Set();
const collect = (node) => {
  if (Array.isArray(node)) return node.forEach(collect);
  if (!node || typeof node !== "object") return;
  if (typeof node.entity === "string") referenced.add(node.entity);
  if (typeof node.max_entity === "string") referenced.add(node.max_entity);
  if (typeof node.battery_entity === "string") referenced.add(node.battery_entity);
  Object.values(node).forEach(collect);
};
collect(cards.map((card) => card.config));
collect(dashboards.map((dashboard) => dashboard.views));

const missing = [...referenced].filter((entityId) => !states[entityId]);
if (missing.length) {
  console.error("Missing fake states for:");
  missing.forEach((entityId) => console.error(`  - ${entityId}`));
}

/* --------------------------------------------------------------------- write */

const out = `/**
 * Generated from the example YAML files by the preview generator.
 * Contains the card configuration of every example plus a realistic fake
 * \`hass\` state set, so the preview harness can render the examples with the
 * real card code.
 *
 * Cards: ${cards.length}, dashboards: ${dashboards.length}, states: ${Object.keys(states).length}
 */
window.PREVIEW_STATES = ${JSON.stringify(states, null, 1)};

window.PREVIEW_CARDS = ${JSON.stringify(cards, null, 1)};

window.PREVIEW_DASHBOARDS = ${JSON.stringify(dashboards, null, 1)};
`;

fs.writeFileSync(OUT, out.replace(/\r\n/g, "\n"), "utf8");
console.log(
  `wrote ${OUT}: ${cards.length} cards, ${dashboards.length} dashboards, ` +
    `${Object.keys(states).length} states, ${referenced.size} referenced entities, ` +
    `${missing.length} missing, ${out.length} bytes`
);




