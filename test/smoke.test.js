/**
 * Smoke test for Garmin Card.
 *
 * Boots the card inside jsdom with a fake `hass` object and checks rendering,
 * goal resolution, attribute handling, the visual editor and the config
 * validation.
 *
 *   npm install
 *   npm test
 *
 * Run against another file: `node test/smoke.test.js path/to/garmin-card.js`
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const CARD_PATH = process.argv[2] || path.resolve(__dirname, "../dist/garmin-card.js");
const source = fs.readFileSync(CARD_PATH, "utf8");

const dom = new JSDOM(`<!doctype html><html><body><home-assistant></home-assistant></body></html>`, {
  runScripts: "dangerously",
  pretendToBeVisual: true,
  url: "http://localhost/",
});

const { window } = dom;
const { document } = window;

const script = document.createElement("script");
script.textContent = source;
document.body.appendChild(script);

/* -------------------------------------------------------------------------- */
/* Fake Home Assistant                                                        */
/* -------------------------------------------------------------------------- */

const calls = [];

function makeState(entityId, state, attributes = {}) {
  return {
    entity_id: entityId,
    state: String(state),
    attributes: { friendly_name: entityId, ...attributes },
    last_updated: "2026-09-29T10:00:00+00:00",
  };
}

function parts(value, unit) {
  if (value === undefined || value === null) return [{ type: "value", value: "" }];
  return unit
    ? [
        { type: "value", value: String(value) },
        { type: "literal", value: " " },
        { type: "unit", value: unit },
      ]
    : [{ type: "value", value: String(value) }];
}

const states = {
  "sensor.garmin_connect_steps": makeState("sensor.garmin_connect_steps", 8432, {
    friendly_name: "Steps",
    unit_of_measurement: "steps",
    icon: "mdi:walk",
    state_class: "total_increasing",
  }),
  "sensor.garmin_connect_daily_step_goal": makeState(
    "sensor.garmin_connect_daily_step_goal",
    10000,
    { friendly_name: "Daily step goal", unit_of_measurement: "steps" }
  ),
  "sensor.garmin_connect_distance": makeState("sensor.garmin_connect_distance", 6.42, {
    friendly_name: "Distance",
    unit_of_measurement: "km",
  }),
  "sensor.garmin_connect_calories": makeState("sensor.garmin_connect_calories", 2410, {
    friendly_name: "Calories",
    unit_of_measurement: "kcal",
  }),
  "sensor.garmin_connect_active_calories": makeState(
    "sensor.garmin_connect_active_calories",
    780,
    { friendly_name: "Active calories", unit_of_measurement: "kcal" }
  ),
  "sensor.garmin_connect_floors_ascended": makeState(
    "sensor.garmin_connect_floors_ascended",
    12,
    { friendly_name: "Floors ascended" }
  ),
  "sensor.garmin_connect_floors_ascended_goal": makeState(
    "sensor.garmin_connect_floors_ascended_goal",
    20,
    { friendly_name: "Floors ascended goal" }
  ),
  "sensor.garmin_connect_intensity_minutes": makeState(
    "sensor.garmin_connect_intensity_minutes",
    42,
    { friendly_name: "Intensity minutes", unit_of_measurement: "min", goal: 150 }
  ),
  "sensor.garmin_connect_resting_heart_rate": makeState(
    "sensor.garmin_connect_resting_heart_rate",
    48,
    { friendly_name: "Resting heart rate", unit_of_measurement: "bpm", icon: "mdi:heart-pulse" }
  ),
  "sensor.garmin_connect_body_battery": makeState("sensor.garmin_connect_body_battery", 72, {
    friendly_name: "Body battery",
    unit_of_measurement: "%",
    icon: "mdi:battery-heart",
  }),
  "sensor.garmin_connect_sleep_score": makeState("sensor.garmin_connect_sleep_score", 81, {
    friendly_name: "Sleep score",
  }),
  "sensor.garmin_connect_training_readiness": makeState(
    "sensor.garmin_connect_training_readiness",
    64,
    { friendly_name: "Training readiness", unit_of_measurement: "%" }
  ),
  "sensor.garmin_connect_last_activity": makeState(
    "sensor.garmin_connect_last_activity",
    "Morning Run",
    {
      friendly_name: "Last activity",
      activityId: 12345,
      distance: 7312,
      duration: 2410,
      activityType: "running",
      icon: "mdi:run",
    }
  ),
  "sensor.garmin_connect_weight": makeState("sensor.garmin_connect_weight", 0, {
    friendly_name: "Weight",
    unit_of_measurement: "kg",
  }),
  "sensor.watch_battery": makeState("sensor.watch_battery", 62, {
    friendly_name: "Watch battery",
    unit_of_measurement: "%",
  }),
};

