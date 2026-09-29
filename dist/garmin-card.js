/**
 * Garmin Card for Home Assistant
 * https://github.com/acdcnow/Garmin-Card
 *
 * A fitness dashboard card that visualises the entities created by the
 * "Garmin Connect" integration
 * (https://github.com/cyberjunky/home-assistant-garmin_connect),
 * but it works with any numeric sensor.
 *
 * Target platform: Home Assistant 2026.9 and newer.
 *
 *   - Uses `hass.formatEntityStateToParts()` / `hass.formatEntityAttributeValueToParts()`
 *     so values honour the user's number format and per-entity display precision.
 *   - Uses `hass.devices` / `hass.entities` to detect Garmin entities
 *     (card picker stub config and editor hints).
 *   - Implements `getGridOptions()` for the sections view.
 *   - Implements `getEntitySuggestion()` (Home Assistant 2026.6+).
 *   - Fires card events with `{ bubbles: true, composed: true }`, which is what
 *     the `home-assistant` element listens for.
 *   - Supports the modern action config (`action: perform-action`) as well as the
 *     legacy `call-service` / `service` / `service_data` keys.
 *
 * The file is intentionally dependency free and has no build step. It can be
 * loaded either as a plain `<script>` or as an ES module resource.
 */

const GARMIN_CARD_VERSION = "2.0.0";
const GARMIN_DEVICE_MATCH = /garmin/i;

console.info(
  `%c GARMIN-CARD %c ${GARMIN_CARD_VERSION} `,
  "color: #fff; background: #007cc0; font-weight: 700;",
  "color: #007cc0; background: #fff; font-weight: 700;"
);

/* -------------------------------------------------------------------------- */
/* Defaults                                                                   */
/* -------------------------------------------------------------------------- */

const DEFAULT_MAX = 100;
const DEFAULT_HEADER_LIMIT = 3;
const DEFAULT_RING_SIZE = 45;
const DEFAULT_STROKE = 5;

const CARD_DEFAULTS = {
  title: "",
  header: true,
  header_entities: [],
  show_units_header: false,
  entities: [],
  show_units: false,
  max: DEFAULT_MAX,
  layout: "rings", // "rings" | "bars"
  ring_size: DEFAULT_RING_SIZE,
};

const BATTERY_COLORS = {
  high: "var(--success-color, #10a13c)",
  medium: "var(--warning-color, #dee023)",
  low: "var(--error-color, #da3116)",
};

const UNAVAILABLE_STATES = ["unavailable", "unknown", "none", ""];
const LAYOUTS = ["rings", "bars"];

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

const isUnavailable = (state) =>
  state === undefined ||
  state === null ||
  UNAVAILABLE_STATES.includes(String(state).toLowerCase());

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Convert a raw state or attribute value to a number (or `null`). */
const toNumber = (value) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : null;
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Dispatch a DOM event the way Home Assistant expects it.
 * `composed: true` is required to cross the shadow boundary and `bubbles: true`
 * so the `home-assistant` element (which listens in the bubble phase) sees it.
 */
