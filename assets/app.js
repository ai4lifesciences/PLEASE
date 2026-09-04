"use strict";

const app = document.querySelector("#app");
const loading = document.querySelector("#loading");
const detailPanel = document.querySelector("#detail-panel");
const detailContent = document.querySelector("#detail-content");
const detailClose = document.querySelector("#detail-close");
const scrim = document.querySelector("#scrim");

const store = {
  summary: null,
  headline: null,
  propositions: [],
  claims: [],
  families: [],
  debt: [],
  methods: null,
  route: "overview",
  page: 1,
  filters: {},
};

const routes = new Set(["overview", "propositions", "claims", "families", "debt", "methods"]);
const overviewSections = new Set(["assemble", "map", "audit", "explain", "generalize", "act"]);
const pageSizes = { propositions: 35, claims: 25, families: 30, debt: 30 };

const labels = {
  aba: "ABA signalling",
  heat_shock: "Heat-shock programme",
  hormone_crosstalk: "Hormone crosstalk",
  defense_programmed_cell_death: "Defence-associated cell death",
  salicylic_acid_defense: "Salicylic-acid defence",
  jasmonate_ethylene_defense: "Jasmonate–ethylene defence",
  pti_pattern_triggered_immunity: "Pattern-triggered immunity",
  antimicrobial_pr_penetration_defense: "Antimicrobial and penetration defence",
  eti_nlr_signaling: "NLR-mediated immunity",
  surface_penetration_callose_defense: "Surface and callose defence",
  sugar_transport_resource_reallocation: "Resource reallocation",
  rboh_generator: "RBOH-generated ROS",
  root_cap: "Root cap",
  endodermis_barrier: "Endodermal barrier",
  not_applicable: "Not applicable",
  single_cell_or_nucleus: "Single-cell or nucleus",
  sorted_or_enriched_population: "Sorted or enriched",
  spatial_region: "Spatial region",
  laser_capture_cell_layer: "Laser-capture layer",
  bulk_tissue_or_organ: "Bulk tissue or organ",
  late_gt48h: "Late, >48 h",
  early_0_12h: "Early, 0–12 h",
  intermediate_gt12_48h: "Intermediate, 12–48 h",
  protist_clubroot: "Clubroot",
  immune_activation_proxy: "Immune activation proxy",
  high_light: "High light",
  progressive_drought: "Progressive drought",
  primary: "Used in statistics",
  analysis_sensitive: "Sensitive to analysis choices",
  directional_only: "Direction supported; independent confirmation limited",
  robust: "Supported across tested analyses",
  high: "High evidence confidence",
  limited: "Limited evidence confidence",
  moderate: "Moderate evidence confidence",
  detected: "Context dependence detected",
  not_detected: "No context dependence detected",
  partially_tested: "Partially tested",
  sensitive: "Sensitive",
  stable: "Stable across tested analyses",
  untested: "Not tested",
  high_support: "High annotation support",
  moderate_support: "Moderate annotation support",
  annotation_resolution_out_of_scope: "Cell annotation outside the audited scope",
  annotation_sensitivity: "Sensitivity to cell annotation",
  cell_state_shift: "Cell-state shift",
  cell_type_program: "Cell-type response programme",
  context_specific_program: "Context-specific response programme",
  cross_species_out_of_scope: "Cross-species conclusion outside the audited scope",
  directional: "Directional response",
  intensity_by_cell_state_interaction: "Stress-intensity by cell-state interaction",
  module_direction: "Response-programme direction",
  multi_module_direction: "Multiple-programme direction",
  orthogonal_splicing_response: "Alternative-splicing response",
  phase_specific_module_direction: "Time-specific programme direction",
  program_out_of_scope: "Response programme outside the audited scope",
  program_support: "Response-programme support",
  responder_rank_proxy: "Relative responder ranking",
  response_heterogeneity: "Variation among biological contexts",
  source_only_out_of_scope: "Source evidence outside the audited scope",
  stress_contrast_divergence: "Difference between stress comparisons",
  within_study_cell_type_heterogeneity: "Variation among cell types within a study",
  "inventory only": "Catalogued only",
  "density mismatch": "Replication gap",
  "replication gap": "Replication gap",
  "replication debt": "Replication-gap score",
  "audit priority": "Reanalysis priority",
  drought_recovery: "Drought recovery",
  phosphate_limitation: "Phosphate limitation",
  "*": "All recorded categories",
  all_modules: "Multiple response programmes",
  aquaporin: "Aquaporins and water transport",
  autophagy_core: "Core autophagy programme",
  cell_wall: "Cell-wall remodelling",
  indolic_phytoalexin_defense: "Indolic phytoalexin defence",
  ion_transport: "Ion transport",
  nonhair_marker: "Non-hair epidermal identity",
  osmotic: "Osmotic-stress response",
  photosynthesis: "Photosynthesis",
  root_hair_growth: "Root-hair growth",
  root_hair_identity: "Root-hair identity",
  root_hair_marker: "Root-hair marker programme",
  ros: "Reactive oxygen response",
  wrky_defense_regulation: "WRKY-mediated defence regulation",
  aluminum: "Aluminium stress",
  arsenic: "Arsenic stress",
  bacterium: "Bacterial infection",
  cold: "Cold stress",
  combined_cold_high_light: "Cold and high light",
  combined_heat_drought: "Heat and drought",
  combined_heat_high_light: "Heat and high light",
  dehydration: "Dehydration",
  drought: "Drought",
  drought_heat_factorial: "Drought and heat",
  fungus: "Fungal infection",
  heat: "Heat stress",
  hormone: "Hormone treatment",
  humidity: "Humidity stress",
  hypoxia: "Hypoxia",
  low_temperature_salt: "Cold and salt",
  nematode: "Nematode infection",
  salt: "Salt stress",
  soil_compaction: "Soil compaction",
  submergence: "Submergence",
  submergence_recovery: "Recovery after submergence",
  virus: "Viral infection",
  water_deficit: "Water deficit",
  water_deficit_recovery: "Recovery after water deficit",
  waterlogging: "Waterlogging",
  waterlogging_recovery: "Recovery after waterlogging",
  ABA: "ABA treatment",
  ABA_4h: "ABA treatment, 4 h",
  NaCl100mM: "100 mM sodium chloride",
  HeatShock_38C_45min: "Heat shock, 38 °C for 45 min",
  HeatShock_42C_2h: "Heat shock, 42 °C for 2 h",
  Hypoxia_2h: "Hypoxia, 2 h",
  Hypoxia_4pctO2_4h: "Hypoxia, 4% oxygen for 4 h",
  Progressive_drought_D00_D08: "Progressive drought, days 0–8",
  Rehydration15min: "Rehydration, 15 min",
  coleoptile: "Coleoptile",
  cotyledon: "Cotyledon",
  fifth_leaf_growth_zone: "Fifth-leaf growth zone",
  hypocotyl: "Hypocotyl",
  mature_root: "Mature root",
  mature_third_leaf: "Mature third leaf",
  primary_root_tip_growth_zone: "Primary root-tip growth zone",
  root_apex: "Root apex",
  root_tip: "Root tip",
  root_tip_bulk: "Whole root tip",
  rosette: "Rosette",
  rosette_leaf: "Rosette leaf",
  whole_rosette_leaf: "Whole rosette leaf",
  whole_seedling: "Whole seedling",
  all_cell_resolved: "Multiple resolved cell types",
  barrier_endodermis: "Endodermis",
  cell_cycle_state: "Cell-cycle state",
  epidermal: "Epidermal cells",
  epidermal_frontline: "Epidermal cells",
  epidermis: "Epidermis",
  exodermis_barrier: "Exodermal barrier",
  fiber_sclerenchyma: "Fibre and sclerenchyma",
  ground_cortex_mesophyll: "Ground tissue, cortex or mesophyll",
  ground_tissue: "Ground tissue",
  guard: "Guard cells",
  infection_spatial_zone: "Infection-associated spatial zone",
  mixed: "Mixed cell types",
  mixed_cell_population: "Mixed cell population",
  photosynthetic: "Photosynthetic cells",
  spatial_context: "Spatially defined tissue",
  spatial_region_bulk: "Spatial region or bulk tissue",
  unresolved: "Not resolved",
  vascular: "Vascular tissue",
  vascular_stele: "Vascular stele",
  vascular_transport: "Vascular transport tissue",
  any: "Direction varies",
  cell_type_specific: "Cell-type specific",
  context_dependent: "Context dependent",
  highest: "Strongest response",
  late_up: "Increases at a later time",
  maintained: "Maintained response",
  network_activation: "Network activation",
  not_highest: "Not the strongest response",
  protective_up: "Protective response increases",
  splicing_change: "Alternative splicing changes",
  unspecified: "Not specified",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function label(value) {
  if (value === null || value === undefined || value === "" || value === "unknown") return "Not resolved";
  if (String(value).includes(";")) return String(value).split(";").map(label).join(", ");
  if (labels[value]) return labels[value];
  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function moduleLabel(value) {
  if (value === "*") return "Overall transcriptional response";
  if (value === "all_modules") return "Multiple response programmes";
  return label(value);
}

function contextLabel(value, category) {
  if (value === "*") return `All recorded ${category}`;
  return label(value);
}
function compact(value, digits = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "–";
  if (Math.abs(number) >= 1000) return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: digits }).format(number);
  return new Intl.NumberFormat("en").format(number);
}