const registryEntry = (entityId) => ({ entity_id: entityId, device_id: "dev1" });

const hass = {
  states,
  language: "en",
  locale: { number_format: "comma_decimal", time_format: "24" },
  config: { unit_system: { length: "km" } },
  devices: {
    dev1: {
      id: "dev1",
      name: "Garmin Connect",
      manufacturer: "Garmin",
      identifiers: [["garmin_connect", "abc123"]],
    },
    dev2: { id: "dev2", name: "Something else", manufacturer: "Other", identifiers: [["other", "x"]] },
  },
  entities: {
    "sensor.garmin_connect_steps": registryEntry("sensor.garmin_connect_steps"),
    "sensor.garmin_connect_daily_step_goal": registryEntry("sensor.garmin_connect_daily_step_goal"),
    "sensor.garmin_connect_distance": registryEntry("sensor.garmin_connect_distance"),
    "sensor.garmin_connect_calories": registryEntry("sensor.garmin_connect_calories"),
    "sensor.garmin_connect_active_calories": registryEntry("sensor.garmin_connect_active_calories"),
    "sensor.garmin_connect_floors_ascended": registryEntry("sensor.garmin_connect_floors_ascended"),
    "sensor.garmin_connect_floors_ascended_goal": registryEntry(
      "sensor.garmin_connect_floors_ascended_goal"
    ),
    "sensor.garmin_connect_intensity_minutes": registryEntry(
      "sensor.garmin_connect_intensity_minutes"
    ),
    "sensor.garmin_connect_resting_heart_rate": registryEntry(
      "sensor.garmin_connect_resting_heart_rate"
    ),
    "sensor.garmin_connect_body_battery": registryEntry("sensor.garmin_connect_body_battery"),
    "sensor.garmin_connect_sleep_score": registryEntry("sensor.garmin_connect_sleep_score"),
    "sensor.garmin_connect_training_readiness": registryEntry(
      "sensor.garmin_connect_training_readiness"
    ),
    "sensor.garmin_connect_weight": registryEntry("sensor.garmin_connect_weight"),
    // Diagnostic entities must be filtered out by the Garmin detection.
    "sensor.garmin_connect_last_activity": {
      ...registryEntry("sensor.garmin_connect_last_activity"),
      entity_category: "diagnostic",
    },
    "sensor.other": { entity_id: "sensor.other", device_id: "dev2" },
  },
  localize: (key) => (key === "state.default.unavailable" ? "unavailable" : ""),
  callService: (domain, service, data, target) => calls.push({ domain, service, data, target }),
  formatEntityStateToParts: (stateObj) =>
    parts(stateObj.state, stateObj.attributes.unit_of_measurement),
  formatEntityAttributeValueToParts: (stateObj, attribute) =>
    parts(stateObj.attributes[attribute], stateObj.attributes.unit_of_measurement),
  formatEntityState: (stateObj) =>
    `${stateObj.state} ${stateObj.attributes.unit_of_measurement || ""}`.trim(),
  formatEntityAttributeValue: (stateObj, attribute) => String(stateObj.attributes[attribute]),
};

/* -------------------------------------------------------------------------- */
/* Assertions                                                                 */
/* -------------------------------------------------------------------------- */

let failures = 0;

function check(label, condition, extra) {
  if (condition) {
    console.log(`  ok   ${label}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${label}${extra !== undefined ? ` -> ${JSON.stringify(extra)}` : ""}`);
  }
}

const GarminCard = window.customElements.get("garmin-card");
const GarminCardEditor = window.customElements.get("garmin-card-editor");