const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new Event(type, {
    bubbles: options.bubbles !== false,
    cancelable: Boolean(options.cancelable),
    composed: options.composed !== false,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

/** `hass.localize()` returns an empty string for unknown keys. */
const localize = (hass, key, fallback) => {
  const value = hass && typeof hass.localize === "function" ? hass.localize(key) : "";
  return value || fallback;
};

/* -------------------------------------------------------------------------- */
/* Value formatting                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Split an entity state or attribute into display parts.
 * Home Assistant returns `[{type:"value"},{type:"literal"},{type:"unit"}]`,
 * which lets us separate the formatted number from its unit.
 */
const displayParts = (hass, stateObj, attribute) => {
  try {
    if (attribute) {
      if (typeof hass.formatEntityAttributeValueToParts === "function") {
        return hass.formatEntityAttributeValueToParts(stateObj, attribute);
      }
      if (typeof hass.formatEntityAttributeValue === "function") {
        return [
          { type: "value", value: hass.formatEntityAttributeValue(stateObj, attribute) },
        ];
      }
    } else {
      if (typeof hass.formatEntityStateToParts === "function") {
        return hass.formatEntityStateToParts(stateObj);
      }
      if (typeof hass.formatEntityState === "function") {
        return [{ type: "value", value: hass.formatEntityState(stateObj) }];
      }
    }
  } catch (err) {
    // Fall through to the raw value below, e.g. for non numeric attributes.
  }

  const raw = attribute ? stateObj.attributes?.[attribute] : stateObj.state;
  if (raw === undefined || raw === null) return [{ type: "value", value: "" }];
  if (typeof raw === "object") return [{ type: "value", value: JSON.stringify(raw) }];
  return [{ type: "value", value: String(raw) }];
};

const partsToValue = (parts) =>
  parts
    .filter((part) => part.type !== "unit" && part.type !== "literal")
    .map((part) => part.value)
    .join("")
    .trim();

const partsToUnit = (parts) =>
  parts
    .filter((part) => part.type === "unit")
    .map((part) => part.value)
    .join("")
    .trim();

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

const selectAction = (config, action) => {
  if (!config) return undefined;
  if (action === "hold_action" && config.hold_action) return config.hold_action;
  if (action === "double_tap_action" && config.double_tap_action) return config.double_tap_action;
  if (action === "tap_action" && config.tap_action) return config.tap_action;
  return undefined;
};

const hasAction = (config, action) => Boolean(selectAction(config, action));

const hasAnyAction = (config) =>
  hasAction(config, "tap_action") ||
  hasAction(config, "hold_action") ||
  hasAction(config, "double_tap_action");

/** Accept both the modern (`perform-action`) and the legacy action config keys. */
const normalizeAction = (config) => {
  if (!config) return undefined;
  const action = config.action || (config.service ? "perform-action" : "none");

  switch (action) {
    case "call-service":
    case "perform-action": {
      const service = config.perform_action || config.service || "";
      const [domain, name] = service.split(".", 2);
      return {
        action: "perform-action",
        domain,
        service: name,
        data: config.data || config.service_data || {},
        target: config.target || (config.entity_id ? { entity_id: config.entity_id } : undefined),
        confirmation: config.confirmation,
      };
    }
    case "url":
      return {
        action: "url",
        url_path: config.url_path || config.url,
        new_tab: config.new_tab,
        confirmation: config.confirmation,
      };
    case "navigate":
      return {
        action: "navigate",
        navigation_path: config.navigation_path,
        navigation_replace: config.navigation_replace,
        confirmation: config.confirmation,
      };
    case "more-info":
      return { action: "more-info", entity: config.entity, confirmation: config.confirmation };
    case "toggle":
      return { action: "toggle", entity: config.entity, confirmation: config.confirmation };
    case "none":
      return { action: "none" };
    default:
      return { action: "more-info", entity: config.entity };
  }
};

const confirmAction = (config) => {
  if (!config || !config.confirmation) return true;
  const text =
    typeof config.confirmation === "string" ? config.confirmation : config.confirmation.text;
  return window.confirm(text || "Are you sure you want to run this action?");
};

/** Run a card action. `card` is the host element used to fire HA events. */
const runAction = (card, hass, config, actionName) => {
  const actionConfig = normalizeAction(selectAction(config, actionName));
  if (!actionConfig || actionConfig.action === "none") return;
  if (!confirmAction(actionConfig)) return;

  switch (actionConfig.action) {
    case "more-info": {
      const entityId = actionConfig.entity || config.entity;
      if (!entityId) return;
      fireEvent(card, "hass-more-info", { entityId });
      break;
    }
    case "toggle": {
      const entityId = actionConfig.entity || config.entity;
      if (!entityId) return;
      hass.callService("homeassistant", "toggle", { entity_id: entityId });
      break;
    }
    case "navigate": {
      if (!actionConfig.navigation_path) return;
      if (actionConfig.navigation_replace) {
        history.replaceState(null, "", actionConfig.navigation_path);
      } else {
        history.pushState(null, "", actionConfig.navigation_path);
      }
      fireEvent(window, "location-changed", { replace: Boolean(actionConfig.navigation_replace) });
      break;
    }
    case "url": {
      if (!actionConfig.url_path) return;
      window.open(actionConfig.url_path, actionConfig.new_tab === false ? "_self" : "_blank");
      break;
    }
    case "perform-action": {
      if (!actionConfig.domain || !actionConfig.service) return;
      hass.callService(
        actionConfig.domain,
        actionConfig.service,
        actionConfig.data,
        actionConfig.target
      );
      break;
    }
    default:
      break;
  }
};

/* -------------------------------------------------------------------------- */
/* Garmin discovery (card picker + editor)                                    */
/* -------------------------------------------------------------------------- */

/** Entity ids that belong to the Garmin Connect integration. */
const findGarminEntityIds = (hass) => {
  if (!hass) return [];

  const ids = new Set();
  const devices = hass.devices || {};
  const registry = hass.entities || {};

  const garminDevices = new Set();
  Object.values(devices).forEach((device) => {
    if (!device) return;
    const identifiers = device.identifiers || [];
    const byIdentifier = identifiers.some(
      (identifier) => Array.isArray(identifier) && GARMIN_DEVICE_MATCH.test(String(identifier[1]))
    );
    const byManufacturer = GARMIN_DEVICE_MATCH.test(String(device.manufacturer || ""));
    if (byIdentifier || byManufacturer) garminDevices.add(device.id);
  });

  Object.entries(registry).forEach(([entityId, entry]) => {
    if (!entry || !entry.device_id || !garminDevices.has(entry.device_id)) return;
    if (entry.hidden_by || entry.disabled_by) return;
    if (entry.entity_category === "diagnostic" || entry.entity_category === "config") return;
    ids.add(entityId);
  });

  // Fallback for setups where the registry is not (yet) available.
  if (!ids.size) {
    Object.entries(hass.states || {}).forEach(([entityId, stateObj]) => {
      if (entityId.startsWith("sensor.garmin_connect")) {
        ids.add(entityId);
        return;
      }
      if (GARMIN_DEVICE_MATCH.test(String(stateObj?.attributes?.attribution || ""))) {
        ids.add(entityId);
      }
    });
  }

  return [...ids].sort();
};

/** Pick the first entity id ending in one of the given suffixes. */
const pickEntity = (ids, suffixes) => {
  for (const suffix of suffixes) {
    const match = ids.find((id) => id === suffix || id.endsWith(`_${suffix}`));
    if (match) return match;
  }
  return undefined;
};

const STUB_RING_ENTITIES = [
  "steps",
  "distance",
  "calories",
  "intensity_minutes",
  "floors_ascended",
  "active_calories",
];

const STUB_HEADER_ENTITIES = [
  "resting_heart_rate",
  "body_battery",
  "sleep_score",
  "training_readiness",
];

/* -------------------------------------------------------------------------- */
/* The card                                                                   */
/* -------------------------------------------------------------------------- */

class GarminCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = undefined;
    this._hass = undefined;
    this._signature = undefined;
    this._lastProgress = new Map();
    this._actions = [];
    this._holdTimer = undefined;
    this._tapTimer = undefined;
    this._holdTriggered = false;

    const style = document.createElement("style");
    style.textContent = GarminCard.styles;
    this.shadowRoot.appendChild(style);

    this._container = document.createElement("ha-card");
    this.shadowRoot.appendChild(this._container);

    // Event delegation: one set of listeners for the whole card.
    this._container.addEventListener("click", (ev) => this._handleClick(ev));
    this._container.addEventListener("pointerdown", (ev) => this._handlePointerDown(ev));
    ["pointerup", "pointerleave", "pointercancel"].forEach((type) =>
      this._container.addEventListener(type, () => window.clearTimeout(this._holdTimer))
    );
    this._container.addEventListener("contextmenu", (ev) => {
      if (ev.target?.closest?.("[data-action-index]")) ev.preventDefault();
    });
  }

  static get styles() {
    return `
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
        box-sizing: border-box;
        height: 100%;
      }

      /* ---------------- header ---------------- */

      .garmin-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }

      .garmin-card__header:empty {
        display: none;
      }

      .garmin-card__title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: var(--ha-font-size-l, 1rem);
        font-weight: 500;
        color: var(--primary-text-color);
        min-width: 0;
      }

      .garmin-card__title > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .garmin-card__title ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }

      .garmin-card__header-entities {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
      }

      .garmin-card__header-entity {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--primary-text-color);
        font-size: var(--ha-font-size-m, 0.875rem);
        white-space: nowrap;
      }

      .garmin-card__header-entity ha-icon {
        --mdc-icon-size: 20px;
        color: var(--state-icon-color, #44739e);
      }

      [data-action-index] {
        cursor: pointer;
        outline: none;
      }

      [data-action-index]:focus-visible {
        outline: 2px solid var(--primary-color, #007cc0);
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* ---------------- rings ---------------- */

      .garmin-card__rings {
        display: grid;
        grid-template-columns: repeat(var(--garmin-columns, 3), minmax(0, 1fr));
        gap: 12px 8px;
        justify-items: center;
      }

      .garmin-card__ring {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }

      .garmin-card__ring svg {
        display: block;
        overflow: visible;
      }

      .garmin-card__ring .ring-track {
        fill: none;
        stroke: var(--divider-color, rgba(127, 127, 127, 0.3));
        opacity: 0.6;
      }

      .garmin-card__ring .ring-progress {
        fill: none;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .garmin-card__ring text {
        fill: var(--primary-text-color);
        font-weight: 500;
        font-family: inherit;
      }

      .garmin-card__ring-label {
        text-align: center;
        font-size: var(--ha-font-size-s, 0.75rem);
        line-height: 1.2;
        color: var(--secondary-text-color);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      /* ---------------- bars ---------------- */

      .garmin-card__bars {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .garmin-card__bar {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "label value" "track track";
        gap: 4px 8px;
        align-items: center;
      }

      .garmin-card__bar-label {
        grid-area: label;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--primary-text-color);
        font-size: var(--ha-font-size-m, 0.875rem);
        min-width: 0;
      }

      .garmin-card__bar-label ha-icon {
        --mdc-icon-size: 20px;
        color: var(--state-icon-color, #44739e);
      }

      .garmin-card__bar-label span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .garmin-card__bar-value {
        grid-area: value;
        font-size: var(--ha-font-size-m, 0.875rem);
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .garmin-card__bar-track {
        grid-area: track;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(127, 127, 127, 0.3));
        overflow: hidden;
      }

      .garmin-card__bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .garmin-card__empty {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-m, 0.875rem);
        text-align: center;
        padding: 8px 0;
      }
    `;
  }

  /* ------------------------------------------------------------------ */

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");

    if (config.entities !== undefined && !Array.isArray(config.entities)) {
      throw new Error("`entities` must be a list");
    }
    if (config.header_entities !== undefined && !Array.isArray(config.header_entities)) {
      throw new Error("`header_entities` must be a list");
    }
    if (!config.entities && !config.header_entities) {
      throw new Error("You need to define `entities`");
    }
    if (config.layout !== undefined && !LAYOUTS.includes(config.layout)) {
      throw new Error(`\`layout\` must be one of: ${LAYOUTS.join(", ")}`);
    }

    this._config = { ...CARD_DEFAULTS, ...config };
    this._signature = undefined;
    this._lastProgress = new Map();
    if (this._hass) this._render();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (!hass) return;

    const signature = this._computeSignature(hass);
    if (signature !== this._signature || !oldHass) {
      this._signature = signature;
      this._render();
    }
  }

  get hass() {
    return this._hass;
  }

  getCardSize() {
    const count = (this._config?.entities || []).length;
    return 1 + Math.ceil(count / (this._config?.layout === "bars" ? 4 : 3));
  }

  getGridOptions() {
    const count = (this._config?.entities || []).length;
    if (this._config?.layout === "bars") {
      return { columns: 12, min_columns: 6 };
    }
    if (count <= 2) return { columns: 6, min_columns: 3 };
    if (count <= 4) return { columns: 9, min_columns: 6 };
    return { columns: 12, min_columns: 6 };
  }

  /** Default / preview config for the card picker. */
  static getStubConfig(hass) {
    const ids = findGarminEntityIds(hass);

    if (!ids.length) {
      return {
        header: true,
        show_units: false,
        max: DEFAULT_MAX,
        entities: [],
      };
    }

    const rings = STUB_RING_ENTITIES.map((suffix) => pickEntity(ids, [suffix])).filter(Boolean);
    const header = STUB_HEADER_ENTITIES.map((suffix) => pickEntity(ids, [suffix])).filter(Boolean);

    return {
      title: "Garmin",
      header: true,
      show_units: true,
      max: DEFAULT_MAX,
      header_entities: header.slice(0, DEFAULT_HEADER_LIMIT).map((entity) => ({ entity })),
      entities: rings.map((entity) => ({ entity })),
    };
  }

  /**
   * Offer this card in the card picker when one of its entities is picked
   * (Home Assistant 2026.6+).
   */
  static getEntitySuggestion(hass, entityId) {
    if (!entityId) return null;
    const isGarmin =
      findGarminEntityIds(hass).includes(entityId) ||
      entityId.startsWith("sensor.garmin_connect");
    if (!isGarmin) return null;

    const stub = GarminCard.getStubConfig(hass);
    return {
      config: {
        type: "custom:garmin-card",
        title: stub.title || "Garmin",
        header: true,
        show_units: true,
        header_entities: stub.header_entities || [],
        entities: stub.entities?.length ? stub.entities : [{ entity: entityId }],
      },
    };
  }

  static async getConfigElement() {
    return document.createElement("garmin-card-editor");
  }

  /* ------------------------------------------------------------------ */

  /** Cheap change detection so the DOM is only rebuilt when something changed. */
  _computeSignature(hass) {
    const config = this._config;
    if (!config) return "";

    const parts = [
      JSON.stringify(config),
      String(hass.language || ""),
      String(hass.locale?.number_format || ""),
      String(hass.locale?.time_format || ""),
    ];

    const entries = [...(config.header_entities || []), ...(config.entities || [])];
    entries.forEach((entry) => {
      if (!entry) return;
      const item = typeof entry === "string" ? { entity: entry } : entry;
      const entityId = item.entity;
      if (!entityId) return;
      const stateObj = hass.states[entityId];
      parts.push(
        entityId,
        item.attribute || "",
        stateObj ? `${stateObj.state}|${stateObj.attributes?.icon}` : "missing",
        item.attribute && stateObj ? String(stateObj.attributes?.[item.attribute]) : "",
        item.max_attribute && stateObj ? String(stateObj.attributes?.[item.max_attribute]) : "",
        item.max_entity ? hass.states[item.max_entity]?.state : ""
      );
    });

    if (config.battery_entity) {
      const battery = hass.states[config.battery_entity];
      parts.push(
        config.battery_entity,
        battery
          ? `${battery.state}|${battery.attributes?.icon}|${battery.attributes?.is_charging}`
          : "missing"
      );
    }

    return parts.join("~");
  }

  /** Resolve a config entry (string or object) into everything needed to draw it. */
  _resolveEntry(entry, globalConfig, options = {}) {
    const config = typeof entry === "string" ? { entity: entry } : entry || {};
    const entityId = config.entity;
    if (!entityId) return null;

    const stateObj = this._hass.states[entityId];
    if (!stateObj) {
      return {
        config,
        entityId,
        index: options.index,
        name: config.name || entityId,
        missing: true,
        hasAction: false,
      };
    }

    const attribute = config.attribute;
    const raw = attribute !== undefined ? stateObj.attributes?.[attribute] : stateObj.state;
    const parts = displayParts(this._hass, stateObj, attribute);
    const numeric = toNumber(raw);
    const max = options.header ? null : this._resolveMax(config, stateObj, globalConfig);

    let progress = null;
    if (numeric !== null && max !== null && max > 0) {
      progress = clamp((numeric / max) * 100, 0, 100);
    }

    const showUnits = options.header
      ? config.show_units !== undefined
        ? config.show_units
        : globalConfig.show_units_header
      : config.show_units !== undefined
        ? config.show_units
        : globalConfig.show_units;

    const unit =
      config.units || partsToUnit(parts) || stateObj.attributes?.unit_of_measurement || "";

    const name =
      config.name ||
      stateObj.attributes?.friendly_name ||
      entityId.replace(/^[a-z_]+\./, "").replace(/_/g, " ");

    return {
      config,
      entityId,
      index: options.index,
      stateObj,
      attribute,
      raw,
      numeric,
      max,
      progress,
      value: partsToValue(parts) || (raw === undefined || raw === null ? "" : String(raw)),
      unit: showUnits ? unit : "",
      name,
      icon: config.icon || stateObj.attributes?.icon || "",
      color: this._resolveColor(config, progress, Boolean(options.header)),
      missing: false,
      unavailable: isUnavailable(raw),
      hasAction: hasAnyAction(config),
    };
  }

  _resolveMax(config, stateObj, globalConfig) {
    const explicit = toNumber(config.max);
    if (explicit !== null && explicit > 0) return explicit;

    if (config.max_entity) {
      const parsed = toNumber(this._hass.states[config.max_entity]?.state);
      if (parsed !== null && parsed > 0) return parsed;
    }

    if (config.max_attribute) {
      const parsed = toNumber(stateObj.attributes?.[config.max_attribute]);
      if (parsed !== null && parsed > 0) return parsed;
    }

    const global = toNumber(globalConfig.max);
    return global !== null && global > 0 ? global : DEFAULT_MAX;
  }

  _resolveColor(config, progress, isHeader) {
    const fallback = isHeader
      ? "var(--state-icon-color, #44739e)"
      : "var(--primary-color, #007cc0)";

    if (isHeader) return config.icon_color || fallback;
    if (config.color) return config.color;
    if (config.icon_color) return config.icon_color;

    const stops = config.color_stops;
    if (!stops || progress === null) return fallback;

    const entries = Object.entries(stops)
      .map(([key, value]) => [Number(key), value])
      .filter(([key]) => Number.isFinite(key))
      .sort((a, b) => a[0] - b[0]);

    let color = fallback;
    entries.forEach(([stop, stopColor]) => {
      if (progress >= stop) color = stopColor;
    });
    return color;
  }

  get _columns() {
    const configured = Number(this._config?.columns);
    if (Number.isFinite(configured) && configured > 0) return clamp(configured, 1, 6);

    const count = (this._config?.entities || []).length;
    if (count <= 3) return count || 1;
    if (count % 4 === 0) return 4;
    return 3;
  }

  /* ------------------------------------------------------------------ */

  _render() {
    if (!this._hass || !this._config) return;

    const config = this._config;
    this._actions = [];

    const header = [];
    if (config.header !== false) {
      const status = this._renderStatus();
      if (status) header.push(status);

      const headerEntities = (config.header_entities || [])
        .map((entry, index) => this._resolveEntry(entry, config, { header: true, index }))
        .filter(Boolean);

      if (headerEntities.length) {
        header.push(
          `<div class="garmin-card__header-entities">${headerEntities
            .map((entity) => this._renderHeaderEntity(entity))
            .join("")}</div>`
        );
      }
    }

    const body = config.layout === "bars" ? this._renderBars() : this._renderRings();

    this._container.innerHTML = `
      <div class="garmin-card__header">${header.join("")}</div>
      ${body}
    `;

    this._attachActions();
    this._animateRings();
  }

  /** Register tap / hold / double tap actions on the rendered nodes. */
  _attachActions() {
    const config = this._config;

    this._container.querySelectorAll("[data-entry-index]").forEach((node) => {
      const list =
        node.getAttribute("data-entry-kind") === "header"
          ? config.header_entities
          : config.entities;
      const entry = (list || [])[Number(node.getAttribute("data-entry-index"))];
      if (!entry) return;

      const item = typeof entry === "string" ? { entity: entry } : entry;
      if (!item.entity) return;

      const itemConfig = hasAnyAction(item)
        ? item
        : { entity: item.entity, tap_action: { action: "more-info" } };

      const index = this._actions.length;
      this._actions.push({
        config: itemConfig,
        hasHold: hasAction(itemConfig, "hold_action"),
        hasDouble: hasAction(itemConfig, "double_tap_action"),
      });

      node.setAttribute("data-action-index", String(index));
      node.setAttribute("tabindex", "0");
      node.setAttribute("role", "button");
    });
  }

  _handleClick(ev) {
    const node = ev.target?.closest?.("[data-action-index]");
    if (!node || !this._hass) return;
    ev.stopPropagation();
    ev.preventDefault();

    const action = this._actions[Number(node.getAttribute("data-action-index"))];
    if (!action) return;

    if (this._holdTriggered) {
      this._holdTriggered = false;
      return;
    }

    if (action.hasDouble) {
      if (this._tapTimer) {
        window.clearTimeout(this._tapTimer);
        this._tapTimer = undefined;
        runAction(this, this._hass, action.config, "double_tap_action");
      } else {
        this._tapTimer = window.setTimeout(() => {
          this._tapTimer = undefined;
          runAction(this, this._hass, action.config, "tap_action");
        }, 250);
      }
      return;
    }

    runAction(this, this._hass, action.config, "tap_action");
  }

  _handlePointerDown(ev) {
    const node = ev.target?.closest?.("[data-action-index]");
    if (!node) return;

    const action = this._actions[Number(node.getAttribute("data-action-index"))];
    if (!action) return;

    this._holdTriggered = false;
    if (!action.hasHold) return;

    window.clearTimeout(this._holdTimer);
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      runAction(this, this._hass, action.config, "hold_action");
    }, 500);
  }

  /* ------------------------------------------------------------------ */

  _renderStatus() {
    const config = this._config;
    let title = config.title || "";
    let batteryIcon = "";

    if (config.battery_entity) {
      const battery = this._hass.states[config.battery_entity];
      if (!battery) {
        console.warn(`garmin-card: state for ${config.battery_entity} not found`);
      } else {
        if (!title) {
          title = battery.attributes?.model || battery.attributes?.friendly_name || "";
        }
        batteryIcon = this._renderBattery(battery);
      }
    }

    if (!title && !batteryIcon) return "";

    return `<div class="garmin-card__title">
      <span>${escapeHtml(title)}</span>
      ${batteryIcon}
    </div>`;
  }

  _renderBattery(stateObj) {
    const colors = { ...BATTERY_COLORS, ...(this._config.battery_colors || {}) };
    const level = toNumber(stateObj.state);
    let color = colors.high;
    let icon = stateObj.attributes?.icon || "";

    if (level !== null) {
      // Numeric battery level; Garmin watches report a percentage.
      if (level <= 15) color = colors.low;
      else if (level <= 35) color = colors.medium;

      if (!icon) {
        const charging =
          stateObj.attributes?.is_charging === true ||
          String(stateObj.state).toLowerCase() === "charging";
        const step = Math.max(10, Math.floor(level / 10) * 10);
        icon = charging ? "mdi:battery-charging" : level >= 95 ? "mdi:battery" : `mdi:battery-${step}`;
      }
    } else {
      // Legacy string states, e.g. "High" / "Medium" / "Low".
      const state = String(stateObj.state).toLowerCase();
      if (state === "low" || state === "critical") color = colors.low;
      else if (state === "medium") color = colors.medium;
      else if (state === "charging") icon = icon || "mdi:battery-charging";
    }

    if (!icon) return "";

    return `<ha-icon icon="${escapeHtml(icon)}" style="color:${color}"></ha-icon>`;
  }

  _renderHeaderEntity(entity) {
    if (entity.missing) return "";

    const display = entity.unavailable
      ? localize(this._hass, "state.default.unavailable", "unavailable")
      : `${entity.value}${entity.unit ? ` ${entity.unit}` : ""}`;

    return `<div class="garmin-card__header-entity"
        data-entry-kind="header"
        data-entry-index="${entity.index}"
        title="${escapeHtml(entity.name)}">
      ${entity.icon ? `<ha-icon icon="${escapeHtml(entity.icon)}" style="color:${entity.color}"></ha-icon>` : ""}
      <span>${escapeHtml(display)}</span>
    </div>`;
  }

  _renderRings() {
    const config = this._config;
    const entities = (config.entities || [])
      .map((entry, index) => this._resolveEntry(entry, config, { index }))
      .filter((entity) => Boolean(entity && entity.entityId));

    if (!entities.length) return this._renderEmpty();

    const size = clamp(Number(config.ring_size) || DEFAULT_RING_SIZE, 24, 80) * 2;
    const stroke = DEFAULT_STROKE;
    const radius = 45 - stroke;
    const circumference = 2 * Math.PI * radius;
    const progressMap = new Map();

    const rings = entities
      .map((entity) => {
        if (entity.missing) {
          return `<div class="garmin-card__ring">
            <div class="garmin-card__ring-label">${escapeHtml(entity.name)}</div>
          </div>`;
        }

        const key = `${entity.entityId}|${entity.attribute || ""}`;
        const progress = entity.progress === null ? 0 : entity.progress;
        progressMap.set(key, progress);

        const previous = this._lastProgress.get(key) ?? 0;
        const startOffset = circumference - (previous / 100) * circumference;
        const targetOffset = circumference - (progress / 100) * circumference;

        const label = entity.unavailable
          ? localize(this._hass, "state.default.unavailable", "unavailable")
          : entity.value;
        const hasUnit = Boolean(entity.unit) && entity.value !== "";
        const text = `${label}${hasUnit ? ` ${entity.unit}` : ""}`;
        const fontSize = clamp(30 - String(text).length * 2.6, 12, 26);

        return `<div class="garmin-card__ring"
            data-entry-kind="body"
            data-entry-index="${entity.index}"
            title="${escapeHtml(`${entity.name}: ${text}`)}">
          <svg viewBox="0 0 100 100" width="${size}" height="${size}" role="img"
            aria-label="${escapeHtml(`${entity.name}: ${text}`)}">
            <circle class="ring-track" cx="50" cy="50" r="${radius}" stroke-width="${stroke}"></circle>
            <circle class="ring-progress" cx="50" cy="50" r="${radius}" stroke-width="${stroke}"
              stroke="${entity.color}"
              stroke-dasharray="${circumference.toFixed(2)}"
              stroke-dashoffset="${startOffset.toFixed(2)}"
              data-offset="${targetOffset.toFixed(2)}"
              transform="rotate(-90 50 50)"></circle>
            <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
              style="font-size:${fontSize}px">${escapeHtml(label)}${
                hasUnit
                  ? `<tspan style="font-size:${clamp(fontSize - 5, 9, 20)}px"> ${escapeHtml(entity.unit)}</tspan>`
                  : ""
              }</text>
          </svg>
          <div class="garmin-card__ring-label">${escapeHtml(entity.name)}</div>
        </div>`;
      })
      .join("");

    this._lastProgress = progressMap;

    return `<div class="garmin-card__rings" style="--garmin-columns:${this._columns}">${rings}</div>`;
  }

  _renderBars() {
    const config = this._config;
    const entities = (config.entities || [])
      .map((entry, index) => this._resolveEntry(entry, config, { index }))
      .filter((entity) => Boolean(entity && entity.entityId));

    if (!entities.length) return this._renderEmpty();

    const bars = entities
      .map((entity) => {
        if (entity.missing) {
          return `<div class="garmin-card__bar">
            <div class="garmin-card__bar-label"><span>${escapeHtml(entity.name)}</span></div>
          </div>`;
        }

        const progress = entity.progress === null ? 0 : entity.progress;
        const value = entity.unavailable
          ? localize(this._hass, "state.default.unavailable", "unavailable")
          : `${entity.value}${entity.unit && entity.value !== "" ? ` ${entity.unit}` : ""}`;

        return `<div class="garmin-card__bar"
            data-entry-kind="body"
            data-entry-index="${entity.index}"
            title="${escapeHtml(`${entity.name}: ${value}`)}">
          <div class="garmin-card__bar-label">
            ${entity.icon ? `<ha-icon icon="${escapeHtml(entity.icon)}"></ha-icon>` : ""}
            <span>${escapeHtml(entity.name)}</span>
          </div>
          <div class="garmin-card__bar-value">${escapeHtml(value)}</div>
          <div class="garmin-card__bar-track">
            <div class="garmin-card__bar-fill" style="width:${Math.round(progress * 100) / 100}%;background:${entity.color}"></div>
          </div>
        </div>`;
      })
      .join("");

    return `<div class="garmin-card__bars">${bars}</div>`;
  }

  _renderEmpty() {
    return `<div class="garmin-card__empty">${escapeHtml(
      localize(this._hass, "ui.panel.lovelace.card.no_entities", "No entities configured")
    )}</div>`;
  }

  /** Animate the rings from their previous value to the new one. */
  _animateRings() {
    const circles = this._container.querySelectorAll(".ring-progress");
    if (!circles.length) return;

    window.requestAnimationFrame(() => {
      circles.forEach((circle) => {
        const offset = circle.getAttribute("data-offset");
        if (offset !== null) circle.style.strokeDashoffset = offset;
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* The visual editor                                                          */
/* -------------------------------------------------------------------------- */

const EDITOR_LABELS = {
  title: "Card title",
  battery_entity: "Battery entity",
  header: "Show header",
  show_units_header: "Show header units",
  show_units: "Show body units",
  layout: "Layout",
  max: "Global maximum",
  columns: "Rings per row",
  ring_size: "Ring size (px)",
};

const ENTITY_OPTION_LABELS = {
  name: "Name override",
  attribute: "Attribute (instead of state)",
  units: "Unit override",
  show_units: "Show unit",
  icon: "Icon override",
  icon_color: "Accent color",
  color: "Ring color",
  color_stops: "Color stops (0: red, 60: orange, 90: green)",
  max: "Maximum",
  max_entity: "Maximum from entity",
  max_attribute: "Maximum from attribute",
};

const HEADER_ENTITY_KEYS = ["name", "attribute", "units", "show_units", "icon", "icon_color"];

const BODY_ENTITY_KEYS = [
  ...HEADER_ENTITY_KEYS,
  "color",
  "color_stops",
  "max",
  "max_entity",
  "max_attribute",
];

/** Options that are removed from the config when they still hold their default. */
const EDITOR_DEFAULTS = {
  title: "",
  header: true,
  show_units_header: false,
  show_units: false,
  layout: "rings",
  max: DEFAULT_MAX,
};

class GarminCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = { ...CARD_DEFAULTS };
    this._hass = undefined;
    this._signature = undefined;
  }

  set hass(hass) {
    this._hass = hass;
    if (!hass) return;

    // Re-render only when something the editor displays actually changed, so
    // typing into a form field is not interrupted by state updates.
    const signature = [
      Object.keys(hass.entities || {}).length,
      Object.keys(hass.devices || {}).length,
      String(hass.language || ""),
    ].join("~");
    if (signature === this._signature) return;
    this._signature = signature;
    this._render();
  }

  setConfig(config) {
    this._config = { ...CARD_DEFAULTS, ...config };
    this._render();
  }

  get _entitySelector() {
    // Garmin Connect entities are sensors. Derived template sensors are common
    // practice, so the picker is focused but not hard restricted.
    return { entity: { multiple: true, domain: "sensor" } };
  }

  _entityList(key) {
    return (this._config[key] || [])
      .map((entry) => (typeof entry === "string" ? entry : entry.entity))
      .filter(Boolean);
  }

  get _formData() {
    const config = this._config;
    const data = {
      title: config.title || "",
      battery_entity: config.battery_entity,
      header: config.header !== false,
      show_units_header: Boolean(config.show_units_header),
      show_units: Boolean(config.show_units),
      layout: config.layout || "rings",
      max: config.max === undefined ? DEFAULT_MAX : config.max,
      columns: Number(config.columns) || undefined,
      ring_size: Number(config.ring_size) || DEFAULT_RING_SIZE,
      header_entities: this._entityList("header_entities"),
      entities: this._entityList("entities"),
    };

    const addEntityOptions = (list, prefix) => {
      list.forEach((entry, index) => {
        const item = typeof entry === "string" ? { entity: entry } : entry || {};
        data[`${prefix}_${index}_name`] = item.name || "";
        data[`${prefix}_${index}_attribute`] = item.attribute || "";
        data[`${prefix}_${index}_units`] = item.units || "";
        data[`${prefix}_${index}_show_units`] = Boolean(item.show_units);
        data[`${prefix}_${index}_icon`] = item.icon || "";
        data[`${prefix}_${index}_icon_color`] = item.icon_color || "";
        if (prefix === "e") {
          data[`${prefix}_${index}_color`] = item.color || "";
          data[`${prefix}_${index}_max`] = item.max === undefined ? undefined : item.max;
          data[`${prefix}_${index}_max_entity`] = item.max_entity || "";
          data[`${prefix}_${index}_max_attribute`] = item.max_attribute || "";
          data[`${prefix}_${index}_color_stops`] =
            item.color_stops && typeof item.color_stops === "object"
              ? Object.entries(item.color_stops)
                  .map(([stop, stopColor]) => `${stop}: ${stopColor}`)
                  .join(", ")
              : item.color_stops || "";
        }
      });
    };

    addEntityOptions(config.header_entities || [], "h");
    addEntityOptions(config.entities || [], "e");

    return data;
  }

  get _schema() {
    const schema = [
      { name: "title", selector: { text: {} } },
      { name: "battery_entity", selector: { entity: {} } },
      {
        type: "grid",
        name: "",
        flatten: true,
        schema: [
          { name: "header", selector: { boolean: {} } },
          { name: "show_units_header", selector: { boolean: {} } },
          { name: "show_units", selector: { boolean: {} } },
          {
            name: "layout",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "rings", label: "Rings" },
                  { value: "bars", label: "Bars" },
                ],
              },
            },
          },
        ],
      },
      {
        type: "grid",
        name: "",
        flatten: true,
        schema: [
          { name: "max", selector: { number: { min: 1, max: 1000000, mode: "box" } } },
          { name: "columns", selector: { number: { min: 1, max: 6, mode: "box" } } },
          { name: "ring_size", selector: { number: { min: 24, max: 80, mode: "box" } } },
        ],
      },
      { name: "header_entities", selector: this._entitySelector },
    ];

    this._entityList("header_entities").forEach((entityId, index) => {
      schema.push({
        type: "expandable",
        name: `h_${index}`,
        title: `${index + 1}. ${this._entityName(entityId)}`,
        flatten: true,
        schema: HEADER_ENTITY_KEYS.map((key) => this._optionSchema("h", index, key)),
      });
    });

    schema.push({ name: "entities", selector: this._entitySelector });

    this._entityList("entities").forEach((entityId, index) => {
      schema.push({
        type: "expandable",
        name: `e_${index}`,
        title: `${index + 1}. ${this._entityName(entityId)}`,
        flatten: true,
        schema: BODY_ENTITY_KEYS.map((key) => this._optionSchema("e", index, key)),
      });
    });

    return schema;
  }

  _optionSchema(prefix, index, key) {
    const name = `${prefix}_${index}_${key}`;
    switch (key) {
      case "show_units":
        return { name, selector: { boolean: {} } };
      case "max":
        return { name, selector: { number: { min: 0, mode: "box" } } };
      case "max_entity":
        return { name, selector: { entity: { domain: "sensor" } } };
      case "icon":
        return { name, selector: { icon: {} } };
      default:
        return { name, selector: { text: {} } };
    }
  }

  _entityName(entityId) {
    const stateObj = this._hass?.states?.[entityId];
    return stateObj?.attributes?.friendly_name || entityId;
  }

  _render() {
    if (!this._hass) return;

    if (!this._form) {
      this.shadowRoot.innerHTML = `
        <style>
          ha-form { display: block; }
          .hint {
            color: var(--secondary-text-color);
            font-size: 0.8rem;
            margin: 12px 0 0 0;
          }
        </style>
        <ha-form></ha-form>
        <p class="hint"></p>
      `;
      this._form = this.shadowRoot.querySelector("ha-form");
      this._hint = this.shadowRoot.querySelector(".hint");
      this._form.addEventListener("value-changed", (ev) => this._valueChanged(ev));
    }

    // Assign the schema first so `ha-form` renders with the correct shape.
    this._form.hass = this._hass;
    this._form.schema = this._schema;
    this._form.computeLabel = (item) => this._computeLabel(item);
    this._form.computeHelper = (item) => this._computeHelper(item);
    this._form.data = this._formData;

    const garminEntities = findGarminEntityIds(this._hass);
    this._hint.textContent = garminEntities.length
      ? `${garminEntities.length} Garmin Connect entities detected. Tip: ` +
        "`Maximum from attribute` with `goal` turns a daily goal into a full ring."
      : "No Garmin Connect entities detected yet. Set up the Garmin Connect integration first.";
  }

  _computeLabel(item) {
    if (EDITOR_LABELS[item.name]) return EDITOR_LABELS[item.name];
    const match = /^[he]_(\d+)_(.+)$/.exec(item.name || "");
    if (match && ENTITY_OPTION_LABELS[match[2]]) return ENTITY_OPTION_LABELS[match[2]];
    return undefined;
  }

  _computeHelper(item) {
    switch (item.name) {
      case "battery_entity":
        return "Optional battery sensor shown next to the title.";
      case "max":
        return "Used for entities without their own maximum or goal.";
      case "columns":
        return "Number of rings per row. Leave empty to size automatically.";
      case "ring_size":
        return "Ring radius in pixels (24 - 80).";
      default:
        return undefined;
    }
  }

  /* ------------------------------------------------------------------ */

  _valueChanged(ev) {
    const data = ev.detail.value;
    const managed = {
      title: data.title || undefined,
      battery_entity: data.battery_entity || undefined,
      header: data.header !== false,
      show_units_header: Boolean(data.show_units_header),
      show_units: Boolean(data.show_units),
      layout: data.layout || "rings",
      max: data.max === undefined || data.max === "" ? DEFAULT_MAX : Number(data.max),
      columns: data.columns ? Number(data.columns) : undefined,
      ring_size: data.ring_size ? Number(data.ring_size) : undefined,
      header_entities: this._buildList(data, data.header_entities || [], "h", HEADER_ENTITY_KEYS),
      entities: this._buildList(data, data.entities || [], "e", BODY_ENTITY_KEYS),
    };

    const config = { ...this._config, ...managed };
    Object.keys(config).forEach((key) => {
      const value = config[key];
      if (value === undefined) {
        delete config[key];
        return;
      }
      // Keep the generated YAML free of values that already are the default.
      if (EDITOR_DEFAULTS[key] !== undefined && EDITOR_DEFAULTS[key] === value) {
        delete config[key];
      }
    });
    config.type = this._config.type || "custom:garmin-card";

    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  _buildList(data, ids, prefix, keys) {
    return ids.map((entityId, index) => {
      const entry = { entity: entityId };

      keys.forEach((key) => {
        const raw = data[`${prefix}_${index}_${key}`];
        const value = typeof raw === "string" ? raw.trim() : raw;

        if (key === "color_stops") {
          const stops = this._parseColorStops(value);
          if (stops) entry.color_stops = stops;
          return;
        }
        if (value === undefined || value === null || value === "") return;
        if (key === "show_units") {
          if (value) entry.show_units = true;
          return;
        }
        if (key === "max") {
          entry.max = Number(value);
          return;
        }
        entry[key] = value;
      });

      return entry;
    });
  }

  /** Very small parser for `0: red, 60: orange, 90: green`. */
  _parseColorStops(text) {
    if (!text || typeof text !== "string") return undefined;

    const stops = {};
    text
      .split(/[,\n]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => {
        const separator = part.indexOf(":");
        if (separator === -1) return;
        const key = Number(part.slice(0, separator).replace(/['"]/g, "").trim());
        const color = part.slice(separator + 1).replace(/['"]/g, "").trim();
        if (Number.isFinite(key) && color) stops[String(key)] = color;
      });

    return Object.keys(stops).length ? stops : undefined;
  }
}

/* -------------------------------------------------------------------------- */

if (!customElements.get("garmin-card")) {
  customElements.define("garmin-card", GarminCard);
}
if (!customElements.get("garmin-card-editor")) {
  customElements.define("garmin-card-editor", GarminCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "garmin-card",
  name: "Garmin Card",
  description:
    "Show Garmin Connect fitness data: activity rings, goals, sleep, body battery, training readiness and more.",
  preview: true,
  documentationURL: "https://github.com/acdcnow/Garmin-Card",
  getEntitySuggestion: (hass, entityId) => GarminCard.getEntitySuggestion(hass, entityId),
});
