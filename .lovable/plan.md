

## Problem

The download link uses a relative path `downloads/template-scenario.h5p`. When the page is served through the React app's preview environment, clicking the link triggers React Router's catch-all route instead of a file download.

## Solution

Change the `href` to an absolute path `/avp/downloads/template-scenario.h5p` in both HTML files. This ensures the browser fetches the static file directly from the `public` folder, bypassing React Router.

## Changes

### 1. `public/avp/index.html` (line 578)
Change:
```html
<a href="downloads/template-scenario.h5p" ...>
```
To:
```html
<a href="/avp/downloads/template-scenario.h5p" ...>
```

### 2. `AVP/preview/index.html` (line 583)
Same change — use absolute path `/avp/downloads/template-scenario.h5p`.

## Why this fixes it
Static files in `public/avp/downloads/` are served directly by Vite's dev server at the absolute path `/avp/downloads/...`. Using an absolute path prevents React Router from intercepting the request.