console.log("\n-- registration --");
check("garmin-card is defined", Boolean(GarminCard));
check("garmin-card-editor is defined", Boolean(GarminCardEditor));
check(
  "card is registered in window.customCards",
  window.customCards.some((card) => card.type === "garmin-card")
);
check(
  "customCards entry offers an entity suggestion",
  typeof window.customCards.find((card) => card.type === "garmin-card").getEntitySuggestion ===
    "function"
);

console.log("\n-- Garmin discovery --");
const stub = GarminCard.getStubConfig(hass);
check("stub finds ring entities", stub.entities.length >= 4, stub.entities);
check("stub finds header entities", stub.header_entities.length >= 3, stub.header_entities);
check("stub skips diagnostic entities", !JSON.stringify(stub).includes("last_activity"));
check(
  "suggestion for a Garmin entity",
  Boolean(GarminCard.getEntitySuggestion(hass, "sensor.garmin_connect_steps"))
);
check(
  "no suggestion for a foreign entity",
  GarminCard.getEntitySuggestion(hass, "sensor.other") === null
);

console.log("\n-- rendering: rings --");
const card = document.createElement("garmin-card");
document.body.appendChild(card);
card.setConfig({
  title: "Markus",
  battery_entity: "sensor.watch_battery",
  show_units: true,
  header_entities: [
    { entity: "sensor.garmin_connect_resting_heart_rate" },
    { entity: "sensor.garmin_connect_body_battery" },
    { entity: "sensor.garmin_connect_sleep_score", show_units: true, icon_color: "red" },
  ],
  entities: [
    { entity: "sensor.garmin_connect_steps", max_entity: "sensor.garmin_connect_daily_step_goal" },
    { entity: "sensor.garmin_connect_distance", max: 10 },
    {
      entity: "sensor.garmin_connect_intensity_minutes",
      max_attribute: "goal",
      color_stops: { 0: "red", 60: "orange", 90: "green" },
    },
    {
      entity: "sensor.garmin_connect_last_activity",
      attribute: "distance",
      name: "Last run",
      units: "m",
      tap_action: { action: "navigate", navigation_path: "/lovelace/fitness" },
    },
  ],
});
card.hass = hass;