function fixed(value, digits = 3) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : "–";
}

function percent(value, digits = 1) {
  const number = Number(value);
  return Number.isFinite(number) ? `${(number * 100).toFixed(digits)}%` : "–";
}

function badge(value, className = "") {
  return `<span class="badge ${escapeHtml(className || value || "")}">${escapeHtml(label(value))}</span>`;
}

function directionPhrase(value) {
  if (value === "up") return "increases";
  if (value === "down") return "decreases";
  if (value === "mixed" || value === "tied") return "has mixed directional evidence";
  return "has an unresolved direction";
}

function stressContext(value) {
  const stress = label(value);
  return stress === "Not resolved" ? "in the recorded stress context" : `under ${stress.toLowerCase()}`;
}

function evidenceStatement(item) {
  return `${label(item.module)} ${directionPhrase(item.direction)} ${stressContext(item.stress)}`;
}

function claimStatement(item) {
  return item.assertions?.[0]?.paraphrase || item.scope || `${moduleLabel(item.module)} ${stressContext(item.stress)}`;
}

function familyTitle(item) {
  return item.sources?.[0]?.title || `${item.species.map(label).join(", ") || "Plant"} response to ${item.stress.map(label).join(", ").toLowerCase() || "stress"}`;
}

function questionStatement(item) {
  return `${label(item.module)} response ${stressContext(item.stress)}`;
}
function optionList(items, selected, allLabel = "All") {
  const options = [`<option value="">${escapeHtml(allLabel)}</option>`];
  for (const item of [...new Set(items.filter(value => value !== null && value !== undefined))].sort()) {
    options.push(`<option value="${escapeHtml(item)}"${String(item) === String(selected) ? " selected" : ""}>${escapeHtml(label(item))}</option>`);
  }
  return options.join("");
}

function toolbarField(name, title, items, selected, allLabel = `All ${title.toLowerCase()}`) {
  return `<div class="field">
    <label for="${escapeHtml(name)}">${escapeHtml(title)}</label>
    <select id="${escapeHtml(name)}" data-filter="${escapeHtml(name)}">
      ${optionList(items, selected, allLabel)}
    </select>
  </div>`;
}

function pageHeading(title, description, scope = "") {
  return `<header class="page-heading">
    <div><h1>${title}</h1><p>${description}</p></div>
    ${scope ? `<div class="scope-note">${scope}</div>` : ""}
  </header>`;
}

