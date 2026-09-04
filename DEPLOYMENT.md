# Deployment

PLEASE is a self-contained static website. Upload the entire release directory
and make the directory containing `index.html` the web root. No database,
server-side runtime or build step is required.

## Nginx

```nginx
server {
    listen 80;
    server_name please.example.org;
    root /var/www/please;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(json|js|css|svg|png|jpe?g|tsv|gz|zip|md)$ {
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
        try_files $uri =404;
    }
}
```

Configure DNS and HTTPS for the production domain before public release.

## Apache and static hosting

For Apache, upload the complete directory; the included `.htaccess` provides
the fallback required by static hosting. For GitHub Pages, S3, Cloudflare Pages
or a comparable service, upload the directory without modification. Navigation
uses URL fragments, so server-side route rewriting is not required.

## Post-deployment checks

```bash
curl -f https://please.example.org/data/summary.json
curl -f https://please.example.org/downloads/study_source_index.tsv
curl -f https://please.example.org/downloads/PLEASE_complete_analysis_release_v1.4.0.zip
sha256sum -c PLEASE_public_release_v1.4.0.zip.sha256
```

Confirm that the production host serves HTTPS and the expected content types
for JSON, JavaScript, CSS, SVG, PNG, TSV, GZIP and ZIP files.