const html = card.shadowRoot.querySelector("ha-card").innerHTML;
check("title is rendered", html.includes("Markus"));
check("numeric battery icon is derived", html.includes("mdi:battery-60"), html.match(/mdi:battery[^"]*/g));
check("header entity value is rendered", html.includes("48"));
check(
  "ring labels are rendered",
  ["Steps", "Distance", "Intensity minutes", "Last run"].every((label) => html.includes(label))
);
check("attribute value is rendered", html.includes("7312"));
check("four rings are rendered", (html.match(/class="garmin-card__ring"/g) || []).length === 4);
check("actions are registered", card._actions.length === 7, card._actions.length);

console.log("\n-- progress resolution --");
const resolve = (entry) => card._resolveEntry(entry, card._config);
check(
  "max_entity is used for the goal",
  Math.round(resolve({ entity: "sensor.garmin_connect_steps", max_entity: "sensor.garmin_connect_daily_step_goal" }).progress) === 84
);
check(
  "max_attribute is used for the goal",
  Math.round(resolve({ entity: "sensor.garmin_connect_intensity_minutes", max_attribute: "goal" }).progress) === 28
);
check(
  "explicit max wins",
  Math.round(resolve({ entity: "sensor.garmin_connect_distance", max: 10 }).progress) === 64
);
check(
  "non numeric state has no progress",
  resolve({ entity: "sensor.garmin_connect_last_activity" }).progress === null
);
check(
  "a maximum of 0 falls back to the global max",
  resolve({ entity: "sensor.garmin_connect_weight", max: 0 }).progress === 0
);
check(
  "unknown entity is reported as missing",
  card._resolveEntry({ entity: "sensor.nope" }, card._config).missing === true
);

console.log("\n-- layout helpers --");
check("getCardSize", card.getCardSize() === 3, card.getCardSize());
check("getGridOptions for four rings", card.getGridOptions().columns === 9, card.getGridOptions());
check("auto columns for four rings", card._columns === 4, card._columns);

console.log("\n-- rendering: bars --");
card.setConfig({ ...card._config, layout: "bars" });
card.hass = { ...hass };
const barHtml = card.shadowRoot.querySelector("ha-card").innerHTML;
check("bars are rendered", (barHtml.match(/garmin-card__bar"/g) || []).length === 4);
check("bar width is rounded", barHtml.includes("width:84.32%"), barHtml.match(/width:[^;]*;/g));
check("bar actions are registered", card._actions.length === 7, card._actions.length);

console.log("\n-- robustness --");
card.setConfig({ entities: [{ entity: "sensor.does_not_exist" }] });
card.hass = { ...hass };
check(
  "missing entities do not break the render",
  card.shadowRoot.querySelector("ha-card").innerHTML.includes("garmin-card__ring-label")
);
card.setConfig({ entities: [] });
card.hass = { ...hass };
check(
  "an empty entity list shows a hint",
  card.shadowRoot.querySelector("ha-card").innerHTML.includes("garmin-card__empty")
);

const unavailableHass = {
  ...hass,
  states: { ...hass.states, "sensor.garmin_connect_steps": makeState("sensor.garmin_connect_steps", "unavailable", {}) },
};
card.setConfig({ entities: [{ entity: "sensor.garmin_connect_steps" }] });
card.hass = unavailableHass;
check(
  "unavailable entities render a placeholder",
  card.shadowRoot.querySelector("ha-card").innerHTML.includes("unavailable")
);

console.log("\n-- editor --");
const editor = document.createElement("garmin-card-editor");
document.body.appendChild(editor);
editor.hass = hass;
editor.setConfig({
  type: "custom:garmin-card",
  entities: [
    {
      entity: "sensor.garmin_connect_steps",
      max_attribute: "goal",
      color_stops: { 0: "red", 90: "green" },
    },
  ],
  header_entities: ["sensor.garmin_connect_sleep_score"],
});

const formData = editor._formData;
const schema = editor._schema;
check("schema contains the entity lists", schema.some((item) => item.name === "entities"));
check(
  "schema contains one panel per configured entity",
  schema.filter((item) => item.type === "expandable").length === 2
);
check("form data serialises color stops", formData.e_0_color_stops === "0: red, 90: green");
check(
  "color stops parser",
  JSON.stringify(editor._parseColorStops("0: red, 90: green")) === '{"0":"red","90":"green"}'
);

let changedConfig;
editor.addEventListener("config-changed", (ev) => {
  changedConfig = ev.detail.config;
});
editor._valueChanged({
  detail: {
    value: {
      ...formData,
      title: "Edited",
      header: true,
      show_units: false,
      layout: "rings",
      max: 100,
      entities: ["sensor.garmin_connect_steps", "sensor.garmin_connect_distance"],
      e_0_max_attribute: "goal",
      e_0_color_stops: "0: red, 50: yellow",
      e_0_show_units: true,
      e_1_max: 42,
      h_0_name: "Sleep",
      h_0_show_units: false,
    },
  },
});

check("config-changed is fired", Boolean(changedConfig));
check("card type is preserved", changedConfig.type === "custom:garmin-card");
check("title is propagated", changedConfig.title === "Edited");
check("two body entities", changedConfig.entities.length === 2);
check("numeric option is converted", changedConfig.entities[1].max === 42, changedConfig.entities[1]);
check(
  "color stops become an object",
  JSON.stringify(changedConfig.entities[0].color_stops) === '{"0":"red","50":"yellow"}'
);
check("checked booleans are kept", changedConfig.entities[0].show_units === true);
check("unchecked booleans are dropped", changedConfig.header_entities[0].show_units === undefined);
check("name override is kept", changedConfig.header_entities[0].name === "Sleep");
check("default values are not written", changedConfig.max === undefined && changedConfig.layout === undefined);

console.log("\n-- config validation --");
function throws(label, fn) {
  try {
    fn();
    check(label, false, "did not throw");
  } catch (err) {
    check(label, true);
  }
}
throws("entities must be a list", () => card.setConfig({ entities: "nope" }));
throws("header_entities must be a list", () => card.setConfig({ entities: [], header_entities: {} }));
throws("layout is validated", () => card.setConfig({ entities: [], layout: "pie" }));
throws("entities are required", () => card.setConfig({ header: true }));

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
