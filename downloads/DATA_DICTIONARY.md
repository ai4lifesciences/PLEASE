# PLEASE public data dictionary

## Purpose

This release connects published plant-stress transcriptomic conclusions to
testable biological statements, independent experiments and explicit analysis
routes. The tables are designed for traceability: stable technical identifiers
are retained, while workstation paths and build-only fields are excluded.

## Core terms

- **Biologically independent study family:** one experiment-level unit after
  grouping accessions, papers, dataset sections and reanalyses derived from the
  same plants or samples.
- **Published assertion:** a source-located statement reported by an article.
- **Standardized published conclusion:** a normalized representation of one or
  more compatible published assertions.
- **Testable biological statement:** a response programme, direction and
  biological context represented by the atlas. It is not automatically a
  statement made by an article.
- **Evidence record:** one audited study-level comparison linked to a response
  programme, direction and context.
- **Analytical specification:** one explicit combination of normalization,
  annotation, contrast and response-programme definition.
- **Method-level effect:** one result for an analytical specification and one
  inferential method.
- **Broad route-level record:** an exact or sensitivity-analysis result nested
  within a study family.
- **Replication-gap score:** concentration of many evidence records in
  comparatively few independent study families.
- **Reanalysis priority:** a separate summary of analytical sensitivity,
  directional disagreement and annotation uncertainty.

## Identifier relationships

`canonical_study_family_id` is the independent biological unit.
`harmonized_claim_id` identifies a standardized published conclusion.
`atlas_proposition_id` identifies a testable directional statement.
`audited_evidence_object_id` identifies an audited evidence record.
Specification and route identifiers describe nested analytical choices and
must not be counted as independent experiments.

Semicolon-delimited cells contain multiple values. Empty values mean that a
field was unavailable or not applicable; they must not be interpreted as
negative evidence.

## Files

### Source and independent-study layer

- `study_source_index.tsv`: official repository accession and landing-page URL
  for all 62 dependency-resolved study families.
- `study_families.tsv`: study-family scope, statistical eligibility,
  study-level comparison count, evidence-record count and original data links.
- `source_coverage_ledger.tsv`: search scope, reviewed volume, retrieval status
  and known limitations for each discovery source.

### Published-knowledge layer

- `published_assertions.tsv.gz`: 73 source-located article assertions and
  publication provenance.
- `harmonized_claims.tsv`: 71 standardized published conclusions.
- `claim_proposition_crosswalk.tsv.gz`: links standardized published
  conclusions to compatible testable biological statements and study families.

### Atlas and audit layer

- `atlas_propositions.tsv.gz`: 2,543 directional, context-specific testable
  biological statements.
- `audited_evidence_objects.tsv.gz`: 7,306 audited evidence records.
- `evidence_object_proposition_crosswalk.tsv.gz`: links evidence records to
  testable statements.
- `claim_fingerprints.tsv.gz`: evidence confidence, context dependence,
  analytical sensitivity and annotation-support summaries.
- `replication_debt.tsv.gz`: 1,065 observed biological coordinates with
  replication-gap and reanalysis-priority fields.

### Analytical-depth layer

- `analytical_specifications.tsv.gz`: 27,000 analytical specifications.
- `exact_method_effects.tsv.gz`: 54,000 exact method-level effects.
- `broad_route_effects.tsv.gz`: 88,789 exact and sensitivity route-level
  records.

All rows in these three files remain nested within study families. Their row
counts are analytical depth, not biological sample size.

### Statistical-result layer

- `recurrence_by_arm.tsv` and `recurrence_by_programme.tsv`: family-balanced
  biological recurrence and matched-reference calibration.
- `specificity_structure.tsv`: the primary specificity sequence and parallel
  sensitivity dimensions.
- `portability_state_summary.tsv`: matched-concordant,
  matched-discordant and unmatched states by specificity.
- `portability_decomposition.tsv`: coverage, conditional accuracy,
  portability and exact Shapley attribution.
- `context_occupancy.tsv`: independent-family coverage of observed
  full-context tuples.
- `cross_domain_transfer.tsv`: family-balanced cross-domain transfer
  endpoints.
- `molecular_bridge_survival.tsv`: survival of predefined cross-arm
  programme pairs under bilateral calibration.
- `decision_case_catalog.tsv`: evidence states and recommended research
  actions used by the resource.
- `headline_results.json`: machine-readable values used by the interactive
  summaries.
- `ontology_counts.tsv`: inventory and primary-inference denominators for
  every ontology layer.
- `statistical_contract.md`: estimands, null references, leakage controls and
  interpretation boundaries.

## Access and integrity

ANALYSIS_MANIFEST.tsv reports the size, table row count and SHA-256 checksum of every individual analysis file.

Original expression data remain in their public repositories and are not
redistributed by PLEASE. Use `study_source_index.tsv` or the Independent
studies page to reach the official records. Every derived file is available
individually and in `PLEASE_complete_analysis_release_v1.4.0.zip`. SHA-256
checksums are listed in the website release manifest and download catalogue.
