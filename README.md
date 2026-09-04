# PLEASE web resource

PLEASE, the PLant Evidence Atlas for StrEss, is a static browser for a
claim-centred atlas of public plant-stress transcriptomic evidence developed at
the Plant Breeding Institute, Faculty of Science, The University of Sydney.

The resource distinguishes analytical depth from biological independence. It
connects published conclusions and testable biological statements to 62
dependency-resolved experiments, of which 57 meet the primary-inference
criteria.

## Contents

- `index.html`: application entry point;
- `assets/`: the resource mark, institutional assets, homepage visuals,
  styles and application code;
- `data/`: machine-readable records used by the interactive browser;
- `downloads/`: every final derived analysis layer, documentation and the
  complete analysis archive;
- `release-manifest.json`: file sizes and SHA-256 checksums;
- `RELEASE_VALIDATION.md`: release-level integrity and link checks;
- `DEPLOYMENT.md`: deployment instructions for a static web server.

All 62 study families link to official public repository records. Original
expression and sequence data remain in those repositories rather than being
redistributed by PLEASE. The derived release spans the source index, published
knowledge, testable statements, 7,306 evidence records, 27,000 analytical
specifications, 54,000 exact method-level effects and 88,789 broad route-level
records.

## Local preview

```bash
python3 -m http.server 8765 --directory PLEASE_public_release_v1.4.0
```

Open `http://localhost:8765/`. The site must be served over HTTP because web
browsers do not allow a local `file://` page to fetch adjacent JSON files.

## Scope boundary

The release covers publicly discoverable plant-stress transcriptomic evidence
within predefined source, query and date boundaries. It does not claim a known
denominator of all public plant-stress evidence, nor does it cover genetics,
phenotypes, proteomics or metabolomics.
