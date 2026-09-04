# PLEASE statistical contract v1.4.0

## Scope and statistical unit

PLEASE is an atlas of publicly available plant-stress transcriptomic evidence.
It does not claim to cover genetics, phenotypes, proteomics, metabolomics or
all plant-stress evidence modalities.

Inventory breadth and statistical inference use distinct denominators:

- 62 dependency-resolved study families and 7,306 audited evidence records are
  catalogued;
- 57 study families and 7,096 evidence records meet the primary-inference
  criteria;
- 20 predefined, non-data-derived response programmes and 7,022 evidence
  records form the primary recurrence and portability scope;
- four targeted root-hair programmes remain searchable for focused case
  studies but are excluded from the primary recurrence and portability
  estimates.

The study family is the highest-level inferential unit. Accessions, articles,
dataset sections and reanalyses derived from the same biological material are
grouped before resampling, null calibration or held-out evaluation.

## Evidence ontology

PLEASE links two related tracks:

- **Published-knowledge track:** a source-located published assertion is
  normalized to a standardized published conclusion.
- **Data-audit track:** a method-level route effect belongs to an analytical
  specification; specifications are summarized as audited evidence records
  within a study family; evidence records instantiate testable biological
  statements.
- A predefined crosswalk links published conclusions to compatible testable
  statements where biological scope and direction can be compared.

The 73 published assertions, 71 standardized published conclusions and 2,543
testable statements are parallel denominators. They are not an attrition or
expansion sequence. The inventory also contains 1,811 direction-free
biological coordinates, 27,000 analytical specifications, 54,000 exact
method-level effects and 88,789 broad route-level records. These layers must
not be treated as independent experiments.

## Evidence portability

For target study family `i` and specificity level `l`, a statement is
externally matched only when at least two other study families provide a
non-tied directional vote at the same predefined coordinate.

- `C_l`: family-balanced independent-match coverage;
- `A_l`: directional accuracy conditional on an independent match;
- `P_l`: family-balanced evidence portability, where `P_l = C_l × A_l`.

For endpoints `(C1, A1)` and `(C2, A2)`, the exact symmetric decomposition is:

`ΔP = (C2-C1)(A1+A2)/2 + (A2-A1)(C1+C2)/2`.

The first term is assigned to independent-match coverage and the second to
conditional directional accuracy. This is a two-factor Shapley decomposition:
the product interaction is allocated symmetrically and both terms sum exactly
to `P2-P1`.

Evidence portability is not a synonym for computational reproducibility,
biological replicability or analytical robustness. Those dimensions are
reported separately.

## Biological specificity

The complete statement vector is:

`C = (entity abstraction, stress, organ, lineage, species, phase, resolution, direction)`.

This defines a partial order. The primary specificity sequence holds entity
abstraction at response-programme level and adds context in the following
order:

`programme → programme + stress → programme + stress + organ → programme + stress + organ + lineage`.

Species, time phase and measurement resolution are parallel sensitivity
dimensions. Cross-domain transfer uses a separate entity-abstraction
structure. The molecular-bridge analysis is a stricter bilateral endpoint,
not another rank in the primary specificity sequence.

## Primary portability estimates

Across the 20 predefined response programmes, independent-match coverage
declines from 1.000 at programme level to 0.261 after lineage matching.
Conditional directional accuracy changes from 0.684 to 0.679, while evidence
portability changes from 0.684 to 0.177.

The total portability change is -0.506. The exact Shapley decomposition assigns
-0.503 to loss of independent-match coverage and -0.003 to changed direction
after a match. Family-level bootstrap intervals quantify uncertainty. This is
a mathematical attribution, not a causal decomposition.

## Independence and leakage controls

- Inferential resampling is clustered at study-family level.
- All 2,618 primary-scope prediction rows were reconstructed from votes that
  exclude the target study family.
- Temporal prequential evaluation excludes same-date and future evidence.
- Nested moderator tuning excludes the target family.
- The 20 primary response programmes are marked
  `predefined_not_data_derived`.
- The four targeted root-hair programmes are excluded from primary recurrence
  and portability estimates.

## Primary context-sparsity reference

Marginal recombination is the predefined primary context-sparsity reference.
It retains each context-dimension marginal, family-by-programme evidence
density, programme abundance and direction composition while breaking
inter-dimensional coupling and assignment to study families.

