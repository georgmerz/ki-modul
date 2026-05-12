# KI Online Modul

This is a Jupyter Book 2 / MyST template.

## Preview locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter book start --execute
```

The equivalent MyST command is:

```bash
myst start --execute
```

## Build HTML

```bash
jupyter book build --execute --html
```

Preview the built HTML through a local web server:

```bash
python -m http.server 8000 --directory _build/html
```

Then open <http://localhost:8000>. Opening `_build/html/index.html` directly may show a `BASE_URL` warning because the generated site expects to load assets from the web root.

## Publish on GitHub Pages

The repository includes a workflow at `.github/workflows/deploy.yml` that builds and deploys the site on every push to `main`.

In GitHub, open `Settings -> Pages` and set `Source` to `GitHub Actions`.

The published site URL will be:

`https://georgmerz.github.io/ki-modul/`

## Structure

- `myst.yml` configures the book and its table of contents.
- `index.md` is the landing page.
- `chapters/` contains Markdown chapters and notebooks.
- `references.md` contains links, readings, and sources.