function currentRoute() {
  const route = window.location.hash.replace(/^#/, "").split("?")[0] || "overview";
  return routes.has(route) ? route : "overview";
}

function setActiveNav() {
  document.querySelectorAll("[data-route]").forEach(link => {
    link.classList.toggle("active", link.dataset.route === store.route);
    if (link.dataset.route === store.route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function render() {
  const target = window.location.hash.replace(/^#/, "").split("?")[0] || "overview";
  store.route = currentRoute();
  document.body.classList.toggle("overview-route", store.route === "overview");
  setActiveNav();
  const renderers = {
    overview: renderOverview,
    propositions: renderPropositions,
    claims: renderClaims,
    families: renderFamilies,
    debt: renderDebt,
    methods: renderMethods,
  };
  app.innerHTML = renderers[store.route]();
  bindPageEvents();
  if (store.route === "overview" && overviewSections.has(target)) {
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function portabilityChart(rows) {
  const width = 700;
  const height = 305;
  const margin = { left: 52, right: 18, top: 20, bottom: 64 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const x = index => margin.left + index * (innerW / (rows.length - 1));
  const y = value => margin.top + innerH * (1 - Number(value));
  const series = [
    ["external_match_coverage", "#2f7f78", "Match coverage"],
    ["conditional_direction_accuracy", "#b89242", "Conditional direction"],
    ["evidence_portability", "#835b75", "Evidence portability"],
  ];
  const paths = series.map(([key, colour, name]) => {
    const points = rows.map((row, index) => `${x(index)},${y(row[key])}`).join(" ");
    const circles = rows.map((row, index) => `<circle cx="${x(index)}" cy="${y(row[key])}" r="4.5" fill="${colour}"><title>${name}: ${fixed(row[key])}</title></circle>`).join("");
    return `<polyline points="${points}" fill="none" stroke="${colour}" stroke-width="2.4"/>${circles}`;
  }).join("");
  const grid = [0, .25, .5, .75, 1].map(value => `<g><line x1="${margin.left}" x2="${width - margin.right}" y1="${y(value)}" y2="${y(value)}" stroke="#d8dfda"/><text x="${margin.left - 10}" y="${y(value) + 4}" text-anchor="end" fill="#60716b" font-size="11">${value.toFixed(2)}</text></g>`).join("");
  const xLabels = rows.map((row, index) => `<text x="${x(index)}" y="${height - 34}" text-anchor="middle" fill="#44564f" font-size="11">${escapeHtml(label(row.specificity_level).replace("-Conditioned Module", ""))}</text>`).join("");
  const legend = series.map(([key, colour, name], index) => `<g transform="translate(${margin.left + index * 185},${height - 7})"><line x1="0" x2="20" y1="0" y2="0" stroke="${colour}" stroke-width="3"/><text x="27" y="4" fill="#60716b" font-size="11">${name}</text></g>`).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="External match coverage and evidence portability decline with claim specificity while conditional direction remains nearly stable">${grid}${paths}${xLabels}${legend}</svg>`;
}

function dependencyArchitecture() {
  const h = store.summary.headline;
  return `<div class="architecture" aria-label="Analytical depth and biological independence">
    <div class="arch-layer route"><strong>${compact(h.route_records)}</strong><span>broad route-level records</span></div>
    <div class="arch-layer spec"><strong>27,000</strong><span>analytical specifications</span></div>
    <div class="arch-layer object"><strong>${compact(h.evidence_objects)}</strong><span>audited evidence objects</span></div>
    <div class="arch-separator" aria-hidden="true"></div>
    <div class="arch-foundation">
      <div><strong>${h.inventory_families}</strong><span>catalogued study groups</span></div>
      <div><strong>${h.inferential_families}</strong><span>study groups used in statistical analyses</span></div>
    </div>
    <p class="arch-note">Analytical layers remain nested within the same biological material.</p>
  </div>`;
}

function visualPanel(file, title, caption, options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const eyebrow = options.eyebrow || "Evidence view";
  const loadingMode = options.eager ? "eager" : "lazy";
  return `<figure class="evidence-visual${className}">
    <a class="evidence-image" href="assets/panels/${file}.png" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(title)} at full resolution">
      <img src="assets/panels/${file}.png" loading="${loadingMode}" decoding="async" alt="${escapeHtml(options.alt || title)}">
    </a>
    <figcaption><span>${escapeHtml(eyebrow)}</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(caption)}</p></figcaption>
  </figure>`;
}

function findingStat(value, title, note = "") {
  return `<div class="finding-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(title)}</span>${note ? `<small>${escapeHtml(note)}</small>` : ""}</div>`;
}

function crossDomainGraphic(rows) {
  const usable = rows.filter(row => row.endpoint_type === "direction_transfer");
  return `<div class="transfer-bars" role="img" aria-label="Direction agreement when evidence is transferred between abiotic and biotic stress studies">
    ${usable.map(row => {
      const names = {
        global_programme: "Overall programme",
        broad_shared_axis: "Broad shared response",
        organ_or_resolution_context: "Matched organ or measurement",
        cell_organ_lineage_context: "Matched cell lineage",
      };
      return `<div class="transfer-row"><span>${names[row.abstraction_level] || label(row.abstraction_level)}</span><div><i style="width:${Number(row.family_balanced_transfer_accuracy) * 100}%"></i></div><strong>${percent(row.family_balanced_transfer_accuracy, 1)}</strong><small>${row.target_families} studies</small></div>`;
    }).join("")}
  </div>`;
}

function bridgeSurvivalGraphic(rows) {
  const names = {
    candidate_module_pairs: "Predefined programme pairs",
    pairs_with_seed_overlap: "Pairs sharing seed genes",
    fdr10_overlap_pairs: "Pairs passing overlap control",
    pair_by_lineage_tests: "Cell-lineage tests",
    direction_concordant_tests: "Directionally concordant",
    bilateral_loo_stable_tests: "Stable when each study is omitted",
    bilaterally_calibrated_bridges: "Passed calibration in both stress types",
  };
  return `<div class="survival-rail" aria-label="Candidate shared molecular responses remaining after progressively stricter evidence checks">
    ${rows.map((row, index) => `<div class="survival-stage ${index === rows.length - 1 ? "terminal" : ""}">
      <strong>${row.retained_units}</strong><span>${escapeHtml(names[row.stage] || label(row.stage))}</span>
    </div>`).join("")}
  </div>`;
}


function storyVisual(file, title, caption, className = "") {
  return `<figure class="story-visual ${escapeHtml(className)}">
    <a href="assets/story/${encodeURIComponent(file)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(title)} at full resolution">
      <img src="assets/story/${encodeURIComponent(file)}" loading="${className.includes("home-scope") ? "eager" : "lazy"}" ${className.includes("home-scope") ? 'fetchpriority="high"' : ''} decoding="async" alt="${escapeHtml(title)}">
    </a>
    <figcaption><strong>${escapeHtml(title)}</strong><p>${escapeHtml(caption)}</p></figcaption>
  </figure>`;
}

function interactivePanel(title, description, body, className = "") {
  return `<article class="panel interactive-panel ${escapeHtml(className)}"><header class="panel-header"><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div><span class="live-key">Live view</span></header>${body}</article>`;
}

function programmeSupportChart(items) {
  const modules = new Map();
  for (const item of items) {
    if (!modules.has(item.module)) modules.set(item.module, { families: new Set(), objects: 0, statements: 0 });
    const entry = modules.get(item.module);
    item.family_ids.forEach(id => entry.families.add(id));
    entry.objects += Number(item.evidence_objects || 0);
    entry.statements += 1;
  }
  const rows = [...modules.entries()].map(([module, value]) => ({ module, families: value.families.size, objects: value.objects, statements: value.statements }))
    .sort((a, b) => b.families - a.families || b.objects - a.objects).slice(0, 14);
  const maximum = Math.max(...rows.map(row => row.families), 1);
  if (!rows.length) return `<p class="empty-chart">No programmes match the current filters.</p>`;
  return `<div class="rank-chart" role="img" aria-label="Response programmes ranked by biologically independent study support">
    ${rows.map((row, index) => `<button class="rank-row" type="button" data-programme-filter="${escapeHtml(row.module)}" title="Filter to ${escapeHtml(label(row.module))}">
      <span class="rank-number">${String(index + 1).padStart(2, "0")}</span><span class="rank-name">${escapeHtml(label(row.module))}<small>${row.statements} statements · ${compact(row.objects)} evidence records</small></span>
      <span class="rank-track"><i style="width:${Math.max(3, row.families / maximum * 100)}%"></i></span><strong>${row.families}<small>independent studies</small></strong>
    </button>`).join("")}
  </div>`;
}

function claimSupportChart(items) {
  const width = 720, height = 390;
  const margin = { left: 58, right: 24, top: 20, bottom: 58 };
  const maxX = Math.max(...items.map(item => item.proposition_ids.length), 2);
  const maxY = Math.max(...items.map(item => item.family_ids.length), 2);
  const x = value => margin.left + Math.log1p(value) / Math.log1p(maxX) * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - value / maxY * (height - margin.top - margin.bottom);
  const ticksX = [1, 3, 10, 30, 100, 300, 1000].filter(value => value <= maxX);
  const ticksY = [...new Set([0, 1, 2, 5, 10, 20, maxY].filter(value => value <= maxY))].sort((a,b) => a-b);
  const grid = ticksY.map(value => `<g><line x1="${margin.left}" x2="${width-margin.right}" y1="${y(value)}" y2="${y(value)}" stroke="#e5e8e4"/><text x="${margin.left-10}" y="${y(value)+4}" text-anchor="end">${value}</text></g>`).join("");
  const xaxis = ticksX.map(value => `<g><line x1="${x(value)}" x2="${x(value)}" y1="${height-margin.bottom}" y2="${height-margin.bottom+5}" stroke="#819089"/><text x="${x(value)}" y="${height-margin.bottom+20}" text-anchor="middle">${value}</text></g>`).join("");
  const dots = items.map(item => {
    const colour = item.expected_direction === "up" ? "#397d70" : item.expected_direction === "down" ? "#b66c58" : "#8d8098";
    const radius = Math.min(9, 3.5 + Math.sqrt(item.assertions.length || 1));
    return `<circle class="scatter-point" data-detail="claim" data-id="${escapeHtml(item.id)}" cx="${x(item.proposition_ids.length)}" cy="${y(item.family_ids.length)}" r="${radius}" fill="${colour}" fill-opacity=".72" stroke="#fff" stroke-width="1"><title>${escapeHtml(claimStatement(item))} | ${item.proposition_ids.length} linked statements | ${item.family_ids.length} independent studies</title></circle>`;
  }).join("");
  return `<svg class="interactive-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Published conclusions plotted by linked atlas statements and independent study support">${grid}${xaxis}<line x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height-margin.bottom}" stroke="#819089"/><line x1="${margin.left}" x2="${width-margin.right}" y1="${height-margin.bottom}" y2="${height-margin.bottom}" stroke="#819089"/>${dots}<text class="axis-title" x="${(margin.left+width-margin.right)/2}" y="${height-8}" text-anchor="middle">Linked atlas statements, log scale</text><text class="axis-title" transform="translate(16 ${(margin.top+height-margin.bottom)/2}) rotate(-90)" text-anchor="middle">Independent studies</text></svg>`;
}

function familyLandscape(items) {
  const width = 720, height = 390;
  const margin = { left: 62, right: 24, top: 22, bottom: 58 };
  const maxX = Math.max(...items.map(item => Number(item.study_level_comparisons)), 2);
  const maxY = Math.max(...items.map(item => Number(item.evidence_objects)), 2);
  const x = value => margin.left + value / maxX * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - Math.log1p(value) / Math.log1p(maxY) * (height - margin.top - margin.bottom);
  const xTicks = [...new Set([0, 10, 25, 50, 75, 100, maxX].filter(v => v <= maxX))].sort((a,b)=>a-b);
  const yTicks = [1, 3, 10, 30, 100, 300, 1000].filter(v => v <= maxY);
  const grid = yTicks.map(value => `<g><line x1="${margin.left}" x2="${width-margin.right}" y1="${y(value)}" y2="${y(value)}" stroke="#e5e8e4"/><text x="${margin.left-10}" y="${y(value)+4}" text-anchor="end">${value}</text></g>`).join("");
  const xaxis = xTicks.map(value => `<g><line x1="${x(value)}" x2="${x(value)}" y1="${height-margin.bottom}" y2="${height-margin.bottom+5}" stroke="#819089"/><text x="${x(value)}" y="${height-margin.bottom+20}" text-anchor="middle">${value}</text></g>`).join("");
  const dots = items.map(item => `<circle class="scatter-point" data-detail="family" data-id="${escapeHtml(item.id)}" cx="${x(item.study_level_comparisons)}" cy="${y(item.evidence_objects)}" r="${item.primary_inference ? 5.2 : 3.8}" fill="${item.arm === "abiotic" ? "#4f8d84" : "#ad715d"}" fill-opacity="${item.primary_inference ? .78 : .38}" stroke="${item.primary_inference ? "#fff" : "#596a63"}" stroke-width="1"><title>${escapeHtml(familyTitle(item))} | ${item.study_level_comparisons} study-level stress–context comparisons | ${item.evidence_objects} evidence records | ${item.accessions.join(", ")}</title></circle>`).join("");
  return `<svg class="interactive-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Independent studies plotted by response programme breadth and evidence records">${grid}${xaxis}<line x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height-margin.bottom}" stroke="#819089"/><line x1="${margin.left}" x2="${width-margin.right}" y1="${height-margin.bottom}" y2="${height-margin.bottom}" stroke="#819089"/>${dots}<text class="axis-title" x="${(margin.left+width-margin.right)/2}" y="${height-8}" text-anchor="middle">Study-level stress–context comparisons</text><text class="axis-title" transform="translate(16 ${(margin.top+height-margin.bottom)/2}) rotate(-90)" text-anchor="middle">Evidence records, log scale</text></svg>`;
}

function replicationGapRank(items) {
  const rows = items.filter(item => item.density_mismatch).sort((a,b) => b.replication_debt_index-a.replication_debt_index).slice(0,12);
  const maximum = Math.max(...rows.map(row => Number(row.replication_debt_index)), 1);
  if (!rows.length) return `<p class="empty-chart">No flagged replication gaps match the current filters.</p>`;
  return `<div class="gap-rank">${rows.map(row => `<button type="button" data-detail="debt" data-id="${escapeHtml(row.coordinate_id)}"><span>${escapeHtml(label(row.module))}<small>${escapeHtml([label(row.stress), label(row.organ), label(row.lineage)].join(" · "))}</small></span><i><b style="width:${Number(row.replication_debt_index)/maximum*100}%"></b></i><strong>${fixed(row.replication_debt_index,2)}<small>${row.evidence_objects} records · ${row.independent_families} studies</small></strong></button>`).join("")}</div>`;
}

function dataSourceLinks(item, limit = Infinity) {
  const sources = (item?.data_sources || []).slice(0, limit);
  if (!sources.length) return `<span class="muted">No public accession resolved</span>`;
  const links = sources.map(source => `<a class="accession-link" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer" title="Open ${escapeHtml(source.repository)}">${escapeHtml(source.accession)}<span aria-hidden="true">↗</span></a>`).join(" ");
  const remainder = item.data_sources.length - sources.length;
  return `${links}${remainder > 0 ? `<span class="source-more">+${remainder}</span>` : ""}`;
}

function linkedStudySources(ids) {
  const families = ids.map(id => store.families.find(item => item.id === id)).filter(Boolean);
  if (!families.length) return `<p>No independent study source is linked.</p>`;
  return `<div class="linked-study-list">${families.map(item => `<div><strong>${escapeHtml(familyTitle(item))}</strong><span class="mono">${escapeHtml(item.id)}</span><p>${dataSourceLinks(item)}</p></div>`).join("")}</div>`;
}

function renderOverview() {
  const h = store.summary.headline;
  const recurrence = store.headline.recurrence_by_arm;
  const cases = store.headline.decision_cases;

  return `<div class="home-page">
    <section class="home-resource-mark" aria-label="PLEASE, PLant Evidence Atlas for StrEss">
      <img src="assets/brand/please-mark.png" alt="PLEASE resource mark">
      <div><strong>PLEASE</strong><span><b>PL</b>ant <b>E</b>vidence <b>A</b>tlas for <b>S</b>tr<b>E</b>ss</span></div>
    </section>
    <section class="atlas-hero">
      <div class="atlas-hero-copy">
        <h1>Which plant-stress findings have truly independent support?</h1>
        <p class="hero-deck">PLEASE connects published transcriptomic conclusions to the experiments, biological contexts and analysis choices behind them. It distinguishes repeated analysis of the same material from confirmation in a genuinely independent study.</p>
        <div class="hero-actions"><a class="button" href="#propositions">Explore the evidence</a><a class="button secondary" href="#methods">Download the complete release</a></div>
        <section class="evidence-ledger" aria-label="Resource scale">
          ${findingStat(compact(h.candidate_clusters), "search-stage study clusters", "before eligibility and dependency resolution")}
          ${findingStat(h.inventory_families, "independent experiments catalogued", "57 support primary inference")}
          ${findingStat(h.published_claims, "standardized published conclusions")}
          ${findingStat(compact(h.atlas_propositions), "testable biological statements")}
          ${findingStat(compact(h.evidence_objects), "audited evidence records")}
          ${findingStat(compact(h.route_records), "route-level evidence records")}
        </section>
        <div class="hero-finding"><strong>Central finding</strong><span>As biological questions become more specific, context-matched independent evidence becomes scarce much faster than response direction changes among the studies that can still be compared.</span></div>
      </div>
    </section>

    ${storyVisual("01-biological-coverage.png", "One atlas across plant organs, stresses and measurement resolutions", "Abiotic and biotic stress evidence is organized across organs and experimental resolutions, from whole tissues and enriched populations to single cells, nuclei and spatial regions.", "home-scope")}

    <nav class="evidence-journey" aria-label="Evidence atlas storyline">
      <a href="#assemble"><b>01</b><span>Assemble<small>Resolve independence</small></span></a>
      <a href="#map"><b>02</b><span>Map<small>Find recurring biology</small></span></a>
      <a href="#audit"><b>03</b><span>Audit<small>Test corroboration</small></span></a>
      <a href="#explain"><b>04</b><span>Explain<small>Map sampling gaps</small></span></a>
      <a href="#generalize"><b>05</b><span>Generalize<small>Test transfer limits</small></span></a>
      <a href="#act"><b>06</b><span>Act<small>Choose the next study</small></span></a>
    </nav>

    <section class="evidence-section assemble-section" id="assemble">
      <header class="editorial-heading"><div><span>01 · ASSEMBLE</span><h2>Dense analytical evidence rests on a much smaller independent biological base</h2></div><p>PLEASE keeps publications, propositions, evidence records, analysis settings and route effects distinct, then resolves all records that share biological material into one independent experiment.</p></header>
      ${storyVisual("03-search-evidence-map.png", "Complementary searches recover different parts of the public evidence base", "The quantified GEO, ENA/SRA and PubMed search core produced 26,575 candidate clusters; specialist repositories, full text and supplementary files supplied complementary discovery and asset recovery.", "story-wide story-secondary")}
      <a class="section-link prominent-link" href="#families">Browse the independent studies and original data <span aria-hidden="true">→</span></a>
    </section>

    <section class="evidence-section map-section" id="map">
      <header class="editorial-heading"><div><span>02 · MAP</span><h2>Recognizable stress biology remains after dependent evidence is collapsed</h2></div><p>Every independent experiment contributes one family-level directional summary, so heavily reanalysed datasets cannot dominate recurrence.</p></header>
      ${storyVisual("04-programme-map.png", "Independent experiments retain coherent stress-response programmes", "The study-by-programme map shows which response programmes can be evaluated in each experiment and their family-level direction.", "story-wide")}
      <div class="home-result-pair">${recurrence.map(row => `<div class="arm-result ${escapeHtml(row.arm)}"><span>${escapeHtml(label(row.arm))} stress</span><strong>${fixed(row.observed_to_null_ratio, 2)}× matched expectation</strong><p>Observed family-balanced recurrence relative to matched random gene sets.</p><small>Retained in ${row.leave_one_family_out_p05_retained} of ${row.leave_one_family_out_runs} leave-one-study analyses</small></div>`).join("")}</div>
      <a class="section-link prominent-link" href="#propositions">Explore response programmes and biological contexts <span aria-hidden="true">→</span></a>
    </section>

    <section class="evidence-section audit-section" id="audit">
      <header class="editorial-heading"><div><span>03 · AUDIT</span><h2>Specific questions lose matching studies before they lose directional agreement</h2></div><p>Evidence portability separates the chance of finding another independent experiment in the same context from directional agreement once such a match exists.</p></header>
      ${storyVisual("05-specificity-portability.png", "Context specificity exposes a deficit of independent corroboration", "As stress, organ and cell lineage are added, the dominant transition is from matched to unmatched evidence rather than from agreement to contradiction.", "story-wide")}
      <div class="equation-band"><span>Evidence portability</span><b>=</b><span>independent-match coverage</span><b>×</b><span>conditional directional agreement</span></div>
    </section>

    <section class="evidence-section explain-section" id="explain">
      <header class="editorial-heading"><div><span>04 · EXPLAIN</span><h2>The public evidence base samples exact biological contexts very sparsely</h2></div><p>A full context combines stress domain, stress condition, organ, cell lineage and measurement resolution. Most occupied contexts are represented by only one independent experiment.</p></header>
      ${storyVisual("06-context-occupancy.png", "Independent study support is concentrated in a small part of context space", "Across 116 observed full contexts, 87 are singletons and only 14 are represented by at least three independent experiments.", "story-wide")}
      <div class="home-stat-triad">${findingStat("87 of 116", "contexts have one independent study", "75.0%")}${findingStat("15 of 116", "contexts have two independent studies")}${findingStat("14 of 116", "contexts have at least three studies", "12.1%")}</div>
    </section>

    <section class="evidence-section generalize-section" id="generalize">
      <header class="editorial-heading"><div><span>05 · GENERALIZE</span><h2>Broad cross-stress concordance does not establish a universal molecular programme</h2></div><p>Cross-domain direction transfer is tested separately from the stricter requirement that a predefined molecular relationship survive calibration in both abiotic and biotic stress evidence.</p></header>
      ${storyVisual("07-cross-domain-boundary.png", "Cross-domain calibration defines the boundary of generalization", "Broad directional agreement can coexist with zero programme pairs meeting the predefined bilateral molecular calibration criterion. The zero-survivor result is interpreted within its current power boundary.", "story-wide")}
    </section>

    <section class="evidence-section act-section" id="act">
      <header class="editorial-heading"><div><span>06 · ACT</span><h2>Evidence architecture determines the most useful next action</h2></div><p>Well-replicated programmes support mechanistic follow-up; narrow contexts need scoped validation; dense analysis from few experiments needs independent replication; unstable routes need analytical re-evaluation.</p></header>
      ${visualPanel("research-action-matrix", "An evidence-aware action map", "PLEASE converts independent support, contextual scope and analytical stability into four practical research actions without treating transcriptomic evidence as causal proof.", { eyebrow: "Research action", className: "action-matrix" })}
      <div class="action-browser-grid">
        ${cases.map(item => {
          const actionLabels = {
            prioritize_for_mechanistic_follow_up: "Mechanistic follow-up",
            downgrade_until_independent_replication: "Independent replication",
            retain_but_restrict_biological_scope: "Scoped validation",
            reanalyse_before_mechanistic_interpretation: "Analytical re-evaluation",
          };
          return `<a href="#debt" class="action-browser-item"><span>${actionLabels[item.decision_change] || label(item.decision_change)}</span><strong>${escapeHtml(label(item.module))}</strong><p>${escapeHtml(item.after_audit)}</p><small>${item.evidence_objects} evidence records · ${item.independent_families} independent studies</small></a>`;
        }).join("")}
      </div>
    </section>

    <section class="institute-context home-institute" aria-label="Institutional research context">
      <div class="institute-image"><img src="assets/institute/wheat-at-pbi.jpeg" loading="lazy" alt="Wheat field at the University of Sydney Plant Breeding Institute"></div>
      <div class="institute-copy"><p class="section-label">Research context</p><h2>Developed at the Plant Breeding Institute</h2><p>The University of Sydney established the Plant Breeding Institute in 1973 to sustain crop breeding and plant research. PLEASE extends that mission by making public plant-stress transcriptomic evidence traceable, comparable and reusable.</p><div class="institute-themes"><span>Cereal rust</span><span>Crop breeding</span><span>Horticulture</span><span>Plant stress biology</span></div><a class="institute-cta" href="https://www.sydney.edu.au/science/our-research/research-centres/plant-breeding-institute.html" target="_blank" rel="noreferrer">Visit the Plant Breeding Institute <span aria-hidden="true">↗</span></a></div>
    </section>
  </div>`;
}

function paginate(items, route) {
  const size = pageSizes[route];
  const pages = Math.max(1, Math.ceil(items.length / size));
  store.page = Math.min(Math.max(1, store.page), pages);
  return { rows: items.slice((store.page - 1) * size, store.page * size), pages };
}

function pagination(pages) {
  return `<div class="pagination"><button type="button" data-page="prev" ${store.page <= 1 ? "disabled" : ""} aria-label="Previous page">‹</button><span>Page ${store.page} of ${pages}</span><button type="button" data-page="next" ${store.page >= pages ? "disabled" : ""} aria-label="Next page">›</button></div>`;
}

function propositionResults() {
  const f = store.filters.propositions || {};
  const query = (f.query || "").toLowerCase();
  return store.propositions.filter(item => {
    if (f.arm && item.arm !== f.arm) return false;
    if (f.stress && item.stress !== f.stress) return false;
    if (f.organ && item.organ !== f.organ) return false;
    if (f.lineage && item.lineage !== f.lineage) return false;
    if (f.module && item.module !== f.module) return false;
    if (f.direction && item.direction !== f.direction) return false;
    if (f.resolution && item.resolution !== f.resolution) return false;
    if (query && ![item.id, item.module, item.stress, item.organ, item.lineage, item.species].join(" ").toLowerCase().includes(query)) return false;
    return true;
  }).sort((a, b) => b.independent_families - a.independent_families || b.evidence_objects - a.evidence_objects);
}

function renderPropositions() {
  const f = store.filters.propositions || {};
  const filtered = propositionResults();
  const { rows, pages } = paginate(filtered, "propositions");
  return `${pageHeading("Explore biological findings", "Search testable statements that combine a stress-response programme, biological context and direction of change.", "Every chart and count updates from the versioned resource data. Only biologically independent studies determine corroboration breadth.")}
    <div class="toolbar">
      <div class="field search"><label for="query">Search</label><input id="query" data-filter="query" value="${escapeHtml(f.query || "")}" placeholder="Response programme, stress, species or record ID"></div>
      ${toolbarField("arm", "Stress type", store.propositions.map(d => d.arm), f.arm)}
      ${toolbarField("stress", "Stress", store.propositions.map(d => d.stress), f.stress)}
      ${toolbarField("organ", "Organ", store.propositions.map(d => d.organ), f.organ)}
      ${toolbarField("lineage", "Cell lineage", store.propositions.map(d => d.lineage), f.lineage)}
      ${toolbarField("module", "Response programme", store.propositions.map(d => d.module), f.module)}
      ${toolbarField("direction", "Direction", store.propositions.map(d => d.direction), f.direction)}
      <button class="button secondary" type="button" data-action="reset-filters">Reset</button>
      <button class="button" type="button" data-action="export-propositions">Export filtered</button>
    </div>
    <section class="interactive-intro-grid">
      ${interactivePanel("Independent study support by response programme", "Select a programme to filter the browser. Bar length counts distinct experiments, never analytical routes.", programmeSupportChart(filtered), "programme-panel")}
      <aside class="interpretive-note"><span>How to read this view</span><h2>Frequency and independent corroboration are not interchangeable</h2><p>A testable statement may contain many evidence records from one experiment. The chart therefore unions study IDs before ranking response programmes.</p><dl><div><dt>${compact(filtered.length)}</dt><dd>visible statements</dd></div><div><dt>${new Set(filtered.flatMap(item => item.family_ids)).size}</dt><dd>independent studies represented</dd></div><div><dt>${compact(filtered.reduce((sum,item)=>sum+item.evidence_objects,0))}</dt><dd>evidence records represented</dd></div></dl></aside>
    </section>
    <div class="results-meta"><span>${compact(filtered.length)} of ${compact(store.propositions.length)} testable statements</span><span>Sorted by independent-study breadth</span></div>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Biological evidence statement</th><th>Stress type</th><th>Response programme</th><th>Stress</th><th>Organ</th><th>Cell lineage</th><th>Species</th><th>Direction</th><th class="numeric">Independent studies</th><th class="numeric">Evidence records</th></tr></thead><tbody>
    ${rows.map(item => `<tr data-detail="proposition" data-id="${escapeHtml(item.id)}"><td class="title-cell"><strong>${escapeHtml(evidenceStatement(item))}</strong><span class="mono sub-id">${escapeHtml(item.id)}</span></td><td>${badge(item.arm, item.arm)}</td><td>${escapeHtml(label(item.module))}</td><td>${escapeHtml(label(item.stress))}</td><td>${escapeHtml(label(item.organ))}</td><td>${escapeHtml(label(item.lineage))}</td><td>${escapeHtml(item.species)}</td><td>${badge(item.direction, item.direction)}</td><td class="numeric">${item.independent_families}</td><td class="numeric">${item.evidence_objects}</td></tr>`).join("")}
    </tbody></table></div>${pagination(pages)}`;
}

function claimResults() {
  const f = store.filters.claims || {};
  const query = (f.query || "").toLowerCase();
  return store.claims.filter(item => {
    if (f.direction && item.expected_direction !== f.direction) return false;
    if (f.module && item.module !== f.module) return false;
    if (query) {
      const text = [item.id, item.scope, item.module, item.stress, ...item.assertions.flatMap(a => [a.title, a.paraphrase])].join(" ").toLowerCase();
      if (!text.includes(query)) return false;
    }
    return true;
  }).sort((a, b) => b.family_ids.length - a.family_ids.length || b.proposition_ids.length - a.proposition_ids.length);
}

function renderClaims() {
  const f = store.filters.claims || {};
  const filtered = claimResults();
  const { rows, pages } = paginate(filtered, "claims");
  return `${pageHeading("Published evidence", "Trace conclusions reported in papers to compatible atlas evidence and the independent experiments that can support them.", "A published conclusion and a data-derived atlas statement are linked but remain different evidence units.")}
    <div class="toolbar">
      <div class="field search"><label for="query">Search</label><input id="query" data-filter="query" value="${escapeHtml(f.query || "")}" placeholder="Conclusion, response programme, paper title or summary"></div>
      ${toolbarField("module", "Response programme", store.claims.map(d => d.module), f.module)}
      ${toolbarField("direction", "Expected direction", store.claims.map(d => d.expected_direction), f.direction)}
      <button class="button secondary" type="button" data-action="reset-filters">Reset</button>
    </div>
    <section class="interactive-intro-grid chart-ledger-grid">
      ${interactivePanel("From published conclusion to independent support", "Each point is a standardized published conclusion. Select a point to inspect its source paper, linked atlas statements and original datasets.", claimSupportChart(filtered), "claim-chart-panel")}
      <aside class="interpretive-note"><span>Two linked tracks</span><h2>Published wording is preserved separately from the atlas test</h2><p>Paper statements are standardized into harmonized conclusions, then cross-walked to testable programme, direction and context coordinates. This prevents data-derived propositions from being presented as author claims.</p><dl><div><dt>${filtered.length}</dt><dd>visible conclusions</dd></div><div><dt>${filtered.reduce((sum,item)=>sum+item.assertions.length,0)}</dt><dd>source statements</dd></div><div><dt>${new Set(filtered.flatMap(item=>item.family_ids)).size}</dt><dd>linked studies</dd></div></dl></aside>
    </section>
    <div class="results-meta"><span>${filtered.length} of ${store.claims.length} standardized published conclusions</span><span>Select a row to inspect provenance and original data</span></div>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Published conclusion</th><th>Response programme</th><th>Stress</th><th>Organ</th><th>Cell lineage</th><th>Direction</th><th class="numeric">Source statements</th><th class="numeric">Linked evidence</th><th class="numeric">Independent studies</th></tr></thead><tbody>
    ${rows.map(item => `<tr data-detail="claim" data-id="${escapeHtml(item.id)}"><td class="title-cell"><strong>${escapeHtml(claimStatement(item))}</strong><span class="mono sub-id">${escapeHtml(item.id)}</span></td><td>${escapeHtml(moduleLabel(item.module))}</td><td>${escapeHtml(contextLabel(item.stress, "stress conditions"))}</td><td>${escapeHtml(contextLabel(item.organ, "organs"))}</td><td>${escapeHtml(contextLabel(item.lineage, "cell lineages"))}</td><td>${badge(item.expected_direction, item.expected_direction)}</td><td class="numeric">${item.assertions.length}</td><td class="numeric">${item.proposition_ids.length}</td><td class="numeric">${item.family_ids.length}</td></tr>`).join("")}
    </tbody></table></div>${pagination(pages)}`;
}

function familyResults() {
  const f = store.filters.families || {};
  const query = (f.query || "").toLowerCase();
  return store.families.filter(item => {
    if (f.arm && item.arm !== f.arm) return false;
    if (f.primary === "yes" && !item.primary_inference) return false;
    if (f.primary === "no" && item.primary_inference) return false;
    if (query && ![item.id, ...item.species, ...item.stress, ...item.organs, ...item.accessions, ...item.sources.flatMap(s => [s.title, s.doi])].join(" ").toLowerCase().includes(query)) return false;
    return true;
  }).sort((a, b) => Number(b.primary_inference) - Number(a.primary_inference) || b.evidence_objects - a.evidence_objects);
}

function renderFamilies() {
  const f = store.filters.families || {};
  const filtered = familyResults();
  const { rows, pages } = paginate(filtered, "families");
  return `${pageHeading("Biologically independent studies", "Browse experiments after accessions, papers and reanalyses that share biological material have been grouped together.", "Every one of the 62 study groups links to at least one official public repository record.")}
    <div class="toolbar">
      <div class="field search"><label for="query">Search</label><input id="query" data-filter="query" value="${escapeHtml(f.query || "")}" placeholder="Accession, species, stress or publication"></div>
      ${toolbarField("arm", "Stress type", store.families.map(d => d.arm), f.arm)}
      <div class="field"><label for="primary">Analysis use</label><select id="primary" data-filter="primary"><option value="">All study groups</option><option value="yes"${f.primary === "yes" ? " selected" : ""}>Used in primary statistics</option><option value="no"${f.primary === "no" ? " selected" : ""}>Catalogued only</option></select></div>
      <button class="button secondary" type="button" data-action="reset-filters">Reset</button>
    </div>
    <section class="interactive-intro-grid chart-ledger-grid">
      ${interactivePanel("Biological and analytical breadth within independent experiments", "Each point is one dependency-resolved experiment. The horizontal axis counts study-level stress–context comparisons; colour separates stress domains and outlined smaller points are catalogued only.", familyLandscape(filtered), "family-chart-panel")}
      <aside class="interpretive-note source-completeness"><span>Source completeness</span><h2>Original public data are linked for every study group</h2><p>Accessions resolve directly to GEO, BioProject, ENA, CNCB, CNGB, BioStudies or Zenodo. Multiple accessions are retained when they describe panels from the same biological experiment.</p><dl><div><dt>${filtered.filter(item=>item.data_sources.length).length}/${filtered.length}</dt><dd>visible groups linked</dd></div><div><dt>${filtered.reduce((sum,item)=>sum+item.data_sources.length,0)}</dt><dd>official repository records</dd></div><div><dt>${filtered.filter(item=>item.primary_inference).length}</dt><dd>used in inference</dd></div></dl><a class="button secondary download-index" href="downloads/study_source_index.tsv" download>Download source index</a></aside>
    </section>
    <div class="results-meta"><span>${filtered.length} of ${store.families.length} independent study groups</span><span>57 used in primary statistics; 5 catalogued only</span></div>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Study</th><th>Original data</th><th>Stress type</th><th>Status</th><th>Species</th><th>Stress coverage</th><th>Organ coverage</th><th>Measurement type</th><th class="numeric">Evidence records</th><th class="numeric">Programmes</th></tr></thead><tbody>
    ${rows.map(item => `<tr data-detail="family" data-id="${escapeHtml(item.id)}"><td class="title-cell"><strong>${escapeHtml(familyTitle(item))}</strong><span class="mono sub-id">${escapeHtml(item.id)}</span></td><td class="source-cell">${dataSourceLinks(item, 2)}</td><td>${badge(item.arm, item.arm)}</td><td>${item.primary_inference ? badge("primary", "primary") : badge("inventory only")}</td><td>${escapeHtml(item.species.map(label).join(", ") || "Not resolved")}</td><td>${escapeHtml(item.stress.map(label).slice(0, 4).join(", "))}${item.stress.length > 4 ? "…" : ""}</td><td>${escapeHtml(item.organs.map(label).slice(0, 3).join(", "))}</td><td>${escapeHtml(item.resolutions.map(label).join(", ") || "Not resolved")}</td><td class="numeric">${item.evidence_objects}</td><td class="numeric">${item.modules}</td></tr>`).join("")}
    </tbody></table></div>${pagination(pages)}`;
}

function debtResults() {
  const f = store.filters.debt || {};
  const query = (f.query || "").toLowerCase();
  return store.debt.filter(item => {
    if (f.arm && item.arm !== f.arm) return false;
    if (f.stress && item.stress !== f.stress) return false;
    if (f.organ && item.organ !== f.organ) return false;
    if (f.module && item.module !== f.module) return false;
    if (f.mismatch === "yes" && !item.density_mismatch) return false;
    if (query && ![item.coordinate_id, item.module, item.stress, item.organ, item.lineage].join(" ").toLowerCase().includes(query)) return false;
    return true;
  }).sort((a, b) => Number(b.density_mismatch) - Number(a.density_mismatch) || b.replication_debt_index - a.replication_debt_index || b.evidence_objects - a.evidence_objects);
}

function debtScatter(items) {
  const width = 660;
  const height = 450;
  const margin = { left: 58, right: 22, top: 20, bottom: 54 };
  const maxX = Math.max(...items.map(d => Number(d.evidence_objects)), 10);
  const maxY = Math.max(...items.map(d => Number(d.independent_families)), 3);
  const x = value => margin.left + Math.log1p(Number(value)) / Math.log1p(maxX) * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - Number(value) / maxY * (height - margin.top - margin.bottom);
  const xTicks = [1, 3, 10, 30, 100, 300].filter(v => v <= maxX);
  const yTicks = [...new Set([0, 1, 2, 3, 5, 10, maxY].filter(v => v <= maxY))].sort((a, b) => a - b);
  const grid = yTicks.map(value => `<g><line x1="${margin.left}" x2="${width - margin.right}" y1="${y(value)}" y2="${y(value)}" stroke="#e1e6e2"/><text x="${margin.left - 10}" y="${y(value) + 4}" text-anchor="end" fill="#60716b" font-size="10">${value}</text></g>`).join("");
  const xAxis = xTicks.map(value => `<g><line x1="${x(value)}" x2="${x(value)}" y1="${height - margin.bottom}" y2="${height - margin.bottom + 5}" stroke="#809089"/><text x="${x(value)}" y="${height - margin.bottom + 20}" text-anchor="middle" fill="#60716b" font-size="10">${value}</text></g>`).join("");
  const points = items.map(item => {
    const colour = item.density_mismatch ? "#a84f49" : item.arm === "abiotic" ? "#2f7f78" : "#9a654f";
    const radius = item.density_mismatch ? 5 : 3.2;
    return `<circle class="scatter-point" data-detail="debt" data-id="${escapeHtml(item.coordinate_id)}" cx="${x(item.evidence_objects)}" cy="${y(item.independent_families)}" r="${radius}" fill="${colour}" fill-opacity="${item.density_mismatch ? .86 : .52}" stroke="white" stroke-width=".6"><title>${label(item.module)} | ${item.evidence_objects} evidence records | ${item.independent_families} independent studies</title></circle>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evidence-record density against independent-study breadth for biological questions">${grid}${xAxis}<line x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height - margin.bottom}" stroke="#809089"/><line x1="${margin.left}" x2="${width - margin.right}" y1="${height - margin.bottom}" y2="${height - margin.bottom}" stroke="#809089"/>${points}<text x="${(margin.left + width - margin.right) / 2}" y="${height - 8}" text-anchor="middle" fill="#44564f" font-size="11">Evidence records, log scale</text><text transform="translate(15 ${(margin.top + height - margin.bottom) / 2}) rotate(-90)" text-anchor="middle" fill="#44564f" font-size="11">Biologically independent studies</text></svg>`;
}

function renderDebt() {
  const f = store.filters.debt || {};
  const filtered = debtResults();
  const { rows, pages } = paginate(filtered, "debt");
  return `${pageHeading("Replication gaps", "Find biological questions that appear evidence-rich but are supported by very few independent experiments.", "A replication gap describes dense analysis with little independent confirmation. It is not a biological effect or a true/false label.")}
    <div class="toolbar">
      <div class="field search"><label for="query">Search</label><input id="query" data-filter="query" value="${escapeHtml(f.query || "")}" placeholder="Biological question, response programme, stress or cell lineage"></div>
      ${toolbarField("arm", "Stress type", store.debt.map(d => d.arm), f.arm)}
      ${toolbarField("stress", "Stress", store.debt.map(d => d.stress), f.stress)}
      ${toolbarField("organ", "Organ", store.debt.map(d => d.organ), f.organ)}
      ${toolbarField("module", "Response programme", store.debt.map(d => d.module), f.module)}
      <div class="field"><label for="mismatch">Replication gap</label><select id="mismatch" data-filter="mismatch"><option value="">All biological questions</option><option value="yes"${f.mismatch === "yes" ? " selected" : ""}>Flagged only</option></select></div>
      <button class="button secondary" type="button" data-action="reset-filters">Reset</button>
    </div>
    <div class="results-meta"><span>${compact(filtered.length)} biological questions; ${filtered.filter(d => d.density_mismatch).length} flagged replication gaps</span><span>Predefined rule: at least 10 evidence records from no more than 2 independent studies</span></div>
    <section class="debt-dashboard">
      ${interactivePanel("Evidence density is not replication breadth", "Every point is a biological question. Select a point to inspect its context, independent support and analytical-audit profile.", debtScatter(filtered), "scatter-panel")}
      ${interactivePanel("Highest replication gaps in the current view", "Bars rank the predefined replication-gap score. Select a row to open its full evidence profile.", replicationGapRank(filtered), "gap-rank-panel")}
    </section>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Biological question</th><th>Response programme</th><th>Context</th><th class="numeric">Evidence records</th><th class="numeric">Independent studies</th><th class="numeric">Replication-gap score</th><th class="numeric">Reanalysis priority</th></tr></thead><tbody>
      ${rows.map(item => `<tr data-detail="debt" data-id="${escapeHtml(item.coordinate_id)}"><td class="title-cell"><strong>${escapeHtml(questionStatement(item))}</strong><span class="mono sub-id">${escapeHtml(item.coordinate_id)}</span></td><td>${escapeHtml(label(item.module))}</td><td>${escapeHtml([label(item.stress), label(item.organ), label(item.lineage)].join(" · "))}</td><td class="numeric">${item.evidence_objects}</td><td class="numeric">${item.independent_families}</td><td class="numeric">${fixed(item.replication_debt_index, 2)}</td><td class="numeric">${fixed(item.audit_priority_index, 2)}</td></tr>`).join("")}
    </tbody></table></div>${pagination(pages)}`;
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; }
  return `${value.toFixed(index ? 1 : 0)} ${units[index]}`;
}

function renderMethods() {
  const sourceRows = store.methods.source_ledger;
  const catalog = store.methods.downloads || [];
  const bundle = store.methods.complete_bundle;
  const categories = [...new Set(catalog.map(item => item.category))];
  return `${pageHeading("Methods and downloads", "Inspect the evidence model, statistical boundaries, source coverage and complete public analysis release.", `Release ${store.summary.resource.version}; search freeze ${store.summary.resource.search_freeze_date}. Every downloadable file is checksummed in the release manifest.`)}
    <section class="method-concepts">
      ${interactivePanel("Analytical depth and biological independence", "Route-level evidence remains nested within the experiments from which it was generated.", dependencyArchitecture(), "architecture-panel")}
      ${interactivePanel("How evidence portability is calculated", "The predefined estimate can be inspected directly from the machine-readable result tables.", portabilityChart(store.headline.portability), "portability-panel")}
    </section>
    <section class="method-grid method-definition-grid">
      <div>
        <section class="panel">
          <header class="panel-header"><div><h2>Core definitions</h2><p>Plain-language boundaries used throughout the resource.</p></div></header>
          <dl class="definition-list">
            <div><dt>Biologically independent study</dt><dd>Accessions, papers and reanalyses based on the same plants, samples or experiment count once for corroboration.</dd></div>
            <div><dt>Testable biological statement</dt><dd>A response programme, biological context and direction represented in the atlas. It may be derived from data and is not automatically a claim made by a paper.</dd></div>
            <div><dt>Evidence record</dt><dd>One audited result connecting a study comparison to a response programme, direction and context. Several records can come from one experiment.</dd></div>
            <div><dt>Analysis route</dt><dd>One explicit combination of processing, tissue or cell annotation, statistical comparison and response-programme interpretation.</dd></div>
            <div><dt>Evidence portability</dt><dd>Independent-match coverage multiplied by conditional directional agreement. A target study is excluded from its own reference set.</dd></div>
            <div><dt>Biological specificity</dt><dd>The primary structure narrows a programme by stress, then organ, then cell lineage. Species, time phase and measurement resolution are parallel sensitivity dimensions.</dd></div>
            <div><dt>Replication-gap score</dt><dd>The mismatch between many evidence records and support from few independent studies. It identifies a replication need, not biological failure.</dd></div>
            <div><dt>Reanalysis priority</dt><dd>A separate profile of analytical sensitivity, between-study disagreement and annotation uncertainty.</dd></div>
          </dl>
        </section>
      </div>
      <aside class="panel source-assurance">
        <header class="panel-header"><div><h2>Public source assurance</h2><p>Original data accessions are explicit and downloadable as an index.</p></div></header>
        <strong>62 of 62</strong><p>dependency-resolved study groups link to one or more official public repository records.</p>
        <a class="button secondary" href="downloads/study_source_index.tsv" download>Download accession index</a>
        <a class="text-link" href="#families">Browse original data links <span aria-hidden="true">→</span></a>
        <div class="detail-section"><h3>Scope boundary</h3><p>${escapeHtml(store.summary.resource.scope_boundary)}</p></div>
        <div class="detail-section"><h3>Search statement</h3><p>${escapeHtml(store.summary.search.coverage_statement)}. Formal completeness is not claimed because the public denominator is unknown.</p></div>
      </aside>
    </section>

    <section class="download-release">
      <header class="download-hero"><div><p class="section-label">Versioned public release</p><h2>Download every final analysis layer</h2><p>The release spans source accessions, independent studies, published conclusions, atlas statements, evidence records, analysis specifications, exact effects, broad route effects and headline statistical tables.</p></div><div class="bundle-card"><span>Complete release</span><strong>${formatBytes(bundle.bytes)}</strong><a class="button" href="downloads/${encodeURIComponent(bundle.file)}" download>Download all files</a><small>SHA-256 ${escapeHtml(bundle.sha256.slice(0,16))}…</small></div></header>
      <div class="download-catalog">
        ${categories.map(category => `<section><h3>${escapeHtml(category)}</h3>${catalog.filter(item => item.category === category).map(item => `<div class="download-item"><div><a href="downloads/${encodeURIComponent(item.file)}" download>${escapeHtml(item.file)}</a><span>${escapeHtml(item.description)}</span></div><small>${formatBytes(item.bytes)}<br><code>${escapeHtml(item.sha256.slice(0,12))}…</code></small></div>`).join("")}</section>`).join("")}
      </div>
      <div class="manifest-link"><a href="release-manifest.json" download>Download complete release manifest with SHA-256 checksums</a></div>
    </section>

    <section class="panel section-block">
      <header class="panel-header"><div><h2>Source coverage ledger</h2><p>Discovery scope, accepted boundaries and remaining limitations are explicit for every source.</p></div></header>
      <div class="data-table-wrap"><table class="data-table source-table"><thead><tr><th>Source</th><th>Role</th><th>Completed or accepted</th><th>Coverage status</th><th>Known limitation</th></tr></thead><tbody>
        ${sourceRows.map(row => `<tr><td>${escapeHtml(row.source_name)}</td><td>${escapeHtml(row.search_role)}</td><td>${escapeHtml(row.records_reviewed)}</td><td>${escapeHtml(row.coverage_status)}</td><td>${escapeHtml(row.known_limitation)}</td></tr>`).join("")}
      </tbody></table></div>
    </section>`;
}

function detailGrid(items) {
  return `<div class="detail-grid">${items.map(([title, value]) => `<div class="detail-value"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value ?? "Not resolved")}</strong></div>`).join("")}</div>`;
}

function openDetail(type, id) {
  let html = "";
  if (type === "proposition") {
    const item = store.propositions.find(d => d.id === id);
    if (!item) return;
    html = `<span class="detail-kicker">Testable biological statement</span><span class="mono detail-record-id">${escapeHtml(item.id)}</span><h2 id="detail-title">${escapeHtml(evidenceStatement(item))}</h2>
      <div>${badge(item.arm, item.arm)} ${badge(item.direction, item.direction)}</div>
      <section class="detail-section"><h3>Biological context</h3>${detailGrid([["Evidence statement ID", item.id], ["Stress", label(item.stress)], ["Organ", label(item.organ)], ["Cell lineage", label(item.lineage)], ["Species", item.species], ["Measurement type", label(item.resolution)], ["Time after stress", label(item.phase)]])}</section>
      <section class="detail-section"><h3>Study support</h3>${detailGrid([["Evidence records", item.evidence_objects], ["Independent studies", item.independent_families], ["Dataset sections", item.dataset_panels], ["Stress-control comparisons", item.biological_contrasts], ["Analysis settings", item.analytical_specifications], ["Linked published conclusions", item.claim_ids.length]])}</section>
      <section class="detail-section"><h3>Evidence-quality summary</h3>${objectCountBlock("Reliability", item.reliability)}${objectCountBlock("Analytical sensitivity", item.analytical_sensitivity)}${objectCountBlock("Context dependence", item.context_dependence)}${objectCountBlock("Annotation support", item.annotation_support)}</section>
      <section class="detail-section"><h3>Independent studies and original data</h3>${linkedStudySources(item.family_ids)}</section>`;
  } else if (type === "claim") {
    const item = store.claims.find(d => d.id === id);
    if (!item) return;
    html = `<span class="detail-kicker">Standardized published conclusion</span><span class="mono detail-record-id">${escapeHtml(item.id)}</span><h2 id="detail-title">${escapeHtml(claimStatement(item))}</h2>
      <section class="detail-section"><h3>Biological scope</h3>${detailGrid([["Response programme", moduleLabel(item.module)], ["Stress", contextLabel(item.stress, "stress conditions")], ["Organ", contextLabel(item.organ, "organs")], ["Cell lineage", contextLabel(item.lineage, "cell lineages")], ["Cell type", contextLabel(item.cell_type, "cell types")], ["Expected direction", label(item.expected_direction)], ["Measured outcome", label(item.analytic_endpoint)], ["Conclusion scope", item.scope]])}</section>
      <section class="detail-section"><h3>Links to atlas evidence</h3>${detailGrid([["Source statements", item.assertions.length], ["Linked evidence statements", item.proposition_ids.length], ["Independent studies", item.family_ids.length]])}</section>
      <section class="detail-section"><h3>Publication sources</h3>${item.assertions.map(sourceEntry).join("") || "<p>No public assertion record linked.</p>"}</section>
      <section class="detail-section"><h3>Independent studies and original data</h3>${linkedStudySources(item.family_ids)}</section>`;
  } else if (type === "family") {
    const item = store.families.find(d => d.id === id);
    if (!item) return;
    html = `<span class="detail-kicker">Biologically independent study group</span><span class="mono detail-record-id">${escapeHtml(item.id)}</span><h2 id="detail-title">${escapeHtml(familyTitle(item))}</h2><div>${badge(item.arm, item.arm)} ${item.primary_inference ? badge("primary", "primary") : badge("inventory only")}</div>
      <section class="detail-section"><h3>Coverage</h3>${detailGrid([["Evidence records", item.evidence_objects], ["Programmes", item.modules], ["Species", item.species.map(label).join(", ")], ["Stress", item.stress.map(label).join(", ")], ["Organs", item.organs.map(label).join(", ")], ["Lineages", item.lineages.map(label).join(", ")], ["Resolution", item.resolutions.map(label).join(", ")], ["Phase", item.phases.map(label).join(", ")]])}</section>
      <section class="detail-section"><h3>Original public data</h3><p>${dataSourceLinks(item)}</p></section>
      <section class="detail-section"><h3>Linked publications</h3>${item.sources.map(sourceEntry).join("") || "<p>No source-located assertion is linked to this family.</p>"}</section>`;
  } else if (type === "debt") {
    const item = store.debt.find(d => d.coordinate_id === id);
    if (!item) return;
    html = `<span class="detail-kicker">Replication-gap question</span><span class="mono detail-record-id">${escapeHtml(item.coordinate_id)}</span><h2 id="detail-title">${escapeHtml(questionStatement(item))}</h2><div>${badge(item.arm, item.arm)} ${item.density_mismatch ? badge("replication gap", "conflict") : ""}</div>
      <section class="detail-section"><h3>Biological context</h3>${detailGrid([["Question ID", item.coordinate_id], ["Stress", label(item.stress)], ["Organ", label(item.organ)], ["Cell lineage", label(item.lineage)], ["Response programme", label(item.module)]])}</section>
      <section class="detail-section"><h3>Study support</h3>${detailGrid([["Evidence records", item.evidence_objects], ["Independent studies", item.independent_families], ["Evidence records per independent study", fixed(item.objects_per_family, 2)], ["Replication-gap score", fixed(item.replication_debt_index, 3)], ["Replication gap", item.density_mismatch ? "Yes" : "No"]])}</section>
      <section class="detail-section"><h3>Separate audit profile</h3>${detailGrid([["Dominant direction", label(item.dominant_direction)], ["Direction agreement across studies", percent(item.family_direction_agreement)], ["Analytical sensitivity", percent(item.analytical_sensitivity_fraction_evaluable)], ["Annotation uncertainty", percent(item.annotation_uncertainty_fraction)], ["Reanalysis priority", fixed(item.audit_priority_index, 3)], ["Quality indicators available", item.audit_priority_components_available]])}</section>
      <section class="detail-section"><p>The replication-gap score is separate from reanalysis priority and does not imply that the biological response is false or contradictory.</p></section>`;
  }
  detailContent.innerHTML = html;
  detailPanel.classList.add("open");
  detailPanel.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  detailClose.focus();
}

function objectCountBlock(title, object) {
  const entries = Object.entries(object || {});
  if (!entries.length) return "";
  return `<div class="source-entry"><strong>${escapeHtml(title)}</strong><p>${entries.map(([key, value]) => `${escapeHtml(label(key))}: ${value}`).join(" · ")}</p></div>`;
}

function sourceEntry(source) {
  const title = source.title || source.study_id || "Source record";
  const url = source.url || (source.doi ? `https://doi.org/${encodeURI(source.doi)}` : null);
  return `<div class="source-entry">${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)} <span aria-hidden="true">↗</span></a>` : `<strong>${escapeHtml(title)}</strong>`}${source.paraphrase ? `<p>${escapeHtml(source.paraphrase)}</p>` : ""}${source.scope_guardrail ? `<p><em>Scope: ${escapeHtml(source.scope_guardrail)}</em></p>` : ""}</div>`;
}

function closeDetail() {
  detailPanel.classList.remove("open");
  detailPanel.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
}

function exportPropositions() {
  const rows = propositionResults();
  const columns = ["id", "arm", "module", "stress", "organ", "lineage", "species", "resolution", "phase", "direction", "evidence_objects", "independent_families", "analytical_specifications"];
  const quote = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const text = [columns.join("\t"), ...rows.map(row => columns.map(column => quote(row[column])).join("\t"))].join("\n");
  const blob = new Blob([text], { type: "text/tab-separated-values;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "PLEASE_filtered_propositions.tsv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function bindPageEvents() {
  app.querySelectorAll("[data-filter]").forEach(control => {
    const event = control.tagName === "INPUT" ? "input" : "change";
    control.addEventListener(event, () => {
      store.filters[store.route] ||= {};
      store.filters[store.route][control.dataset.filter] = control.value;
      store.page = 1;
      render();
      const replacement = app.querySelector(`[data-filter="${control.dataset.filter}"]`);
      if (replacement && control.tagName === "INPUT") {
        replacement.focus();
        replacement.setSelectionRange(replacement.value.length, replacement.value.length);
      }
    });
  });
  app.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
    store.page += button.dataset.page === "next" ? 1 : -1;
    render();
  }));
  app.querySelectorAll("[data-detail]").forEach(element => element.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    event.preventDefault();
    openDetail(element.dataset.detail, element.dataset.id);
  }));
  app.querySelectorAll("[data-programme-filter]").forEach(button => button.addEventListener("click", () => {
    store.filters.propositions ||= {};
    store.filters.propositions.module = button.dataset.programmeFilter;
    store.page = 1;
    render();
  }));
  app.querySelector("[data-action='reset-filters']")?.addEventListener("click", () => {
    store.filters[store.route] = {};
    store.page = 1;
    render();
  });
  app.querySelector("[data-action='export-propositions']")?.addEventListener("click", exportPropositions);
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function init() {
  try {
    const [summary, headline, propositions, claims, families, debt, methods] = await Promise.all([
      fetchJson("data/summary.json"),
      fetchJson("data/headline.json"),
      fetchJson("data/propositions.json"),
      fetchJson("data/claims.json"),
      fetchJson("data/families.json"),
      fetchJson("data/replication_debt.json"),
      fetchJson("data/methods.json"),
    ]);
    Object.assign(store, { summary, headline, propositions, claims, families, debt, methods });
    document.querySelector("#release-tag").textContent = `v${summary.resource.version}`;
    document.querySelector("#footer-release").textContent = `Release ${summary.resource.version} · search freeze ${summary.resource.search_freeze_date}`;
    loading.hidden = true;
    app.hidden = false;
    render();
  } catch (error) {
    loading.hidden = true;
    app.hidden = false;
    app.innerHTML = `<section class="error-state"><h1>Resource files could not be loaded</h1><p>${escapeHtml(error.message)}</p><p>Serve this directory through HTTP rather than opening <span class="mono">index.html</span> directly.</p></section>`;
  }
}

window.addEventListener("hashchange", () => {
  store.page = 1;
  closeDetail();
  render();
});
detailClose.addEventListener("click", closeDetail);
scrim.addEventListener("click", closeDetail);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeDetail(); });

init();