Overall portability decay does not exceed this stringent reference
(`P = 0.264`), whereas independent-match coverage decays more steeply than
expected (`P = 0.003`). Combinatorial sparsity therefore explains much of
the portability gradient, while the observed joint sampling structure
additionally depletes independent matches.

A tuple-preserving reference retains empirical
stress-organ-lineage-resolution tuples and serves as a complementary
sensitivity analysis.

## Sampling geometry and allocation control

The observed incidence ledger contains 170 unique family-by-full-context
incidences across 57 inferential families and 116 observed full-context
tuples. Of these tuples, 75.0% are represented by one family and 12.1% by at
least three families. Contexts represented by at least three families carry
27.9% of family-balanced context mass.

Compared with the primary marginal-recombination reference,
independent-match coverage is 0.575 versus 0.802 at stress rank, 0.480 versus
0.675 at organ rank and 0.261 versus 0.323 at lineage rank; all three
family-level empirical comparisons have `FDR = 0.001`.

A family-and-context-degree-preserving bipartite edge-swap reference retains
all 170 incidences, all 116 observed tuples and both degree sequences. It finds
no additional family-balanced allocation concentration: observed HHI is
0.01671, the reference mean is 0.01665, the 95% reference interval is
0.01468-0.01921 and `P = 0.436`. This control does not identify causes of
research selection.

## Conditional-direction baselines

Conditional directional accuracy is evaluated against always-up,
target-excluded stress-arm-majority, target-excluded programme-majority and
composition-expected baselines. Accuracy is 0.684, 0.696, 0.679 and 0.679
across the four primary specificity ranks. The rank-4 minus rank-1 change is
-0.004 (family-bootstrap 95% CI -0.082 to 0.077), and the accuracy slope is
-0.003 (95% CI -0.028 to 0.024).

The supported conclusion is an absence of material deterioration with
specificity, not intrinsically high directional accuracy.

## Matched-reference biological recurrence

Biological coherence is tested against predefined route-specific random gene
sets matched for tested-set size, detectable universe, expression and
moderated precision. Family-balanced absolute sign balance is 0.254 versus a
reference mean of 0.102 in abiotic stress (2.50-fold, `P = 0.001`) and 0.431
versus 0.177 in biotic stress (2.43-fold, `P < 0.0001`). The arm-level result
survives all leave-one-family-out evaluations (41 of 41 and 16 of 16), and 9
of 20 predefined programmes pass all three matching-scheme calibrations.

## Cross-domain boundary

Bidirectional transfer holds out each target study family in full. Endpoint
estimates across progressively more context-specific abstractions are 0.759,
0.750, 0.748 and 0.615, but the evaluable family sets differ. Among the 13
families represented at every level, the pooled slope is -0.0679 per rank
(95% CI -0.1423 to 0.0103); this does not establish a universal abstraction
gradient.

The molecular-bridge analysis is a separate bilateral evidence-survival test.
No candidate meets all predefined bilateral calibration criteria. This means
that the current release does not support a universal molecular stress
programme; it does not prove that shared molecular responses are absent.

## Replication-gap score and reanalysis priority

The replication-gap score is restricted to mismatch between evidence-record
density and independent-family breadth:

`[ln(1+E)-ln(1+F)] / ln(1+E)`,

where `E` is the number of evidence records and `F` is the number of
independent families. The predefined operational flag requires at least 10
evidence records and no more than two independent families; 91 biological
coordinates meet this rule.

Analytical sensitivity, directional discordance and annotation uncertainty
are reported separately as a reanalysis-priority profile. Neither construct
is a biological effect or a true-or-false classifier.

## Temporal ordering

Prequential evaluation uses official repository public-release dates rather
than article issue dates. Dates are resolved for 56 of the 57 inferential
families. Same-date and future evidence are excluded from each target
prediction.

## Interpretation boundary

The resource supports the following observation: independent,
context-matched support becomes progressively scarcer as biological statements
become more specific, while direction does not materially deteriorate where
matches exist. This pattern reflects both combinatorial context sparsity and
the structure of available public evidence. It must not be interpreted as
proof that increasingly specific biological responses are intrinsically less
reproducible.
