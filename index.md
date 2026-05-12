---
title: KI Online Modul
subtitle: Jupyter Book 2 template
---

# KI Online Modul

Welcome to the course book. This template is set up for Jupyter Book 2 / MyST and can contain Markdown pages, executable code blocks, notebooks, equations, figures, exercises, and references.

## How to use this template

Edit the files listed in `myst.yml` under `project.toc` to shape the navigation. Add new chapters in `chapters/`, then register them in the table of contents.

## Local preview

Install the Jupyter Book 2 tooling, then start the preview server:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter book start
```

You can also use MyST directly:

```bash
pip install mystmd
myst start
```

## Build

```bash
jupyter book build --html
```

The generated site is written to `_build/html`.
